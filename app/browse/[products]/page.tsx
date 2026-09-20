/* eslint-disable @next/next/no-img-element */
'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from 'react';
import { Star } from 'lucide-react';
import StoreNavbar from '@/components/navigations/StoreNavbar';
import { mapApiProductToStorefront } from '@/lib/storefront-products';
import { StorefrontApiResponse, StorefrontProduct } from '@/types/storefront';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Pagination,
  PaginationPrevious,
  PaginationItem,
  PaginationNext,
  PaginationEllipsis,
} from '@/components/ui/pagination';

interface CategoryDetailData {
  id: number;
  slug: string;
  name: string;
  image: string | null;
  productCount: number;
  products: Array<{
    id: number;
    slug: string;
    name: string;
    price: number | string;
    image: string | null;
    description?: string | null;
    items?: string[];
    isStaffPick?: boolean;
  }>;
}

function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (callback: () => void) => {
      const matchMedia = window.matchMedia(query);
      matchMedia.addEventListener('change', callback);
      return () => matchMedia.removeEventListener('change', callback);
    },
    [query]
  );

  const getSnapshot = () => {
    return window.matchMedia(query).matches;
  };

  const getServerSnapshot = () => false;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export default function CategoryPage() {
  const params = useParams();
  const categorySlug = params?.products as string;
  const [products, setProducts] = useState<StorefrontProduct[]>([]);
  const [categoryName, setCategoryName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 20;

  const isMobile = useMediaQuery('(max-width: 640px)');
  const isTablet = useMediaQuery('(max-width: 768px)');

  const fallbackCategoryName = useMemo(() => {
    if (!categorySlug) return '';
    return categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1);
  }, [categorySlug]);

  useEffect(() => {
    const fetchCategory = async () => {
      if (!categorySlug) return;

      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`/api/categories/${categorySlug}`, {
          cache: 'no-store',
        });

        const result: StorefrontApiResponse<CategoryDetailData> = await response.json();

        if (!response.ok || !result.success || !result.data) {
          throw new Error(result.message || 'Failed to load category');
        }

        const mappedProducts: StorefrontProduct[] = result.data.products.map((product) =>
          mapApiProductToStorefront(product, result.data?.slug || categorySlug)
        );

        setCategoryName(result.data.name || fallbackCategoryName);
        setProducts(mappedProducts);
      } catch (fetchError) {
        const message = fetchError instanceof Error ? fetchError.message : 'Failed to load category';
        setError(message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategory();
  }, [categorySlug, fallbackCategoryName]);

  // Reset page when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [categorySlug]);

  const totalPages = Math.max(1, Math.ceil(products.length / ITEMS_PER_PAGE));

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return products.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [products, currentPage, ITEMS_PER_PAGE]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    const targetElement = document.getElementById('products-section');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 250, behavior: 'smooth' });
    }
  };

  const getVisiblePages = () => {
    const delta = isMobile ? 1 : isTablet ? 1 : 2;
    const rangeWithDots: (number | string)[] = [];
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    rangeWithDots.push(1);

    let startPage = Math.max(2, currentPage - delta);
    let endPage = Math.min(totalPages - 1, currentPage + delta);

    if (currentPage === 1) {
      endPage = Math.min(totalPages - 1, 1 + delta * 2);
    } else if (currentPage === totalPages) {
      startPage = Math.max(2, totalPages - delta * 2);
    } else {
      startPage = Math.max(2, Math.min(startPage, currentPage));
      endPage = Math.min(totalPages - 1, Math.max(endPage, currentPage));
    }

    if (startPage > 2) {
      rangeWithDots.push('...');
    }

    for (let i = startPage; i <= endPage; i++) {
      if (i !== 1 && i !== totalPages) {
        rangeWithDots.push(i);
      }
    }

    if (endPage < totalPages - 1) {
      rangeWithDots.push('...');
    }

    if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }
    return rangeWithDots;
  };

  if (isLoading) {
    return (
      <section className="w-full">
        <StoreNavbar />
        <div className="container mx-auto px-6 md:px-10 lg:px-12 max-w-8xl">
          <div className="mb-8">
            <Skeleton className="h-4 w-32 mb-4" />
            <Skeleton className="h-10 w-64 mb-3" />
            <Skeleton className="h-4 w-72" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 min-h-100 pb-16">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={`product-skeleton-${index}`} className="pointer-events-none">
                <Skeleton className="rounded-lg sm:rounded-xl aspect-4/3 w-full" />
                <div className="pt-2 sm:pt-3 space-y-2">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-4 w-28" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || products.length === 0) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-['KoPub_Batang'] text-zinc-800 mb-4">
            {error ? 'Unable to load category' : 'Category not found'}
          </h1>
          {error && <p className="text-zinc-500 mb-4">{error}</p>}
          <Link href="/browse" className="text-orange-600 hover:text-orange-700">
            Back to Catalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="w-full">
      <StoreNavbar />

      {/* Category Header */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 py-8 sm:py-10 lg:py-12">
        <div className="-mb-10 py-35">
          <h1 className="text-3xl sm:text-4xl lg:text-4xl font-normal text-neutral-900 tracking-tight mb-3 text-center">
            {categoryName}
          </h1>
        </div>
      </div>

      {/* Products Header Bar */}
      <div id="products-section" className="container mx-auto px-6 md:px-10 lg:px-12 max-w-8xl">
        <div className="transition-all duration-700 z-30 w-full flex items-center justify-between text-neutral-600 h-10 md:h-14 font-light text-sm px-0 md:mb-12 mb-6 backdrop-blur-xl border-b border-t border-neutral-200">
          <p className="font-medium text-neutral-900">
            Products ({products.length})
            {totalPages > 1 && (
              <span className="text-muted-foreground font-normal ml-2 text-xs sm:text-sm">
                • Page {currentPage} of {totalPages}
              </span>
            )}
          </p>
          <div className="h-full flex items-center justify-center select-none cursor-pointer gap-2">
            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true" className="opacity-70 w-4 h-4 text-neutral-600" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <p className="hidden md:block text-neutral-600 text-sm font-medium">More products available</p>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="container mx-auto px-6 md:px-10 lg:px-12 max-w-8xl">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6 min-h-100 pb-12">
          {paginatedProducts.map((product) => (
            <Link
              key={product.id}
              href={`/browse/${categorySlug}/${product.slug}`}
              className="group focus-visible:outline-none"
              aria-label={`View details for ${product.name}`}
            >
              {/* Image Container */}
              <div className="relative bg-zinc-100 overflow-hidden aspect-4/5">
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Staff Pick Badge - Top Left */}
                {product.isStaffPick && (
                  <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 px-2 py-0.5 sm:px-2.5 sm:py-1 bg-white/50 text-black backdrop-blur-sm rounded-full text-[10px] sm:text-xs font-normal flex items-center gap-1 z-10">
                    <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-white/50 text-black" />
                    <span>Staff Pick</span>
                  </div>
                )}

                {/* Tap/Click Indicator */}
                <div
                  className="absolute top-1 right-1 sm:top-2 sm:right-2 p-1.5 sm:p-2 bg-white/50 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  aria-hidden="true"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    color="currentColor"
                    className="text-zinc-800 sm:w-4 sm:h-4"
                  >
                    <path
                      d="M19.9264 22.2516V20.691C19.9264 20.288 20.0525 19.8966 20.2639 19.5531C21.7583 17.1245 22.2279 14.5196 21.9002 13.505C20.857 11.3418 17.3758 10.4907 15.76 10.2878L16.7966 5.12292C16.9705 4.30387 16.3513 3.47938 15.4135 3.28136C14.4758 3.08334 13.5746 3.58679 13.4007 4.40583L11.3462 14.0815L8.77462 12.4424C8.77462 12.4424 7.47969 11.406 6.44041 12.4424C5.40114 13.4788 6.44041 14.7701 6.44041 14.7701L10.3488 19.7776C10.6003 20.0997 10.7468 20.4908 10.7688 20.8984L10.8401 22.2177"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M9.867 4.36134C9.867 4.36134 10.1124 2.14335 9.867 1.90156M9.867 1.90156C9.54861 1.58797 7.32936 1.85194 7.32936 1.85194M9.867 1.90156L6.89808 4.84002M2.11005 7.08754C2.11005 7.08754 1.86463 9.30553 2.11005 9.54732M2.11005 9.54732C2.42845 9.86092 4.6477 9.59694 4.6477 9.59694M2.11005 9.54732L5.07898 6.60886"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>

                {/* Price Badge - Bottom Right */}
                <p className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-white/50 backdrop-blur-sm rounded-full text-xs sm:text-sm font-semibold text-zinc-900">
                  {product.price}
                </p>
              </div>

              {/* Product Info */}
              <div className="pt-2 sm:pt-3">
                <p className="text-[10px] sm:text-xs text-zinc-500 line-clamp-1">
                  {product.category ? `${product.category}` : categoryName}
                </p>
                <h3 className="text-xs sm:text-sm font-medium text-zinc-900 line-clamp-2 mt-0.5">
                  {product.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        {products.length > 0 && (
          <div className="w-full flex justify-center pb-16 overflow-x-auto">
            <Pagination className="flex-wrap min-w-fit">
              <PaginationPrevious
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                size={isMobile ? 'sm' : 'default'}
              >
                {isMobile ? 'Prev' : 'Previous'}
              </PaginationPrevious>
              {getVisiblePages().map((page, index) =>
                page === '...' ? (
                  <PaginationEllipsis key={`ellipsis-${index}`} />
                ) : (
                  <PaginationItem
                    key={page}
                    isActive={page === currentPage}
                    onClick={() => handlePageChange(page as number)}
                    size={isMobile ? 'sm' : 'default'}
                  >
                    {page}
                  </PaginationItem>
                )
              )}
              <PaginationNext
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                size={isMobile ? 'sm' : 'default'}
              >
                {isMobile ? 'Next' : 'Next'}
              </PaginationNext>
            </Pagination>
          </div>
        )}
      </div>
    </section>
  );
}
