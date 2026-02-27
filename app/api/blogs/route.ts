import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import {
  successResponse,
  createdResponse,
  handleApiError,
  requireAdmin,
  isAuthenticated,
  createBlogSchema,
  validateBody,
} from "@/lib/api";

// GET /api/blogs - List all blog posts (public can see published, admin can see all)
export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    });

    return successResponse(blogs, "Blog posts retrieved successfully");
  } catch (error) {
    return handleApiError(error);
  }
}

// POST /api/blogs - Create blog post (Admin only)
export async function POST(request: NextRequest) {
  try {
    // Check admin authorization
    const authResult = await requireAdmin();
    if (!isAuthenticated(authResult)) {
      return authResult.response;
    }

    // Validate request body
    const { title, slug, excerpt, content, category, readTime, author, image, published } =
      await validateBody(request, createBlogSchema);

    // Generate slug from title if not provided
    const blogSlug =
      slug ||
      title
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");

    // Create blog post
    const blog = await prisma.blog.create({
      data: {
        title,
        slug: blogSlug,
        excerpt: excerpt || null,
        content,
        category: category || null,
        readTime: readTime || 5,
        author: author || null,
        image: image || null,
        published: published || false,
      },
    });

    return createdResponse(blog, "Blog post created successfully");
  } catch (error) {
    return handleApiError(error);
  }
}
