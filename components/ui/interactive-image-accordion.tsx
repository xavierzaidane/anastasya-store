"use client";

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

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

// --- Accordion Item Component ---
type AccordionItemProps = {
  item: CategoryItem;
  isActive: boolean;
  onMouseEnter: () => void;
};

const AccordionItem = ({ item, isActive, onMouseEnter }: AccordionItemProps) => {
  return (
    <div
      className={`
        relative h-[450px] rounded-lg overflow-hidden cursor-pointer
        transition-all duration-700 ease-in-out
        ${isActive ? 'w-[500px]' : 'w-[60px]'}
      `}
      onMouseEnter={onMouseEnter}
    >
      {/* Background Image */}
      <img
        src={item.imageUrl}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover"
      />
    

      {/* Caption Text */}
      <span
        className={`
          absolute text-white text-lg font-normal whitespace-nowrap
          transition-all duration-300 ease-in-out
          ${
            isActive
              ? 'bottom-6 left-1/2 -translate-x-1/2 rotate-0' // Active state: horizontal, bottom-center
              // Inactive state: vertical, positioned at the bottom, for all screen sizes
              : 'w-auto text-left bottom-24 left-1/2 -translate-x-1/2 rotate-90'
          }
        `}
      >
        {item.title}
      </span>
    </div>
  );
};


// --- Main App Component ---
export function LandingAccordionItem() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [accordionItems, setAccordionItems] = useState<CategoryItem[]>([]);

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

        setAccordionItems(items);
        setActiveIndex(0);
      } catch {
        // Keep empty UI if categories cannot be loaded.
      }
    };

    fetchCategories();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleItemHover = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div >
      <section className="container mx-auto px-4 ">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          
          {/* Left Side: Text Content */}
          <div className="w-full md:w-1/2 text-center md:text-left">
          <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-sm font-normal tracking-widest"
            >
              Our Category
              
            </motion.p>
            <h1 className="text-4xl md:text-5xl font-normal text-gray-900 leading-tight tracking-tighter">
              Category Collection
            </h1>
            <p className="mt-6 text-sm text-gray-600 max-w-xl mx-auto md:mx-0">
              Build high-performance AI apps on-device without the hassle of model compression or edge deployment.
            </p>
         
          </div>

          {/* Right Side: Image Accordion */}
          <div className="w-full md:w-1/2">
            {/* Changed flex-col to flex-row to keep the layout consistent */}
            <div className="flex flex-row items-center justify-center gap-4 overflow-x-auto p-4">
              {accordionItems.map((item, index) => (
                <AccordionItem
                  key={item.id}
                  item={item}
                  isActive={index === activeIndex}
                  onMouseEnter={() => handleItemHover(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
