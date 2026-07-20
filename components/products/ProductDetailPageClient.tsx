"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { XIcon, Share2, ShoppingCart, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { motion } from "motion/react";
import { Button } from "../ui/button";
import { orderViaWhatsApp } from "@/lib/whatsapp";
import { useSavedItems } from "@/hooks/use-saved-items";
import { StorefrontProduct } from "@/types/storefront";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

interface Props {
  initialProduct: StorefrontProduct;
}

export default function ProductDetailPageClient({ initialProduct }: Props) {
  const router = useRouter();
  const liveProduct = initialProduct;
  const [quantity, setQuantity] = useState(1);
  const [isOrdering, setIsOrdering] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { isItemSaved, toggleItem, addItem } = useSavedItems();
  const isBookmarked = liveProduct ? isItemSaved(liveProduct.id) : false;
  const images = useMemo(() => {
    const galleryImages = (liveProduct.gallery || []).filter((image): image is string => Boolean(image && image.trim()));
    return [liveProduct.img, ...galleryImages.filter((image) => image !== liveProduct.img)];
  }, [liveProduct.gallery, liveProduct.img]);

  useEffect(() => {
    let cancelled = false;

    queueMicrotask(() => {
      if (cancelled) return;
      setCurrentImageIndex(0);
      setImageLoaded(false);
      setImageError(false);
    });

    return () => {
      cancelled = true;
    };
  }, [liveProduct.id]);

  const currentImageSrc = images[currentImageIndex] || liveProduct.img;

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
    setImageLoaded(false);
    setImageError(false);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    setImageLoaded(false);
    setImageError(false);
  };

  const handleImageLoad = () => setImageLoaded(true);
  const handleImageError = () => setImageError(true);

  const increaseQuantity = () => setQuantity((q) => q + 1);
  const decreaseQuantity = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const handleToggleBookmark = () => {
    if (!liveProduct) return;
    if (isBookmarked) toggleItem(liveProduct);
    else addItem(liveProduct, quantity);
  };

  const handleOrderViaWhatsApp = () => {
    if (!liveProduct) return;
    setIsOrdering(true);
    try {
      orderViaWhatsApp(liveProduct, quantity);
      setTimeout(() => setIsOrdering(false), 500);
    } catch (err) {
      console.error(err);
      setIsOrdering(false);
    }
  };

  const handleBack = () => router.back();

  const renderGallery = () => (
    <div className="group relative aspect-3/4 overflow-hidden ">
      {!imageLoaded && !imageError && <div className="absolute inset-0 animate-pulse" />}

      {imageError ? (
        <div className="flex h-full w-full items-center justify-center text-sm text-zinc-500">
          Image not available
        </div>
      ) : (
        <motion.img
          key={currentImageIndex}
          src={currentImageSrc}
          alt={`${liveProduct.name} - View ${currentImageIndex + 1}`}
          className="object-cover w-full h-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          loading="eager"
        />
      )}

      {images.length > 1 && (
        <div className="absolute inset-0 flex items-center justify-between p-2 opacity-0 transition-opacity group-hover:opacity-100">
          <Button
            type="button"
            variant="secondary"
            size="icon-sm"
            className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm shadow-sm"
            onClick={handlePrevImage}
            aria-label="Previous image"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="icon-sm"
            className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm shadow-sm"
            onClick={handleNextImage}
            aria-label="Next image"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {images.length > 1 && (
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`h-1.5 rounded-full transition-all ${
                index === currentImageIndex ? "w-4 bg-gray-200" : "w-1.5 bg-gray-200/30"
              }`}
              onClick={() => {
                setCurrentImageIndex(index);
                setImageLoaded(false);
                setImageError(false);
              }}
              aria-label={`View image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <main className="w-full">
      <div className="grid gap-8 lg:grid-cols-2 items-start">
        {/* Left: image area */}
        <div className="hidden md:block  overflow-hidden lg:aspect-3/4">
          {renderGallery()}
        </div>

        {/* Right: details */}
        <div className="flex flex-col md:p-9 p-2 -mt-10">

          <div className="md:hidden mb-6 overflow-hidden rounded-none">
            {renderGallery()}
          </div>

          <div className="pr-4 md:pr-0 no-scrollbar">
            <div className="flex items-center gap-2 mb-2">
              <p className="text-md text-zinc-500">{liveProduct.category || 'Product'}</p>
              {liveProduct.isStaffPick && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-semibold">
                  <Star className="w-3 h-3 fill-current" /> Staff Pick
                </span>
              )}
            </div>

            <h1 className="text-3xl font-normal text-zinc-900 mb-4 tracking-tight">{liveProduct.name}</h1>

            <div className="mb-6">
              <p className="text-4xl font-semibold text-zinc-900 tracking-tight">{liveProduct.price}</p>
            </div>

         

           
          </div>

          <div className="pt-6  mt-1">
            <div className="flex flex-col gap-4 ">
              <div className="flex justify-between items-end gap-6 mb-10">
                <div className="flex items-center gap-4">
                  <label htmlFor="quantity" className="text-md font-normal">Quantity:</label>
                  <div className="flex items-center gap-2 border border-zinc-300 rounded-lg overflow-hidden">
                    <button onClick={decreaseQuantity} disabled={quantity <= 1} className="p-2 hover: disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200" aria-label="Decrease quantity">-</button>
                    <span id="quantity" className="w-12 text-center text-base font-medium text-zinc-900" aria-live="polite">{quantity}</span>
                    <button onClick={increaseQuantity} className="p-2 hover: transition-colors duration-200" aria-label="Increase quantity">+</button>
                  </div>
                </div>

                <div className="flex flex-col gap-1 text-right">
                  <p>Add to Cart</p> 
                  <p className="text-sm text-muted-foreground">Click Button Below</p>
                </div>
              </div>

              <div className="flex gap-3">
                {/* WhatsApp Button */}
                <button 
                  onClick={handleOrderViaWhatsApp} 
                  disabled={isOrdering} 
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-medium hover:bg-primary/80 transition-colors duration-200 disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  <SiWhatsapp className="w-5 h-5 text-background" />
                  <span>{isOrdering ? 'Opening WhatsApp...' : 'Order via WhatsApp'}</span>
                </button>

                {/* Button baru (contoh: bookmark/cart kamu) */}
                <button 
                  onClick={handleToggleBookmark} 
                  className={`p-3 transition-colors duration-200 ${
                    isBookmarked 
                      ? 'bg-zinc-900 text-white hover:bg-zinc-800' 
                      : 'bg-foreground/20 hover: text-zinc-600 hover:text-zinc-800'
                  }`}
                >
                  <ShoppingCart className="w-5 h-5" fill={isBookmarked ? 'currentColor' : 'none'} />
                </button>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-6">
            <Accordion type="single" collapsible className="w-full border-t">

              {/* Accordion 1 - Product Details */}
              <AccordionItem value="product-details">
                <AccordionTrigger className="text-sm font-semibold text-zinc-900">
                  Product Details
                </AccordionTrigger>

                <AccordionContent>
                  <div className="space-y-3 text-sm text-zinc-600 pt-2">
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Category:</span>
                      <span className="font-medium text-zinc-900">
                        {liveProduct.category || 'General'}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-zinc-500">Price:</span>
                      <span className="font-medium text-zinc-900">
                        {liveProduct.price}
                      </span>
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="text-zinc-500">Description:</span>
                      <span className="font-medium text-zinc-700">
                        {liveProduct.description}
                      </span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Accordion 2 - What's Included */}
              {liveProduct.items.length > 0 && (
                <AccordionItem value="whats-included">
                  <AccordionTrigger className="text-sm font-semibold text-zinc-900">
                    What&apos;s Included
                  </AccordionTrigger>

                  <AccordionContent>
                    <ul className="space-y-2 pt-2">
                      {liveProduct.items.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-zinc-700">
                          <span className="text-zinc-400 mt-0.5">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              )}

            </Accordion>
          </div>
        </div>
      </div>
    </main>
  );
}
