"use client";

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import { mapApiProductToStorefront } from '@/lib/storefront-products';
import { StorefrontApiResponse, StorefrontPaginatedProducts, StorefrontProduct } from '@/types/storefront';

export default function StaffPicks() {
  const [products, setProducts] = useState<StorefrontProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchStaffPicks = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/products?staffPick=true&limit=5', { cache: 'no-store' });
        if (!response.ok) return;

        const result: StorefrontApiResponse<StorefrontPaginatedProducts> = await response.json();
        if (!result.success || !result.data || !mounted) return;

        const mappedProducts = result.data.items.slice(0, 5).map((product) =>
          mapApiProductToStorefront(product)
        );

        setProducts(mappedProducts);
      } catch {
        // Keep empty if fetch fails
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    fetchStaffPicks();

    return () => {
      mounted = false;
    };
  }, []);

  if (isLoading) {
    return (
      <section className="relative w-full py-12 md:py-16 mt-15">
        <div className="mb-8 md:mb-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tighter text-neutral-900 leading-[0.95]">
            Our Best Selling
          </h2>
          <p className="mt-3 text-base text-neutral-600 leading-relaxed max-w-xl">
            Explore our hand-curated collection of floral favorites, personally selected by our experienced lead florists.
          </p>
        </div>

        {/* Mobile Skeleton Carousel */}
        <div className="md:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 no-scrollbar -mx-6 px-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="shrink-0 w-72 sm:w-78 snap-start">
              <Skeleton className="h-86 rounded-lg w-full" />
              <div className="pt-3 space-y-2">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-4 w-36" />
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Skeleton Grid */}
        <div className="hidden md:grid md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="block">
              <Skeleton className="w-full aspect-[3/4] rounded-md" />
              <div className="pt-3 space-y-2">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="relative w-full py-12 md:py-16 mt-15">
      <div className="mb-8 md:mb-10 text-center md:text-left">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tighter text-neutral-900 leading-[0.95]">
          Our Best Selling
        </h2>
        <p className="mt-3 text-base text-neutral-600 leading-relaxed max-w-xl">
          Explore our hand-curated collection of floral favorites, personally selected by our experienced lead florists.
        </p>
      </div>

      {/* Mobile Carousel */}
      <div className="md:hidden">
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 no-scrollbar -mx-6 px-6">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/browse/${product.category}/${product.slug}`}
              className="shrink-0 w-72 sm:w-78 snap-start group block focus-visible:outline-none"
              aria-label={`View details for ${product.name}`}
            >
              <div className="relative h-86 rounded-lg overflow-hidden cursor-pointer bg-zinc-100 group">
                <img
                  src={product.img}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <p className="absolute bottom-2 right-2 px-3 py-1.5 bg-white/80 backdrop-blur-sm rounded-full text-xs font-semibold text-zinc-900 shadow-sm">
                  {product.price}
                </p>
              </div>

              <div className="pt-3">
                <p className="text-xs text-zinc-500 line-clamp-1">
                  {product.categoryName || product.category}
                </p>
                <h3 className="text-sm font-medium text-zinc-900 line-clamp-2 mt-0.5">
                  {product.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Desktop Grid */}
      <div className="hidden md:grid md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/browse/${product.category}/${product.slug}`}
            className="group block focus-visible:outline-none"
            aria-label={`View details for ${product.name}`}
          >
            <div className="relative bg-zinc-100 overflow-hidden aspect-[3/4] rounded-md">
              <img
                src={product.img}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />

              <p className="absolute bottom-2 right-2 px-3 py-1.5 bg-white/70 backdrop-blur-sm rounded-full text-xs sm:text-sm font-semibold text-zinc-900 shadow-sm">
                {product.price}
              </p>
            </div>

            <div className="pt-3">
              <p className="text-xs text-zinc-500 line-clamp-1">
                {product.categoryName || product.category}
              </p>
              <h3 className="text-sm sm:text-base font-medium text-zinc-900 line-clamp-2 mt-0.5">
                {product.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
