import {
  StorefrontApiProduct,
  StorefrontApiResponse,
  StorefrontPaginatedProducts,
  StorefrontProduct,
} from '@/types/storefront';

const DEFAULT_PRODUCT_LIMIT = 24;

export interface FetchStorefrontProductsParams {
  limit?: number;
  category?: string;
  search?: string;
  signal?: AbortSignal;
}

export interface StorefrontProductsResult {
  items: StorefrontProduct[];
  pagination: StorefrontPaginatedProducts['pagination'] | null;
}

export async function fetchStorefrontProducts(
  params: FetchStorefrontProductsParams = {}
): Promise<StorefrontProductsResult> {
  const { limit = DEFAULT_PRODUCT_LIMIT, category, search, signal } = params;
  const searchParams = new URLSearchParams({ limit: String(limit) });

  if (category) {
    searchParams.append('category', category);
  }

  if (search) {
    searchParams.append('search', search);
  }

  const response = await fetch(`/api/products?${searchParams.toString()}`, {
    method: 'GET',
    cache: 'no-store',
    signal,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch products (${response.status})`);
  }

  const payload: StorefrontApiResponse<StorefrontPaginatedProducts> = await response.json();

  if (!payload.success || !payload.data) {
    throw new Error(payload.message || 'Unable to retrieve products');
  }

  return {
    items: payload.data.items.map((item) => mapApiProductToStorefront(item)),
    pagination: payload.data.pagination,
  };
}

export function formatRupiah(value: number | string): string {
  const numericValue = typeof value === 'string' ? Number(value) : value;

  if (Number.isNaN(numericValue)) {
    return `Rp ${String(value)}`;
  }

  return `Rp ${new Intl.NumberFormat('id-ID').format(numericValue)}`;
}

export function mapApiProductToStorefront(
  product: StorefrontApiProduct,
  fallbackCategorySlug = 'general'
): StorefrontProduct {
  const imageUrl = product.image || '/bunga1.jpg';
  const gallery = product.gallery && product.gallery.length > 0 
    ? product.gallery 
    : [imageUrl];
  
  return {
    id: product.id,
    slug: product.slug,
    category: product.category?.slug || fallbackCategorySlug,
    categoryName: product.category?.name,
    name: product.name,
    price: formatRupiah(product.price),
    image: imageUrl,
    img: imageUrl,
    gallery: gallery,
    description: product.description || 'No description available.',
    items: product.items || [],
    isStaffPick: Boolean(product.isStaffPick),
  };
}