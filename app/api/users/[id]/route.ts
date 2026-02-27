import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { hashPassword, sanitizeUser } from "@/lib/auth";
import {
  successResponse,
  ApiErrors,
  handleApiError,
  requireAdmin,
  isAuthenticated,
  updateUserSchema,
  validateBody,
  idParamSchema,
  validateParams,
} from "@/lib/api";

type RouteParams = { params: Promise<{ id: string }> };

// GET /api/users/[id] - Get user by ID (admin only)
export async function GET(
  _request: NextRequest,
  { params }: RouteParams
) {
  try {
    // Check admin authorization
    const authResult = await requireAdmin();
    if (!isAuthenticated(authResult)) {
      return authResult.response;
    }

    const resolvedParams = await params;
    const { id: userId } = validateParams(resolvedParams, idParamSchema);

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
      return ApiErrors.notFound("User not found");
    }

    return successResponse({ user }, "User retrieved successfully");
  } catch (error) {
    return handleApiError(error);
  }
}

// PUT /api/users/[id] - Update user (admin only)
export async function PUT(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    // Check admin authorization
    const authResult = await requireAdmin();
    if (!isAuthenticated(authResult)) {
      return authResult.response;
    }

    const resolvedParams = await params;
    const { id: userId } = validateParams(resolvedParams, idParamSchema);

    // Validate request body
    const data = await validateBody(request, updateUserSchema);

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      return ApiErrors.notFound("User not found");
    }

    // Build update data
    const updateData: {
      email?: string;
      password?: string;
      name?: string;
      role?: "ADMIN" | "CUSTOMER";
    } = {};

    if (data.email) updateData.email = data.email;
    if (data.name !== undefined) updateData.name = data.name;
    if (data.role) updateData.role = data.role;
    if (data.password) updateData.password = await hashPassword(data.password);

    const user = await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    return successResponse(
      { user: sanitizeUser(user) },
      "User updated successfully"
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// DELETE /api/users/[id] - Delete user (admin only)
export async function DELETE(
  _request: NextRequest,
  { params }: RouteParams
) {
  try {
    // Check admin authorization
    const authResult = await requireAdmin();
    if (!isAuthenticated(authResult)) {
      return authResult.response;
    }

    const resolvedParams = await params;
    const { id: userId } = validateParams(resolvedParams, idParamSchema);

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      return ApiErrors.notFound("User not found");
    }

    // Prevent admin from deleting themselves
    if (authResult.user.id === userId) {
      return ApiErrors.badRequest("Cannot delete your own account");
    }

    await prisma.user.delete({
      where: { id: userId },
    });

    return successResponse(null, "User deleted successfully");
  } catch (error) {
    return handleApiError(error);
  }
}
