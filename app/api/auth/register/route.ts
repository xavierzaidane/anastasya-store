import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import { hashPassword, generateToken, sanitizeUser } from "@/lib/auth";
import {
  createdResponse,
  ApiErrors,
  handleApiError,
  registerSchema,
  validateBody,
} from "@/lib/api";

export async function POST(request: NextRequest) {
  try {
    // Validate request body
    const { email, password, name } = await validateBody(request, registerSchema);

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return ApiErrors.conflict("Email already registered");
    }

    // Hash password before storing
    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: "CUSTOMER",
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

    return createdResponse(
      { user: sanitizeUser(user) },
      "Registration successful"
    );
  } catch (error) {
    return handleApiError(error);
  }
}
