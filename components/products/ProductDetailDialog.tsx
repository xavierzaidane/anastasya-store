'use client';

import { useState, useRef, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { XIcon, Share2, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import { orderViaWhatsApp } from '@/lib/whatsapp';
import { SiWhatsapp } from "react-icons/si";
import { useSavedItems } from '@/hooks/use-saved-items';
import { mapApiProductToStorefront } from '@/lib/storefront-products';
import { StorefrontApiResponse, StorefrontProduct } from '@/types/storefront';


interface ProductDetailDialogProps {
  product: StorefrontProduct | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface ProductDetailData {
  id: number;
  slug: string;
  name: string;
  price: number | string;
  image: string | null;
  gallery?: string[];
  description?: string | null;
  items?: string[];
  category?: {
    slug: string;
    name: string;
  };
}

export function ProductDetailDialogAdvanced({
  product,
  open,
  onOpenChange,
}: ProductDetailDialogProps) {
  const [liveProduct, setLiveProduct] = useState<StorefrontProduct | null>(product);
  const [quantity, setQuantity] = useState(1);
  const [isOrdering, setIsOrdering] = useState(false);
  const [isFetchingProduct, setIsFetchingProduct] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const { isItemSaved, toggleItem, addItem } = useSavedItems();
  const isBookmarked = liveProduct ? isItemSaved(liveProduct.id) : false;

  useEffect(() => {
    if (product) {
      setLiveProduct(product);
      setImageLoaded(false);
      setImageError(false);
      setQuantity(1);
      setCurrentGalleryIndex(0);
    }
  }, [product]);

  useEffect(() => {
    if (!open || !product?.slug) return;

    let isMounted = true;

    const fetchProductDetail = async () => {
      try {
        setIsFetchingProduct(true);

        const response = await fetch(`/api/products/${product.slug}`, {
          cache: 'no-store',
        });

        const result: StorefrontApiResponse<ProductDetailData> = await response.json();

        if (!response.ok || !result.success || !result.data || !isMounted) {
          return;
        }

        setLiveProduct(mapApiProductToStorefront(result.data, product.category));
      } catch {
      } finally {
        if (isMounted) {
          setIsFetchingProduct(false);
        }
      }
    };

    fetchProductDetail();

    return () => {
      isMounted = false;
    };
  }, [open, product?.slug, product?.category]);

  // Early return if no product - must be AFTER all hooks
  if (!product || !liveProduct) {
    return null;
  }

  const handleToggleBookmark = () => {
    if (isBookmarked) {
      toggleItem(liveProduct);
    } else {
      addItem(liveProduct, quantity);
    }
  };

  const handleOrderViaWhatsApp = () => {
    setIsOrdering(true);
    try {
      orderViaWhatsApp(liveProduct, quantity);
      setTimeout(() => {
        setIsOrdering(false);
      }, 500);
    } catch (error) {
      console.error('Error opening WhatsApp:', error);
      setIsOrdering(false);
    }
  };

  const increaseQuantity = () => setQuantity((q) => q + 1);
  const decreaseQuantity = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const getCurrentImage = () => {
    if (currentGalleryIndex === 0) {
      return liveProduct.img;
    }
    const galleryImage = liveProduct.gallery?.[currentGalleryIndex - 1];
    return (galleryImage && galleryImage.trim()) ? galleryImage : liveProduct.img;
  };

  const handleNextImage = () => {
    const maxIndex = (liveProduct.gallery?.length || 0) + 1;
    setCurrentGalleryIndex((prev) => (prev + 1) % maxIndex);
    setImageLoaded(false);
  };

  const handlePrevImage = () => {
    const maxIndex = (liveProduct.gallery?.length || 0) + 1;
    setCurrentGalleryIndex((prev) => (prev - 1 + maxIndex) % maxIndex);
    setImageLoaded(false);
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (scrollContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
      const isAtTop = scrollTop === 0;
      const isAtBottom = scrollTop + clientHeight === scrollHeight;

      if ((isAtTop && e.deltaY < 0) || (isAtBottom && e.deltaY > 0)) {
        return;
      }
      e.stopPropagation();
    }
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const contentVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 10 },
    visible: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: 10 },
  };
  const priceDisplay = liveProduct.price;

  return (
    <AnimatePresence mode="wait">
      {open && (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
          <Dialog.Portal forceMount>
            <Dialog.Overlay forceMount asChild>
              <motion.div
                variants={overlayVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.2, ease: 'easeInOut' }}
                className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              />
            </Dialog.Overlay>

            <Dialog.Content forceMount asChild>
              <motion.div
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{
                  duration: 0.3,
                  ease: 'easeOut',
                  type: 'spring',
                  stiffness: 300,
                  damping: 30,
                }}
                className="
                  fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50
                  w-[95vw] sm:w-[90vw] md:w-[85vw] max-w-4xl
                  rounded-2xl bg-white text-zinc-900
                  
                  focus:outline-none
                  max-h-[90vh] overflow-hidden flex flex-col
                  md:grid md:grid-cols-2
                "
              >

                <div className="hidden md:flex bg-zinc-100 items-center justify-center p-0 relative min-h-full">
                  {!imageLoaded && !imageError && (
                    <div className="w-full h-full bg-zinc-200 animate-pulse" />
                  )}
                  {imageError ? (
                    <div className="w-full h-full flex items-center justify-center bg-zinc-100 text-zinc-500 text-sm">
                      Image not available
                    </div>
                  ) : (
                    <img
                      src={getCurrentImage()}
                      alt={liveProduct.name}
                      className={`w-full h-full object-cover transition-opacity duration-300 ${
                        imageLoaded ? 'opacity-100' : 'opacity-0'
                      }`}
                      onLoad={handleImageLoad}
                      onError={handleImageError}
                    />
                  )}
                  
                  {(liveProduct.gallery?.length || 0) > 0 && (
                    <>
                      <button
                        onClick={handlePrevImage}
                        className="absolute left-4 p-2 bg-white rounded-full hover:bg-zinc-200 transition-colors z-10 shadow-lg"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="w-5 h-5 text-zinc-900" />
                      </button>
                      <button
                        onClick={handleNextImage}
                        className="absolute right-4 p-2 bg-white rounded-full hover:bg-zinc-200 transition-colors z-10 shadow-lg"
                        aria-label="Next image"
                      >
                        <ChevronRight className="w-5 h-5 text-zinc-900" />
                      </button>
                      <div className="absolute bottom-4 flex gap-1">
                        <div className="bg-white px-3 py-1 rounded-full text-xs font-medium text-zinc-900">
                          {currentGalleryIndex + 1} / {(liveProduct.gallery?.length || 0) + 1}
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className="flex flex-col md:p-9 p-6 max-h-[90vh] overflow-y-auto relative">
                  <Dialog.Close className="absolute top-4 right-4 md:top-4 md:right-4 p-2 bg-white rounded-full hover:bg-zinc-100 text-zinc-600 hover:text-zinc-800 transition-colors z-10">
                    <XIcon className="h-5 w-5" />
                  </Dialog.Close>

                  <div className="h-8" />

                  <div className="md:hidden mb-6 relative">
                    {!imageLoaded && !imageError && (
                      <div className="w-full aspect-square max-h-[40vh] bg-zinc-200 animate-pulse rounded-lg" />
                    )}
                    {imageError ? (
                      <div className="w-full aspect-square max-h-[40vh] flex items-center justify-center bg-zinc-100 text-zinc-500 text-sm rounded-lg">
                        Image not available
                      </div>
                    ) : (
                      <img
                        src={getCurrentImage()}
                        alt={liveProduct.name}
                        className={`w-full aspect-square max-h-[40vh] object-cover rounded-lg transition-opacity duration-300 ${
                          imageLoaded ? 'opacity-100' : 'opacity-0'
                        }`}
                        onLoad={handleImageLoad}
                        onError={handleImageError}
                      />
                    )}
                    
                    {(liveProduct.gallery?.length || 0) > 0 && (
                      <>
                        <button
                          onClick={handlePrevImage}
                          className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full hover:bg-zinc-200 transition-colors z-10 shadow-lg"
                          aria-label="Previous image"
                        >
                          <ChevronLeft className="w-4 h-4 text-zinc-900" />
                        </button>
                        <button
                          onClick={handleNextImage}
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full hover:bg-zinc-200 transition-colors z-10 shadow-lg"
                          aria-label="Next image"
                        >
                          <ChevronRight className="w-4 h-4 text-zinc-900" />
                        </button>
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white px-2 py-1 rounded-full text-xs font-medium text-zinc-900">
                          {currentGalleryIndex + 1} / {(liveProduct.gallery?.length || 0) + 1}
                        </div>
                      </>
                    )}
                  </div>

                  <div
                    ref={scrollContainerRef}
                    onWheel={handleWheel}
                    className="flex-1 overflow-y-auto pr-4 md:pr-0 no-scrollbar"
                  >
                    <p className="text-sm text-zinc-500 mb-2">
                      {liveProduct.category || 'Product'} 
                    </p>

                    <Dialog.Title className="text-3xl font-medium font-mono text-zinc-900 mb-4 tracking-tight">
                      {liveProduct.name}
                    </Dialog.Title>


                    <div className="mb-6">
                      <p className="text-4xl font-mono font-semibold text-zinc-900 tracking-tight">{priceDisplay}</p>
                    </div>

                    <div className="py-6 border-t border-zinc-200">
                      <h3 className="text-sm font-semibold text-zinc-900 mb-3">Product Details</h3>
                      <div className="space-y-2 text-sm text-zinc-600">
                        <div className="flex justify-between">
                          <span className="text-zinc-500">Category:</span>
                          <span className="font-medium text-zinc-900">{liveProduct.category || 'General'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-500">Price:</span>
                          <span className="font-medium text-zinc-900">{priceDisplay}</span>
                        </div>
                        <div className="flex justify-between items-center pt-2">
                          
                     
                        </div>
                        <div className="flex flex-col gap-2 -mt-3">
                          <span className="text-zinc-500">Description:</span>
                          <span className="font-medium text-zinc-700">{liveProduct.description}</span>
                        </div>
                      </div>
                    </div>

                    {liveProduct.items.length > 0 && (
                      <div className="py-6 border-t border-zinc-200">
                        <h3 className="text-sm font-semibold text-zinc-900 mb-3">What&apos;s Included</h3>
                        <ul className="space-y-2">
                          {liveProduct.items.map((item, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm text-zinc-700">
                              <span className="text-zinc-400 mt-0.5">✓</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="pt-6 border-t border-zinc-200 mt-6">
                    <div className="flex flex-col gap-4">
                      <div className="flex justify-between items-end">
                        <div className="flex items-center gap-4">
                          <label htmlFor="quantity" className="text-sm font-medium text-zinc-900">
                            Quantity:
                          </label>
                          <div className="flex items-center gap-2 border border-zinc-300 rounded-lg overflow-hidden">
                            <button
                              onClick={decreaseQuantity}
                              disabled={quantity <= 1}
                              className="p-2 hover:bg-zinc-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                              aria-label="Decrease quantity"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                color="currentColor"
                                className="text-zinc-700"
                              >
                                <path
                                  d="M20 12L4 12"
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="1.5"
                                />
                              </svg>
                            </button>
                            <span id="quantity" className="w-12 text-center text-base font-medium text-zinc-900" aria-live="polite">
                              {quantity}
                            </span>
                            <button
                              onClick={increaseQuantity}
                              className="p-2 hover:bg-zinc-100 transition-colors duration-200"
                              aria-label="Increase quantity"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                color="currentColor"
                                className="text-zinc-700"
                              >
                                <path
                                  d="M12 4V20M20 12H4"
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="1.5"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>

                        <div className="flex gap-1">
                          <button
                            onClick={handleToggleBookmark}
                            className={`p-2 rounded-full transition-colors duration-200 ${
                              isBookmarked 
                                ? 'bg-zinc-900 text-white hover:bg-zinc-800' 
                                : 'bg-white hover:bg-zinc-100 text-zinc-600 hover:text-zinc-800'
                            }`}
                            aria-label={isBookmarked ? "Remove from saved" : "Save item"}
                          >
                            <ShoppingCart className="w-5 h-5" fill={isBookmarked ? 'currentColor' : 'none'} />
                          </button>
                          <button
                            className="p-2 rounded-full transition-colors duration-200 bg-white hover:bg-zinc-100 text-zinc-600 hover:text-zinc-800"
                            aria-label="Share product"
                          >
                            <Share2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={handleOrderViaWhatsApp}
                        disabled={isOrdering}
                        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-zinc-900 text-white font-medium  rounded-xl hover:bg-zinc-800 transition-colors duration-200 disabled:opacity-75 disabled:cursor-not-allowed"
                      >
                        <SiWhatsapp className="w-5 h-5 text-[#25D366]" />
                        <span>{isOrdering ? 'Opening WhatsApp...' : 'Order via WhatsApp'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      )}
    </AnimatePresence>
  );
}
