'use client';

import { useState, useCallback } from 'react';
import { StorefrontProduct } from '@/types/storefront';

export function useProductDialogs() {
  const [selectedProduct, setSelectedProduct] = useState<StorefrontProduct | null>(null);
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);

  const openProductDialog = useCallback((product: StorefrontProduct) => {
    setSelectedProduct(product);
    setIsProductDialogOpen(true);
  }, []);

  const closeProductDialog = useCallback(() => {
    setIsProductDialogOpen(false);
    setSelectedProduct(null);
  }, []);

  return {
    // Product Dialog
    selectedProduct,
    isProductDialogOpen,
    openProductDialog,
    closeProductDialog,
  };
}
