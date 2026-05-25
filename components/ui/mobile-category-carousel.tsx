"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

// Mobile carousel card component
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
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchCategories = async () => {
      try {
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
      }
    };

    fetchCategories();

    return () => {
      isMounted = false;
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = direction === "left" ? -320 : 320;
    scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <div className="w-full">
      <div className="mb-4 flex items-center justify-end">
      </div>

      <div className="relative">
        {/* Carousel Container */}
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
