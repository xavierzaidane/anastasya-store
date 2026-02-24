import prisma from "@/lib/prisma";
import { requireAdmin, isErrorResponse, hashPassword, sanitizeUser } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

// GET /api/users - List all users (admin only)
export async function GET() {
    try {
        const adminCheck = await requireAdmin();
        if (isErrorResponse(adminCheck)) return adminCheck;

        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                createdAt: true,
            },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json({ users });
    } catch (error) {
        console.error("Get users error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// POST /api/users - Create a new user (admin only)
export async function POST(request: NextRequest) {
    try {
        const adminCheck = await requireAdmin();
        if (isErrorResponse(adminCheck)) return adminCheck;

        const { email, password, name, role } = await request.json();

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            return NextResponse.json({ error: "Email already registered" }, { status: 400 });
        }

        const hashedPassword = await hashPassword(password);

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                role: role || "CUSTOMER",
            },
        });

        return NextResponse.json({ user: sanitizeUser(user) }, { status: 201 });
    } catch (error) {
        console.error("Create user error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
