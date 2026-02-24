'use client';

import { useProductDialogs } from '@/hooks/use-product-dialogs';
import { ProductDetailDialogAdvanced } from './ProductDetailDialogAdvanced';

export function DialogProvider({ children }: { children: React.ReactNode }) {
  const {
    selectedProduct,
    isProductDialogOpen,
    closeProductDialog,
  } = useProductDialogs();

  return (
    <>
      {children}

      {/* Product Detail Dialog */}
      {selectedProduct && (
        <ProductDetailDialogAdvanced
          product={selectedProduct}
          open={isProductDialogOpen}
          onOpenChange={(open) => {
            if (!open) closeProductDialog();
          }}
        />
      )}
    </>
  );
}

// Export hook for use in components
export { useProductDialogs } from '@/hooks/use-product-dialogs';
