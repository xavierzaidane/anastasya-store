import prisma from "@/lib/prisma";
import { hashPassword, generateToken, sanitizeUser, validateAdminSecret } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
    try {
        const { email, password, name, role, adminSecret } = await request.json();

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            return NextResponse.json({ error: "Email already registered" }, { status: 400 });
        }

        // Determine role - only allow ADMIN if valid admin secret provided
        let userRole: "ADMIN" | "CUSTOMER" = "CUSTOMER";
        if (role === "ADMIN") {
            if (!validateAdminSecret(adminSecret)) {
                return NextResponse.json({ error: "Invalid admin secret" }, { status: 403 });
            }
            userRole = "ADMIN";
        }

        // Hash password before storing
        const hashedPassword = await hashPassword(password);

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                role: userRole,
            },
        });

        // Generate token and set cookie
        const token = generateToken(user.id);
        const cookieStore = await cookies();
        cookieStore.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7, // 7 days
        });

        return NextResponse.json({ user: sanitizeUser(user) });
    } catch (error) {
        console.error("Register error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
