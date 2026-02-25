'use client';

import { useState, useEffect } from 'react';
import { X, Minus, Plus } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import { motion, AnimatePresence } from 'framer-motion';
import { useSavedItems, SavedItem } from '@/hooks/use-saved-items';
import { orderMultipleItemsViaWhatsApp } from '@/lib/whatsapp';

interface SavedItemsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SavedItemsSheet({ open, onOpenChange }: SavedItemsSheetProps) {
  const { savedItems, removeItem, updateQuantity, clearItems, getTotalItems } = useSavedItems();
  const [isOrdering, setIsOrdering] = useState(false);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onOpenChange(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open, onOpenChange]);

  // Prevent body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const handleOrderViaWhatsApp = () => {
    if (savedItems.length === 0) return;
    
    setIsOrdering(true);
    try {
      orderMultipleItemsViaWhatsApp(savedItems);
      setTimeout(() => {
        setIsOrdering(false);
      }, 500);
    } catch (error) {
      console.error('Error opening WhatsApp:', error);
      setIsOrdering(false);
    }
  };

  const calculateTotal = () => {
    return savedItems.reduce((total, item) => {
      const priceNum = parseFloat(item.price.replace(/[^0-9.]/g, ''));
      return total + (priceNum * item.quantity);
    }, 0);
  };

  const formatPrice = (price: number) => {
    return `${price.toLocaleString('de-DE')} Euro`;
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => onOpenChange(false)}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.section
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            aria-label="Bag drawer content"
            tabIndex={-1}
            className="fixed right-4 left-4 top-0 bottom-0 w-auto sm:left-auto sm:w-96 h-[calc(100vh-2rem)] my-4 bg-white rounded-xl shadow-2xl z-50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200">
              <h2 className="text-xl font-semibold text-zinc-900">
                Bag{' '}
                <span className="text-zinc-500 text-base font-normal">
                  [{getTotalItems()}]
                </span>
              </h2>
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="p-1.5 rounded-full hover:bg-zinc-100 transition-colors duration-200"
                aria-label="Close drawer"
              >
                <X className="w-5 h-5 text-zinc-500" />
              </button>
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 overflow-hidden">
              <div className="flex-1 overflow-y-auto p-6">
                {savedItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-20 h-20 bg-zinc-100 rounded-full flex items-center justify-center mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="text-zinc-300"
                      >
                        <path
                          d="M3.97418 9.41999C3.97418 5.93499 6.79418 3.11499 10.2792 3.11499C13.7642 3.11499 16.5842 5.93499 16.5842 9.41999"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M11.1209 21.8101H6.87086C3.26086 21.8101 2.61086 20.2501 2.42086 18.3501L1.78086 12.4301C1.53086 10.0501 2.23086 8.12012 6.25086 8.12012H14.3009C18.3109 8.12012 19.0209 10.0501 18.7709 12.4301L18.4309 15.5001"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M21.3016 15.3L19.0916 17.51L16.8816 19.72"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M21.2707 19.69L19.0607 17.48L16.8508 15.27"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <p className="text-zinc-700 font-medium mb-1">Your bag is empty</p>
                    <p className="text-zinc-400 text-sm max-w-48">
                      Browse our collection and save your favorites!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <AnimatePresence mode="popLayout">
                      {savedItems.map((item) => (
                        <SavedItemCard
                          key={item.id}
                          item={item}
                          onRemove={() => removeItem(item.id)}
                          onUpdateQuantity={(qty) => updateQuantity(item.id, qty)}
                        />
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </div>

              {/* Footer */}
              {savedItems.length > 0 && (
                <div className="border-t border-zinc-200 p-6 bg-white">
                  {/* Total */}
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold font-mono text-zinc-900">Total</span>
                    <span className="text-xl font-bold font-mono text-zinc-900">
                      {formatPrice(calculateTotal())}
                    </span>
                  </div>

                  {/* Checkout Button */}
                  <button
                    type="button"
                    onClick={handleOrderViaWhatsApp}
                    disabled={isOrdering}
                    className="w-full px-6 py-3 bg-zinc-900 text-white font-medium rounded-lg hover:bg-zinc-800 transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <SiWhatsapp className="w-5 h-5 text-[#25D366]" />
                    <span>{isOrdering ? 'Opening WhatsApp...' : 'Checkout via WhatsApp'}</span>
                  </button>

                  {/* Clear All */}
                  <button
                    type="button"
                    onClick={clearItems}
                    className="w-full text-xs text-zinc-500 hover:text-zinc-700 text-center mt-3 transition-colors"
                  >
                    Clear all items
                  </button>
                </div>
              )}
            </div>
          </motion.section>
        </>
      )}
    </AnimatePresence>
  );
}

// Individual saved item card
function SavedItemCard({
  item,
  onRemove,
  onUpdateQuantity,
}: {
  item: SavedItem;
  onRemove: () => void;
  onUpdateQuantity: (quantity: number) => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
      className="flex gap-4 p-4 border border-zinc-200 rounded-lg"
    >
      <div className="size-24 bg-zinc-100 rounded-lg overflow-hidden shrink-0">
        <img
          src={item.img}
          alt={item.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/placeholder-flower.jpg';
          }}
        />
      </div>

      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div className="flex justify-between gap-2">
          <div className="flex flex-col gap-y-0.5">
            <h3 className="text-sm font-medium text-zinc-900 truncate">{item.name}</h3>
            <p className="text-xs text-zinc-500">{item.category || 'Flower'}</p>
          </div>
          <div>
            <button
              type="button"
              onClick={onRemove}
              className="p-1.5 hover:bg-zinc-100 rounded-full transition-colors duration-200"
              aria-label="Remove item"
            >
              <X className="w-4 h-4 text-zinc-500" />
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center gap-2">
          <div className="flex items-center gap-1 border border-zinc-300 rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={() => onUpdateQuantity(item.quantity - 1)}
              className="p-1.5 hover:bg-zinc-100 transition-colors duration-200"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5 text-zinc-700" />
            </button>
            <span className="w-8 text-center text-sm font-medium text-zinc-900">
              {item.quantity}
            </span>
            <button
              type="button"
              onClick={() => onUpdateQuantity(item.quantity + 1)}
              className="p-1.5 hover:bg-zinc-100 transition-colors duration-200"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5 text-zinc-700" />
            </button>
          </div>
          <p className="text-base font-semibold text-zinc-900">{item.price}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default SavedItemsSheet;
