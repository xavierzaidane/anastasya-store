import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";
import { ApiErrors } from "./response";

const JWT_SECRET = process.env.JWT_SECRET!;

export type UserRole = "ADMIN" | "CUSTOMER";

export interface AuthUser {
  id: number;
  email: string;
  name: string | null;
  role: UserRole;
}

export interface JwtPayload {
  userId: number;
}

/**
 * Verify JWT token and return payload
 */
export function verifyToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch {
    return null;
  }
}

/**
 * Get authenticated user from request cookies
 */
export async function getAuthUser(): Promise<AuthUser | null> {
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
    },
  });

  return user as AuthUser | null;
}

/**
 * Authentication middleware result
 */
export type AuthResult =
  | { success: true; user: AuthUser }
  | { success: false; response: NextResponse };

/**
 * Require authentication - returns user or error response
 */
export async function requireAuth(): Promise<AuthResult> {
  const user = await getAuthUser();

  if (!user) {
    return {
      success: false,
      response: ApiErrors.unauthorized("Authentication required"),
    };
  }

  return { success: true, user };
}

/**
 * Require specific role(s) - returns user or error response
 */
export async function requireRole(
  ...allowedRoles: UserRole[]
): Promise<AuthResult> {
  const authResult = await requireAuth();

  if (!authResult.success) {
    return authResult;
  }

  if (!allowedRoles.includes(authResult.user.role)) {
    return {
      success: false,
      response: ApiErrors.forbidden(
        `Access denied. Required role: ${allowedRoles.join(" or ")}`
      ),
    };
  }

  return authResult;
}

/**
 * Require admin role - convenience function
 */
export async function requireAdmin(): Promise<AuthResult> {
  return requireRole("ADMIN");
}

/**
 * Check if auth result is successful (type guard)
 */
export function isAuthenticated(
  result: AuthResult
): result is { success: true; user: AuthUser } {
  return result.success;
}

/**
 * Higher-order function to wrap handlers with authentication
 */
export function withAuth<T extends unknown[]>(
  handler: (user: AuthUser, ...args: T) => Promise<NextResponse>,
  ...allowedRoles: UserRole[]
): (...args: T) => Promise<NextResponse> {
  return async (...args: T): Promise<NextResponse> => {
    const authResult =
      allowedRoles.length > 0
        ? await requireRole(...allowedRoles)
        : await requireAuth();

    if (!isAuthenticated(authResult)) {
      return authResult.response;
    }

    return handler(authResult.user, ...args);
  };
}

/**
 * Higher-order function to wrap handlers with admin authentication
 */
export function withAdmin<T extends unknown[]>(
  handler: (user: AuthUser, ...args: T) => Promise<NextResponse>
): (...args: T) => Promise<NextResponse> {
  return withAuth(handler, "ADMIN");
}
