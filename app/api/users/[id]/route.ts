import prisma from "@/lib/prisma";
import { requireAdmin, isErrorResponse, hashPassword, sanitizeUser } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

type Params = { params: Promise<{ id: string }> };

// GET /api/users/[id] - Get user by ID (admin only)
export async function GET(_request: NextRequest, { params }: Params) {
    try {
        const adminCheck = await requireAdmin();
        if (isErrorResponse(adminCheck)) return adminCheck;

        const { id } = await params;
        const userId = parseInt(id, 10);

        if (isNaN(userId)) {
            return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                createdAt: true,
            },
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ user });
    } catch (error) {
        console.error("Get user error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// PUT /api/users/[id] - Update user (admin only)
export async function PUT(request: NextRequest, { params }: Params) {
    try {
        const adminCheck = await requireAdmin();
        if (isErrorResponse(adminCheck)) return adminCheck;

        const { id } = await params;
        const userId = parseInt(id, 10);

        if (isNaN(userId)) {
            return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
        }

        const { email, password, name, role } = await request.json();

        // Check if user exists
        const existingUser = await prisma.user.findUnique({
            where: { id: userId },
        });
        if (!existingUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Check email uniqueness if changing email
        if (email && email !== existingUser.email) {
            const emailTaken = await prisma.user.findUnique({
                where: { email },
            });
            if (emailTaken) {
                return NextResponse.json({ error: "Email already in use" }, { status: 400 });
            }
        }

        // Build update data
        const updateData: { email?: string; password?: string; name?: string; role?: "ADMIN" | "CUSTOMER" } = {};
        if (email) updateData.email = email;
        if (name !== undefined) updateData.name = name;
        if (role) updateData.role = role;
        if (password) updateData.password = await hashPassword(password);

        const user = await prisma.user.update({
            where: { id: userId },
            data: updateData,
        });

        return NextResponse.json({ user: sanitizeUser(user) });
    } catch (error) {
        console.error("Update user error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// DELETE /api/users/[id] - Delete user (admin only)
export async function DELETE(_request: NextRequest, { params }: Params) {
    try {
        const adminCheck = await requireAdmin();
        if (isErrorResponse(adminCheck)) return adminCheck;

        const { id } = await params;
        const userId = parseInt(id, 10);

        if (isNaN(userId)) {
            return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
        }

        // Check if user exists
        const existingUser = await prisma.user.findUnique({
            where: { id: userId },
        });
        if (!existingUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Prevent admin from deleting themselves
        if (adminCheck.id === userId) {
            return NextResponse.json({ error: "Cannot delete your own account" }, { status: 400 });
        }

        await prisma.user.delete({
            where: { id: userId },
        });

        return NextResponse.json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Delete user error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
