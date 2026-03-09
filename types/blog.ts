// Backend API blog structure
export interface ApiBlog {
  id: number;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  category: string | null;
  readTime: number;
  author: string | null;
  image: string | null;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

// Storefront blog structure (matches existing UI expectations)
export interface StorefrontBlog {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: number;
  author: {
    name: string;
    initial: string;
  };
  date: string;
  image: string;
}

export interface BlogApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
}
