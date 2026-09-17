import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import {
  successResponse,
  ApiErrors,
  handleApiError,
  requireAdmin,
  isAuthenticated,
  updateProductSchema,
  validateBody,
} from "@/lib/api";

type RouteParams = { params: Promise<{ slug: string }> };

export async function GET(
  _request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { slug } = await params;

    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        category: true,
      },
    });

    if (!product) {
      return ApiErrors.notFound("Product not found");
    }

    return successResponse(product, "Product retrieved successfully");
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const authResult = await requireAdmin();
    if (!isAuthenticated(authResult)) {
      return authResult.response;
    }

    const { slug } = await params;

    const data = await validateBody(request, updateProductSchema);

    const existingProduct = await prisma.product.findUnique({
      where: { slug },
    });

    if (!existingProduct) {
      return ApiErrors.notFound("Product not found");
    }

    const updatedProduct = await prisma.product.update({
      where: { slug },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.price && { price: data.price }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.image !== undefined && { image: data.image }),
        ...(data.gallery !== undefined && { gallery: data.gallery }),
        ...(data.items !== undefined && { items: data.items }),
        ...(data.isStaffPick !== undefined && { isStaffPick: data.isStaffPick }),
        ...(data.isActive !== undefined && { isActive: data.isActive }),
        ...(data.categoryId && {
          category: { connect: { id: data.categoryId } },
        }),
      },
      include: {
        category: true,
      },
    });

    // Revalidate storefront pages
    revalidatePath(`/browse/${updatedProduct.category?.slug || 'general'}/${updatedProduct.slug}`, 'page');
    revalidatePath('/browse/[products]/[slug]', 'page');
    revalidatePath('/browse/[products]', 'page');
    revalidatePath('/');

    return successResponse(updatedProduct, "Product updated successfully");
  } catch (error) {
    return handleApiError(error);
  }
}

// DELETE /api/products/[slug] - Delete product (Admin only)
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

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { slug },
      include: { category: true },
    });

    if (!existingProduct) {
      return ApiErrors.notFound("Product not found");
    }

    // Delete product
    await prisma.product.delete({
      where: { slug },
    });

    // Revalidate storefront pages
    revalidatePath(`/browse/${existingProduct.category?.slug || 'general'}/${existingProduct.slug}`, 'page');
    revalidatePath('/browse/[products]/[slug]', 'page');
    revalidatePath('/browse/[products]', 'page');
    revalidatePath('/');

    return successResponse(null, "Product deleted successfully");
  } catch (error) {
    return handleApiError(error);
  }
}