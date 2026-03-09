import { ApiBlog, StorefrontBlog } from '@/types/blog';

export function formatBlogDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function getAuthorInitial(authorName: string | null): string {
  if (!authorName) return 'A';
  return authorName.charAt(0).toUpperCase();
}

export function mapApiBlogToStorefront(blog: ApiBlog): StorefrontBlog {
  return {
    id: blog.id,
    slug: blog.slug,
    title: blog.title,
    excerpt: blog.excerpt || '',
    content: blog.content,
    category: blog.category || 'General',
    readTime: blog.readTime,
    author: {
      name: blog.author || 'Anastasya',
      initial: getAuthorInitial(blog.author),
    },
    date: formatBlogDate(blog.createdAt),
    image: blog.image || '/images/blog/default.jpg',
  };
}

export function mapApiBlogsToStorefront(blogs: ApiBlog[]): StorefrontBlog[] {
  return blogs.map(mapApiBlogToStorefront);
}

export function getRelatedBlogs(
  blogs: StorefrontBlog[],
  currentSlug: string,
  limit: number = 3
): StorefrontBlog[] {
  const current = blogs.find((b) => b.slug === currentSlug);
  if (!current) return blogs.slice(0, limit);

  // Prefer same category, then recent posts
  const sameCategory = blogs.filter(
    (b) => b.slug !== currentSlug && b.category === current.category
  );
  const others = blogs.filter(
    (b) => b.slug !== currentSlug && b.category !== current.category
  );

  return [...sameCategory, ...others].slice(0, limit);
}
