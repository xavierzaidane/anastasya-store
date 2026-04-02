// API Response Types

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface PaginatedData<T> {
  items: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Category Types
export interface Category {
  id: number;
  slug: string;
  name: string;
  image: string | null;
  productCount?: number;
}

// Product Types
export interface Product {
  id: number;
  slug: string;
  name: string;
  description: string | null;
  items: string[];
  price: string; // Decimal from Prisma
  image: string | null;
  gallery: string[];
  isActive: boolean;
  isStaffPick: boolean;
  createdAt: string;
  updatedAt: string;
  categoryId: number;
  category: Category;
}

export interface CreateProductInput {
  name: string;
  price: number;
  categoryId: number;
  description?: string;
  img?: string | null;
  items?: string[];
}

export interface UpdateProductInput {
  name?: string;
  price?: number;
  categoryId?: number;
  description?: string;
  image?: string | null;
  items?: string[];
}

// Blog Types
export interface Blog {
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

export interface CreateBlogInput {
  title: string;
  slug?: string;
  excerpt?: string | null;
  content: string;
  category?: string | null;
  readTime?: number;
  author?: string | null;
  image?: string | null;
  published?: boolean;
}

export interface UpdateBlogInput {
  title?: string;
  excerpt?: string | null;
  content?: string;
  category?: string | null;
  readTime?: number;
  author?: string | null;
  image?: string | null;
  published?: boolean;
}
