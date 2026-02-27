import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import {
  successResponse,
  ApiErrors,
  handleApiError,
  requireAdmin,
  isAuthenticated,
  updateBlogSchema,
  validateBody,
} from "@/lib/api";

type RouteParams = { params: Promise<{ slug: string }> };

// GET /api/blogs/[slug] - Get blog post by slug
export async function GET(
  _request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { slug } = await params;

    const blog = await prisma.blog.findUnique({
      where: { slug },
    });

    if (!blog) {
      return ApiErrors.notFound("Blog post not found");
    }

    return successResponse(blog, "Blog post retrieved successfully");
  } catch (error) {
    return handleApiError(error);
  }
}

// PUT /api/blogs/[slug] - Update blog post (Admin only)
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
    const data = await validateBody(request, updateBlogSchema);

    // Check if blog exists
    const existingBlog = await prisma.blog.findUnique({
      where: { slug },
    });

    if (!existingBlog) {
      return ApiErrors.notFound("Blog post not found");
    }

    // Update blog post
    const blog = await prisma.blog.update({
      where: { slug },
      data: {
        ...(data.title && { title: data.title }),
        ...(data.excerpt !== undefined && { excerpt: data.excerpt || null }),
        ...(data.content && { content: data.content }),
        ...(data.category !== undefined && { category: data.category || null }),
        ...(data.readTime && { readTime: data.readTime }),
        ...(data.author !== undefined && { author: data.author || null }),
        ...(data.image !== undefined && { image: data.image || null }),
        ...(data.published !== undefined && { published: data.published }),
      },
    });

    return successResponse(blog, "Blog post updated successfully");
  } catch (error) {
    return handleApiError(error);
  }
}

// DELETE /api/blogs/[slug] - Delete blog post (Admin only)
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

    // Check if blog exists
    const existingBlog = await prisma.blog.findUnique({
      where: { slug },
    });

    if (!existingBlog) {
      return ApiErrors.notFound("Blog post not found");
    }

    // Delete blog post
    await prisma.blog.delete({
      where: { slug },
    });

    return successResponse(null, "Blog post deleted successfully");
  } catch (error) {
    return handleApiError(error);
  }
}
