import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { hashPassword, sanitizeUser } from "@/lib/auth";
import {
  successResponse,
  createdResponse,
  handleApiError,
  requireAdmin,
  isAuthenticated,
  createUserSchema,
  validateBody,
} from "@/lib/api";

// GET /api/users - List all users (admin only)
export async function GET() {
  try {
    // Check admin authorization
    const authResult = await requireAdmin();
    if (!isAuthenticated(authResult)) {
      return authResult.response;
    }

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

    return successResponse(users, "Users retrieved successfully");
  } catch (error) {
    return handleApiError(error);
  }
}

// POST /api/users - Create a new user (admin only)
export async function POST(request: NextRequest) {
  try {
    // Check admin authorization
    const authResult = await requireAdmin();
    if (!isAuthenticated(authResult)) {
      return authResult.response;
    }

    // Validate request body
    const { email, password, name, role } = await validateBody(
      request,
      createUserSchema
    );

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user (Prisma will throw on duplicate email)
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: role || "CUSTOMER",
      },
    });

    return createdResponse(
      { user: sanitizeUser(user) },
      "User created successfully"
    );
  } catch (error) {
    return handleApiError(error);
  }
}
