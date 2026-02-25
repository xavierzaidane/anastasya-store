'use client';

import { useProductDialogs } from '@/hooks/use-product-dialogs';
import { ProductDetailDialogAdvanced } from './ProductDetailDialog';

export function DialogProvider({ children }: { children: React.ReactNode }) {
  const {
    selectedProduct,
    isProductDialogOpen,
    closeProductDialog,
  } = useProductDialogs();

  return (
    <>
      {children}
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
export { useProductDialogs } from '@/hooks/use-product-dialogs';
