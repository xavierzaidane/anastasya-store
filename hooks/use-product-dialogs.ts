'use client';

import { useState, useCallback } from 'react';
import { Product } from '@/data/products';

export function useProductDialogs() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);

  const openProductDialog = useCallback((product: Product) => {
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
