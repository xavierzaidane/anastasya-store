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
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-8 mt-1">
        <div className="mb-8 py-8">
          <h1 className="text-3xl font-semibold font-mono text-zinc-900 tracking-tight mb-2">
            Browse by Category
          </h1>
          <p className="text-zinc-600">Explore our curated collection organized by category</p>
        </div>

        <div className="pb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 min-h-100">
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
              <div className="relative bg-zinc-100 rounded-xl overflow-hidden aspect-4/3">
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
              <div className="pt-3">
                <p className="text-xs text-zinc-500">{itemCount} items</p>
                <h3 className="text-sm font-medium text-zinc-900">{name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </section>

  );
}