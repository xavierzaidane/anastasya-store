import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import prisma from "./prisma";

const JWT_SECRET = process.env.JWT_SECRET!;
const ADMIN_SECRET = process.env.ADMIN_SECRET; // Optional: for creating admin accounts
const TOKEN_EXPIRY = "7d";

export type JwtPayload = {
    userId: number;
};

export type SafeUser = {
    id: number;
    email: string;
    name: string | null;
    role: "ADMIN" | "CUSTOMER";
    createdAt: Date;
};

// Hash a password
export async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
}

// Compare password with hash
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
}

// Generate JWT token
export function generateToken(userId: number): string {
    return jwt.sign({ userId } satisfies JwtPayload, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
}

// Verify JWT token
export function verifyToken(token: string): JwtPayload | null {
    try {
        return jwt.verify(token, JWT_SECRET) as JwtPayload;
    } catch {
        return null;
    }
}

// Get current user from token in cookies
export async function getCurrentUser(): Promise<SafeUser | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) return null;

    const payload = verifyToken(token);
    if (!payload) return null;

    const user = await prisma.user.findUnique({
        where: { id: payload.userId },
        select: {
            id: true,
            email: true,
            name: true,
            role: true,
            createdAt: true,
        },
    });

    return user;
}

// Check if current user is an admin
export async function isAdmin(): Promise<boolean> {
    const user = await getCurrentUser();
    return user?.role === "ADMIN";
}

// Require admin authentication - returns user if admin, or error response
export async function requireAdmin(): Promise<SafeUser | NextResponse> {
    const user = await getCurrentUser();

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (user.role !== "ADMIN") {
        return NextResponse.json({ error: "Forbidden: Admin access required" }, { status: 403 });
    }

    return user;
}

// Helper to check if requireAdmin returned an error response
export function isErrorResponse(result: SafeUser | NextResponse): result is NextResponse {
    return result instanceof NextResponse;
}

// Validate admin secret for creating admin accounts
export function validateAdminSecret(secret: string | undefined): boolean {
    if (!ADMIN_SECRET) return false;
    return secret === ADMIN_SECRET;
}

// Remove sensitive fields from user object
export function sanitizeUser(user: { id: number; email: string; name: string | null; role: "ADMIN" | "CUSTOMER"; createdAt: Date; password?: string }): SafeUser {
    const { password, ...safeUser } = user;
    return safeUser as SafeUser;
}
