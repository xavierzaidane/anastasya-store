import prisma from '@/lib/prisma';
import { ApiBlog, StorefrontBlog } from '@/types/blog';
import { mapApiBlogToStorefront, mapApiBlogsToStorefront } from '@/lib/storefront-blogs';

/**
 * Server-side data access for blogs.
 * Use these functions in server components instead of fetching through API routes.
 */

export async function getPublishedBlogs(): Promise<StorefrontBlog[]> {
  try {
    const blogs = await prisma.blog.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
    });

    // Map to ApiBlog format (Prisma returns dates as Date objects)
    const apiBlogs: ApiBlog[] = blogs.map((blog) => ({
      id: blog.id,
      slug: blog.slug,
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      category: blog.category,
      readTime: blog.readTime,
      author: blog.author,
      image: blog.image,
      published: blog.published,
      createdAt: blog.createdAt.toISOString(),
      updatedAt: blog.updatedAt.toISOString(),
    }));

    return mapApiBlogsToStorefront(apiBlogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
}

export async function getBlogBySlug(slug: string): Promise<StorefrontBlog | null> {
  try {
    const blog = await prisma.blog.findUnique({
      where: { 
        slug,
        published: true,
      },
    });

    if (!blog) {
      return null;
    }

    // Map to ApiBlog format
    const apiBlog: ApiBlog = {
      id: blog.id,
      slug: blog.slug,
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      category: blog.category,
      readTime: blog.readTime,
      author: blog.author,
      image: blog.image,
      published: blog.published,
      createdAt: blog.createdAt.toISOString(),
      updatedAt: blog.updatedAt.toISOString(),
    };

    return mapApiBlogToStorefront(apiBlog);
  } catch (error) {
    console.error('Error fetching blog by slug:', error);
    return null;
  }
}
