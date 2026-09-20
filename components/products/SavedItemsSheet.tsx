/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState } from 'react';
import { Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import { useSavedItems } from '@/hooks/use-saved-items';
import { orderMultipleItemsViaWhatsApp } from '@/lib/whatsapp';
import { Button } from '@/components/ui/button';
import { RippleButton } from '@/components/ui/ripple-button';
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';

interface SavedItemsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SavedItemsSheet({ open, onOpenChange }: SavedItemsSheetProps) {
  const { savedItems, removeItem, updateQuantity, clearItems, getTotalItems } = useSavedItems();
  const [isOrdering, setIsOrdering] = useState(false);

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

  const getRawPrice = (priceStr: string) => {
    const priceNum = parseInt(priceStr.replace(/[^0-9]/g, ''), 10);
    return isNaN(priceNum) ? 0 : priceNum;
  };

  const calculateTotal = () => {
    return savedItems.reduce((total, item) => {
      return total + (getRawPrice(item.price) * item.quantity);
    }, 0);
  };

  const formatPrice = (price: number) => {
    return `Rp ${price.toLocaleString('id-ID')}`;
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <ShoppingCart className="w-5 h-5" />
            Cart ({getTotalItems()})
          </DrawerTitle>
        </DrawerHeader>

        <DrawerBody className="max-h-[60vh] overflow-y-auto">
          {savedItems.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingCart className="w-16 h-16 text-muted-foreground/40 mx-auto mb-4" />
              <p className="text-foreground font-medium mb-1">Your cart is empty</p>
              <p className="text-muted-foreground text-sm mb-6">
                Browse our collection and save your favorites!
              </p>
              <DrawerClose asChild>
                <RippleButton
                  variant="outline"
                  className="border-black/30 tracking-wide text-xs sm:text-sm font-medium px-4 py-2"
                  rippleColor="bg-primary"
                  hoverTextColor="group-hover:text-white"
                >
                  Continue Shopping
                </RippleButton>
              </DrawerClose>
            </div>
          ) : (
            <div className="space-y-4">
              {savedItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 border border-muted rounded-xl bg-card/60"
                >
                  <div className="size-16 sm:size-20 rounded-lg overflow-hidden bg-muted shrink-0">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder-flower.jpg';
                      }}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground text-sm sm:text-base truncate">
                      {item.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {item.price} each
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                    <Button
                      variant="secondary"
                      size="icon"
                      className="h-7 w-7 sm:h-8 sm:w-8"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                    <span className="w-6 sm:w-8 text-center text-xs sm:text-sm font-medium">
                      {item.quantity}
                    </span>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="h-7 w-7 sm:h-8 sm:w-8"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>

                  <div className="text-right shrink-0 flex flex-col items-end gap-1">
                    <p className="font-medium text-xs sm:text-sm text-foreground">
                      {formatPrice(getRawPrice(item.price) * item.quantity)}
                    </p>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30 "
                      onClick={() => removeItem(item.id)}
                      aria-label={`Remove ${item.name}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              ))}

              {/* Order Summary */}
              <div className="border-t border-black/30 pt-4 mt-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Subtotal</span>
                    <span>{formatPrice(calculateTotal())}</span>
                  </div>
                  <div className="border-t border-black/30 pt-2 flex justify-between font-semibold text-base text-foreground">
                    <span>Total</span>
                    <span>{formatPrice(calculateTotal())}</span>
                  </div>
                </div>
                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={clearItems}
                    className="text-xs text-muted-foreground hover:text-destructive transition-colors"
                  >
                    Clear all items
                  </button>
                </div>
              </div>
            </div>
          )}
        </DrawerBody>

        <DrawerFooter className="grid-cols-2">
          <DrawerClose asChild>
            <RippleButton
              variant="outline"
              className="w-full border-black/30 tracking-wide text-xs sm:text-sm font-medium"
              rippleColor="bg-primary"
              hoverTextColor="group-hover:text-white"
            >
              Continue Shopping
            </RippleButton>
          </DrawerClose>
          <RippleButton
            className="w-full gap-2 bg-[#25D366] text-white border-0  tracking-wide text-xs sm:text-sm font-medium shadow-xs"
            rippleColor="bg-[#1ebe5d]"
            hoverTextColor="group-hover:text-white"
            disabled={savedItems.length === 0 || isOrdering}
            onClick={handleOrderViaWhatsApp}
            aria-label={isOrdering ? 'Opening WhatsApp...' : `Checkout (${formatPrice(calculateTotal())})`}
          >
            <SiWhatsapp className="w-4 h-4 shrink-0" />
            <span>{isOrdering ? 'Opening...' : 'Checkout'}</span>
            <span className="hidden sm:inline">
              {!isOrdering && ` (${formatPrice(calculateTotal())})`}
            </span>
          </RippleButton>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default SavedItemsSheet;
