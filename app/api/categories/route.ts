import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import {
  successResponse,
  createdResponse,
  handleApiError,
  requireAdmin,
  isAuthenticated,
  createCategorySchema,
  validateBody,
} from "@/lib/api";

// GET /api/categories - List all categories with product count
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { products: true },
        },
      },
      orderBy: { name: "asc" },
    });

    const categoriesWithCount = categories.map((category) => ({
      id: category.id,
      slug: category.slug,
      name: category.name,
      image: category.image,
      productCount: category._count.products,
    }));

    return successResponse(categoriesWithCount, "Categories retrieved successfully");
  } catch (error) {
    return handleApiError(error);
  }
}

// POST /api/categories - Create category (Admin only)
export async function POST(request: NextRequest) {
  try {
    // Check admin authorization
    const authResult = await requireAdmin();
    if (!isAuthenticated(authResult)) {
      return authResult.response;
    }

    // Validate request body
    const { slug, name, image } = await validateBody(request, createCategorySchema);

    // Create category (Prisma will throw on duplicate slug)
    const category = await prisma.category.create({
      data: {
        slug,
        name,
        image: image || null,
      },
    });

    return createdResponse(category, "Category created successfully");
  } catch (error) {
    return handleApiError(error);
  }
}