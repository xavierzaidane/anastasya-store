import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import {
  successResponse,
  createdResponse,
  handleApiError,
  parsePaginationParams,
  createPaginatedResult,
  requireAdmin,
  isAuthenticated,
  createProductSchema,
  validateBody,
} from "@/lib/api";

// GET /api/products - List products with pagination and filtering
export async function GET(request: NextRequest) {
  try {
    const url = request.url;
    const { page, limit, skip } = parsePaginationParams(url);
    const { searchParams } = new URL(url);
    
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category");

    // Build where clause
    const where = {
      name: {
        contains: search,
        mode: "insensitive" as const,
      },
      ...(category && { category: { slug: category } }),
    };

    // Execute queries in parallel
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: limit,
        include: {
          category: true,
        },
        orderBy: { createdAt: "desc" },
      }),
      prisma.product.count({ where }),
    ]);

    const result = createPaginatedResult(products, total, { page, limit, skip });

    return successResponse(result, "Products retrieved successfully");
  } catch (error) {
    return handleApiError(error);
  }
}

// POST /api/products - Create product (Admin only)
export async function POST(request: NextRequest) {
  try {
    // Check admin authorization
    const authResult = await requireAdmin();
    if (!isAuthenticated(authResult)) {
      return authResult.response;
    }

    const { name, price, categoryId, description, img, items } = await validateBody(
      request,
      createProductSchema
    );

    // Generate slug from name
    const slug = name
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");

    // Create product
    const product = await prisma.product.create({
      data: {
        name,
        slug,
        price,
        description,
        items: items ?? [],
        image: img,
        category: {
          connect: { id: categoryId },
        },
      },
      include: {
        category: true,
      },
    });

    return createdResponse(product, "Product created successfully");
  } catch (error) {
    return handleApiError(error);
  }
}