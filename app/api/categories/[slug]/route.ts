import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import {
  successResponse,
  ApiErrors,
  handleApiError,
  requireAdmin,
  isAuthenticated,
  updateCategorySchema,
  validateBody,
} from "@/lib/api";

type RouteParams = { params: Promise<{ slug: string }> };

// GET /api/categories/[slug] - Get category with products
export async function GET(
  _request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { slug } = await params;

    const category = await prisma.category.findUnique({
      where: { slug },
      include: {
        products: {
          select: {
            id: true,
            slug: true,
            name: true,
            price: true,
            image: true,
          },
        },
        _count: {
          select: { products: true },
        },
      },
    });

    if (!category) {
      return ApiErrors.notFound("Category not found");
    }

    const { _count, ...categoryData } = category;
    const result = {
      ...categoryData,
      productCount: _count.products,
    };

    return successResponse(result, "Category retrieved successfully");
  } catch (error) {
    return handleApiError(error);
  }
}

// PUT /api/categories/[slug] - Update category (Admin only)
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

    const { slug } = await params;

    // Validate request body
    const data = await validateBody(request, updateCategorySchema);

    // Check if category exists
    const existingCategory = await prisma.category.findUnique({
      where: { slug },
    });

    if (!existingCategory) {
      return ApiErrors.notFound("Category not found");
    }

    // Update category
    const category = await prisma.category.update({
      where: { slug },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.image !== undefined && { image: data.image || null }),
      },
    });

    return successResponse(category, "Category updated successfully");
  } catch (error) {
    return handleApiError(error);
  }
}

// DELETE /api/categories/[slug] - Delete category (Admin only)
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

    const { slug } = await params;

    // Check if category exists
    const category = await prisma.category.findUnique({
      where: { slug },
    });

    if (!category) {
      return ApiErrors.notFound("Category not found");
    }

    // Delete category
    await prisma.category.delete({
      where: { slug },
    });

    return successResponse(null, "Category deleted successfully");
  } catch (error) {
    return handleApiError(error);
  }
}