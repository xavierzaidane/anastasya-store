'use client';

import { useState, useCallback } from 'react';

interface Product {
  id: number;
  slug: string;
  name: string;
  price: string;
  img: string;
  rating: number;
  reviews: number;
  description: string;
  items: string[];
  category?: string;
}

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
