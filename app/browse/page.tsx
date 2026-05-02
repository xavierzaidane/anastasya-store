'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import StoreNavbar from '@/components/navigations/StoreNavbar';
import Footer from '@/components/navigations/Footer';
import { Skeleton } from '@/components/ui/skeleton';

interface Category {
  id: number;
  slug: string;
  name: string;
  image: string | null;
  itemCount: number;
  icon?: React.ReactNode;
}

interface CategoriesApiResponse {
  success: boolean;
  message: string;
  data: Array<{
    id: number;
    slug: string;
    name: string;
    image: string | null;
    productCount: number;
  }> | null;
}

export default function BrowsePage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch('/api/categories', { cache: 'no-store' });
        const result: CategoriesApiResponse = await response.json();

        if (!response.ok || !result.success || !result.data) {
          throw new Error(result.message || 'Failed to load categories');
        }

        const mappedCategories: Category[] = result.data.map((category) => ({
          id: category.id,
          slug: category.slug,
          name: category.name,
          image: category.image,
          itemCount: category.productCount,
        }));

        setCategories(mappedCategories);
      } catch (fetchError) {
        const message = fetchError instanceof Error ? fetchError.message : 'Failed to load categories';
        setError(message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section className="w-full">
      <StoreNavbar />
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-8 mt-15">
        <div className="mb-8 py-35">
          <h1 className="text-3xl font-normal text-zinc-900 tracking-tight mb-2 text-center">
            Browse by Category
          </h1>
        </div>
        <div className="transition-all duration-700 z-30 w-full flex items-center justify-between text-neutral-600 h-10 md:h-14 font-light text-sm px-4 md:px-8 md:mb-12 mb-6 bg-background backdrop-blur-xl border-b border-t border-neutral-200 border-opacity-60">
          <p className="font-medium text-neutral-900">Categories ({categories.length})</p>
          <div className="h-full flex items-center justify-center select-none cursor-pointer gap-2">
            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true" className="opacity-70 w-4 h-4 text-neutral-600" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <p className="hidden md:block text-neutral-600 text-sm font-medium">More products available</p>
          </div>
        </div>

        <div className="pb-8 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 min-h-100">
          {isLoading && (
            Array.from({ length: 6 }).map((_, index) => (
              <div key={`category-skeleton-${index}`} className="pointer-events-none">
                <Skeleton className="rounded-xl aspect-4/3 w-full" />
                <div className="pt-3 space-y-2">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
            ))
          )}

          {!isLoading && error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          {!isLoading && !error && categories.length === 0 && (
            <p className="text-sm text-zinc-500">No categories available.</p>
          )}

          {!isLoading && !error && categories.map(({ id, slug, name, image, itemCount }) => (
            <Link
              key={id}
              href={`/browse/${slug}`}
              className="group cursor-pointer focus-visible:outline-none"
              role="button"
              tabIndex={0}
              aria-label={`Browse ${name} category`}
            >
              <div className="relative bg-zinc-100 rounded-lg overflow-hidden aspect-4/5 sm:aspect-square">
                <img
                  alt={name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  src={image}
                />
                <div
                  className="absolute top-2 right-2 p-2 bg-white/50 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  aria-hidden="true"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    color="currentColor"
                    className="text-zinc-800"
                  >
                    <path d="M19.9264 22.2516V20.691C19.9264 20.288 20.0525 19.8966 20.2639 19.5531C21.7583 17.1245 22.2279 14.5196 21.9002 13.505C20.857 11.3418 17.3758 10.4907 15.76 10.2878L16.7966 5.12292C16.9705 4.30387 16.3513 3.47938 15.4135 3.28136C14.4758 3.08334 13.5746 3.58679 13.4007 4.40583L11.3462 14.0815L8.77462 12.4424C8.77462 12.4424 7.47969 11.406 6.44041 12.4424C5.40114 13.4788 6.44041 14.7701 6.44041 14.7701L10.3488 19.7776C10.6003 20.0997 10.7468 20.4908 10.7688 20.8984L10.8401 22.2177" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                    <path d="M9.867 4.36134C9.867 4.36134 10.1124 2.14335 9.867 1.90156M9.867 1.90156C9.54861 1.58797 7.32936 1.85194 7.32936 1.85194M9.867 1.90156L6.89808 4.84002M2.11005 7.08754C2.11005 7.08754 1.86463 9.30553 2.11005 9.54732M2.11005 9.54732C2.42845 9.86092 4.6477 9.59694 4.6477 9.59694M2.11005 9.54732L5.07898 6.60886" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                  </svg>
                </div>
              </div>
              <div className="pt-2 sm:pt-3">
                <p className="text-[11px] sm:text-xs text-zinc-500">{itemCount} items</p>
                <h3 className="text-xs sm:text-sm font-medium text-zinc-900 leading-tight">{name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </section>

  );
}