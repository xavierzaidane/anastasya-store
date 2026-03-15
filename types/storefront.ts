export interface StorefrontProduct {
  id: number;
  slug: string;
  category: string;
  name: string;
  price: string;
  image: string;
  img: string;
  gallery: string[];
  description: string;
  items: string[];
  categoryName?: string;
  isStaffPick?: boolean;
}

export interface StorefrontApiProduct {
  id: number;
  slug: string;
  name: string;
  price: number | string;
  image: string | null;
  gallery?: string[];
  description?: string | null;
  items?: string[];
  category?: {
    slug: string;
    name: string;
  };
  isStaffPick?: boolean;
}

export interface StorefrontApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
}

export interface StorefrontPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface StorefrontPaginatedProducts {
  items: StorefrontApiProduct[];
  pagination: StorefrontPagination;
}