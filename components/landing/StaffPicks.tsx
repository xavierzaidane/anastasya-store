"use client";

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
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

  if (isLoading || products.length === 0) {
    return null;
  }

  return (
    <section className="relative w-full py-12 md:py-16 mt-15">
      <div className="mb-8 md:mb-10">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tighter text-neutral-900 leading-[0.95]">
          Our Best Selling.
        </h2>
        <p className="mt-3 text-base text-neutral-600 leading-relaxed max-w-xl">
          Explore our hand-curated collection of floral favorites, personally selected by our experienced lead florists. Every bouquet is carefully crafted to showcase the freshest seasonal flowers, elegant designs, and exceptional quality, making each gift truly memorable.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/browse/${product.category}/${product.slug}`}
            className="group block focus-visible:outline-none"
            aria-label={`View details for ${product.name}`}
          >
            <div className="relative bg-zinc-100 overflow-hidden aspect-[3/4]">
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
