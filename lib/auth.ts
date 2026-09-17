import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "./prisma";

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export type SafeUser = {
  id: number;
  clerkId: string | null;
  email: string;
  name: string | null;
  role: "ADMIN" | "CUSTOMER";
  createdAt: Date;
};

/**
 * Get current authenticated admin user from Clerk session & Prisma
 */
export async function getCurrentUser(): Promise<SafeUser | null> {
  const { userId } = await auth();
  if (!userId) return null;

  // Find user by Clerk ID
  let user = await prisma.user.findUnique({
    where: { clerkId: userId },
    select: {
      id: true,
      clerkId: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
    },
  });

  // If not found in DB yet (e.g. initial login before webhook fired), fetch from Clerk and upsert
  if (!user) {
    const clerkUser = await currentUser();
    if (clerkUser) {
      const email = clerkUser.emailAddresses?.[0]?.emailAddress;
      const name = [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ") || null;
      if (email) {
        user = await prisma.user.upsert({
          where: { clerkId: userId },
          update: { email, name },
          create: {
            clerkId: userId,
            email,
            name,
            role: "ADMIN",
          },
          select: {
            id: true,
            clerkId: true,
            email: true,
            name: true,
            role: true,
            createdAt: true,
          },
        });
      }
    }
  }

  return user;
}

/**
 * Check if the currently authenticated user has the ADMIN role
 */
export async function isAdmin(): Promise<boolean> {
  const user = await getCurrentUser();
  return user?.role === "ADMIN";
}

/**
 * Require admin authentication - returns user if admin, or an error response
 */
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

/**
 * Type guard to check if requireAdmin returned an error response
 */
export function isErrorResponse(result: SafeUser | NextResponse): result is NextResponse {
  return result instanceof NextResponse;
}

/**
 * Helper to sanitize user objects
 */
export function sanitizeUser(user: {
  id: number;
  clerkId?: string | null;
  email: string;
  name: string | null;
  role: "ADMIN" | "CUSTOMER";
  createdAt: Date;
  password?: string | null;
}): SafeUser {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _password, ...safeUser } = user;
  return safeUser as SafeUser;
}
