"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

type CategoryItem = {
  id: number;
  slug: string;
  title: string;
  imageUrl: string;
};

type CategoriesApiResponse = {
  success: boolean;
  message: string;
  data: Array<{
    id: number;
    slug: string;
    name: string;
    image: string | null;
  }> | null;
};

const CarouselCard = ({ item }: { item: CategoryItem }) => {
  return (
    <Link
      href={`/browse/${item.slug}`}
      className="shrink-0 w-78"
    >
      <div className="relative h-86 rounded-lg overflow-hidden cursor-pointer group">
        <img
          src={item.imageUrl}
          alt={item.title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <span className="mt-3 block text-sm font-medium text-neutral-900 line-clamp-2 text-center">
        {item.title}
      </span>
    </Link>
  );
};

export function MobileCategoryCarousel() {
  const [carouselItems, setCarouselItems] = useState<CategoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/categories", { cache: "no-store" });
        if (!response.ok) return;

        const result: CategoriesApiResponse = await response.json();
        if (!result.success || !result.data || !isMounted) return;

        const items = result.data.map((category) => ({
          id: category.id,
          slug: category.slug,
          title: category.name,
          imageUrl: category.image || "/bunga1.jpg",
        }));

        setCarouselItems(items);
      } catch {
        // Keep empty UI if categories cannot be loaded.
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchCategories();

    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) {
    return (
      <div className="w-full">
        <div className="relative">
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 no-scrollbar">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="shrink-0 w-78 flex flex-col gap-3">
                <Skeleton className="h-86 rounded-lg w-full" />
                <Skeleton className="h-4 w-32 mx-auto rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="relative">
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 no-scrollbar"
        >
          {carouselItems.map((item) => (
            <CarouselCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
