"use client";

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type CategoryItem = {
  id: number;
  title: string;
  imageUrl: string;
};

type CategoriesApiResponse = {
  success: boolean;
  message: string;
  data: Array<{
    id: number;
    name: string;
    image: string | null;
  }> | null;
};

// Mobile carousel card component
const CarouselCard = ({ item, onClick }: { item: CategoryItem; onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="relative shrink-0 w-48 h-56 rounded-lg overflow-hidden cursor-pointer group"
    >
      {/* Background Image */}
      <img
        src={item.imageUrl}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />

      {/* Title */}
      <span className="absolute bottom-4 left-4 right-4 text-white text-sm font-medium line-clamp-2">
        {item.title}
      </span>
    </button>
  );
};

export function MobileCategoryCarousel() {
  const [carouselItems, setCarouselItems] = useState<CategoryItem[]>([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories", { cache: "no-store" });
        if (!response.ok) return;

        const result: CategoriesApiResponse = await response.json();
        if (!result.success || !result.data || !isMounted) return;

        const items = result.data
          .filter((category) => Boolean(category.image))
          .map((category) => ({
            id: category.id,
            title: category.name,
            imageUrl: category.image as string,
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

    const scrollAmount = 240; // Card width + gap
    const newPosition =
      direction === "left"
        ? Math.max(0, scrollPosition - scrollAmount)
        : scrollPosition + scrollAmount;

    scrollContainerRef.current.scrollLeft = newPosition;
    setScrollPosition(newPosition);
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      setScrollPosition(scrollContainerRef.current.scrollLeft);
    }
  };

  return (
    <div className="w-full">
      <div className="relative">
        {/* Carousel Container */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 no-scrollbar"
        >
          {carouselItems.map((item) => (
            <CarouselCard
              key={item.id}
              item={item}
              onClick={() => {
                // Handle category selection if needed
                console.log("Selected category:", item.title);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
