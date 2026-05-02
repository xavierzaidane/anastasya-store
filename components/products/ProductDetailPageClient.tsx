"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { XIcon, Share2, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
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
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);
  const desktopImageRef = useRef<HTMLImageElement>(null);
  const mobileImageRef = useRef<HTMLImageElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const { isItemSaved, toggleItem, addItem } = useSavedItems();
  const isBookmarked = liveProduct ? isItemSaved(liveProduct.id) : false;

  const getCurrentImage = () => {
    if (currentGalleryIndex === 0) return liveProduct.img;
    const galleryImage = liveProduct.gallery?.[currentGalleryIndex - 1];
    return galleryImage && galleryImage.trim() ? galleryImage : liveProduct.img;
  };

  const currentImageSrc = getCurrentImage();

  const handleNextImage = () => {
    const maxIndex = (liveProduct.gallery?.length || 0) + 1;
    setCurrentGalleryIndex((prev) => (prev + 1) % maxIndex);
    setImageLoaded(false);
    setImageError(false);
  };

  const handlePrevImage = () => {
    const maxIndex = (liveProduct.gallery?.length || 0) + 1;
    setCurrentGalleryIndex((prev) => (prev - 1 + maxIndex) % maxIndex);
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

  return (
    <main className="w-full">
      <div className="grid gap-8 lg:grid-cols-2 items-start">
        {/* Left: image area */}
        <div className="hidden md:flex bg-zinc-100 items-center justify-center p-0 relative aspect-square lg:aspect-4/5 overflow-hidden rounded-lg">
          {!imageLoaded && !imageError && <div className="w-full h-full bg-zinc-200 animate-pulse" />}
          {imageError ? (
            <div className="w-full h-full flex items-center justify-center bg-zinc-100 text-zinc-500 text-sm">
              Image not available
            </div>
          ) : (
            <img
              ref={desktopImageRef}
              key={currentImageSrc}
              src={currentImageSrc}
              alt={liveProduct.name}
              className={`w-full h-full object-cover rounded-lg transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={handleImageLoad}
              onError={handleImageError}
              loading="eager"
            />
          )}

          {(liveProduct.gallery?.length || 0) > 0 && (
            <>
              <button onClick={handlePrevImage} className="absolute left-4 p-2 bg-white rounded-full hover:bg-zinc-200 transition-colors z-10 shadow-lg" aria-label="Previous image">
                <ChevronLeft className="w-5 h-5 text-zinc-900" />
              </button>
              <button onClick={handleNextImage} className="absolute right-4 p-2 bg-white rounded-full hover:bg-zinc-200 transition-colors z-10 shadow-lg" aria-label="Next image">
                <ChevronRight className="w-5 h-5 text-zinc-900" />
              </button>
              <div className="absolute bottom-4 flex gap-1">
                <div className="bg-white px-3 py-1 rounded-full text-xs font-medium text-zinc-900">{currentGalleryIndex + 1} / {(liveProduct.gallery?.length || 0) + 1}</div>
              </div>
            </>
          )}
        </div>

        {/* Right: details */}
        <div className="flex flex-col md:p-9 p-2 -mt-10">

          <div className="md:hidden mb-6 relative w-screen -mx-6 h-150">
            {!imageLoaded && !imageError && <div className="w-full h-full bg-zinc-200 animate-pulse" />}
            {imageError ? (
                <div className="w-full h-full flex items-center justify-center bg-zinc-100 text-zinc-500 text-sm">Image not available</div>
              ) : (
                <img
                  ref={mobileImageRef}
                  key={currentImageSrc}
                  src={currentImageSrc}
                  alt={liveProduct.name}
                  className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                  loading="eager"
                />
              )}

              {(liveProduct.gallery?.length || 0) > 0 && (
                <>
                  <button onClick={handlePrevImage} className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full hover:bg-zinc-200 transition-colors z-10 shadow-lg" aria-label="Previous image">
                    <ChevronLeft className="w-4 h-4 text-zinc-900" />
                  </button>
                  <button onClick={handleNextImage} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full hover:bg-zinc-200 transition-colors z-10 shadow-lg" aria-label="Next image">
                    <ChevronRight className="w-4 h-4 text-zinc-900" />
                  </button>
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white px-2 py-1 rounded-full text-xs font-medium text-zinc-900">{currentGalleryIndex + 1} / {(liveProduct.gallery?.length || 0) + 1}</div>
                </>
              )}
          </div>

          <div ref={scrollContainerRef} className="pr-4 md:pr-0 no-scrollbar">
            <p className="text-md text-zinc-500 mb-2">{liveProduct.category || 'Product'}</p>

            <h1 className="text-3xl font-normal text-zinc-900 mb-4 tracking-tight">{liveProduct.name}</h1>

            <div className="mb-6">
              <p className="text-4xl font-semibold text-zinc-900 tracking-tight">{liveProduct.price}</p>
            </div>

         

           
          </div>

          <div className="pt-6  mt-16">
            <div className="flex flex-col gap-4 ">
              <div className="flex justify-between items-end gap-6 mb-10">
                <div className="flex items-center gap-4">
                  <label htmlFor="quantity" className="text-md font-normal">Quantity:</label>
                  <div className="flex items-center gap-2 border border-zinc-300 rounded-lg overflow-hidden">
                    <button onClick={decreaseQuantity} disabled={quantity <= 1} className="p-2 hover:bg-zinc-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200" aria-label="Decrease quantity">-</button>
                    <span id="quantity" className="w-12 text-center text-base font-medium text-zinc-900" aria-live="polite">{quantity}</span>
                    <button onClick={increaseQuantity} className="p-2 hover:bg-zinc-100 transition-colors duration-200" aria-label="Increase quantity">+</button>
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
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-foreground text-white font-medium rounded-lg hover:bg-foreground/80 transition-colors duration-200 disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  <SiWhatsapp className="w-5 h-5 text-background" />
                  <span>{isOrdering ? 'Opening WhatsApp...' : 'Order via WhatsApp'}</span>
                </button>

                {/* Button baru (contoh: bookmark/cart kamu) */}
                <button 
                  onClick={handleToggleBookmark} 
                  className={`p-3 rounded-lg transition-colors duration-200 ${
                    isBookmarked 
                      ? 'bg-zinc-900 text-white hover:bg-zinc-800' 
                      : 'bg-foreground/20 hover:bg-zinc-100 text-zinc-600 hover:text-zinc-800'
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
