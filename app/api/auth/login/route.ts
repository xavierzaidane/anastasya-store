import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import { verifyPassword, generateToken, sanitizeUser, validateAdminSecret } from "@/lib/auth";
import {
  successResponse,
  ApiErrors,
  handleApiError,
  loginSchema,
  validateBody,
} from "@/lib/api";

export async function POST(request: NextRequest) {
  try {
    // Validate request body
    const { email, password, adminSecret } = await validateBody(request, loginSchema);

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return ApiErrors.unauthorized("Invalid email or password");
    }

    // Verify password
    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return ApiErrors.unauthorized("Invalid email or password");
    }

    // For admin users, require valid admin secret
    if (user.role === "ADMIN") {
      if (!adminSecret || !validateAdminSecret(adminSecret)) {
        return ApiErrors.forbidden("Admin secret required for admin login");
      }
    }

    // Generate token and set cookie
    const token = generateToken(user.id);
    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return successResponse(
      { user: sanitizeUser(user) },
      "Login successful"
    );
  } catch (error) {
    return handleApiError(error);
  }
}
