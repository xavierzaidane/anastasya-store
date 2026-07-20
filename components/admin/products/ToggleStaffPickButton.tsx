'use client';

import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Product } from '@/types/api';

interface ToggleStaffPickButtonProps {
  product: Product;
  onProductUpdated: () => void;
}

export const ToggleStaffPickButton: React.FC<ToggleStaffPickButtonProps> = ({
  product,
  onProductUpdated,
}) => {
  const [loading, setLoading] = useState(false);
  const isPicked = Boolean(product.isStaffPick);

  const handleToggle = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await fetch(`/api/products/${product.slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isStaffPick: !isPicked,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to update staff pick status');
      }

      toast.success(
        !isPicked
          ? `"${product.name}" added to Staff Picks`
          : `"${product.name}" removed from Staff Picks`
      );

      onProductUpdated();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to update staff pick status';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleToggle}
      disabled={loading}
      className="h-8 w-8 p-0 rounded-full hover:bg-amber-500/10 focus-visible:ring-1 focus-visible:ring-amber-500"
      title={isPicked ? 'Remove from Staff Picks' : 'Mark as Staff Pick'}
      aria-label={isPicked ? 'Remove from Staff Picks' : 'Mark as Staff Pick'}
    >
      <Star
        className={`h-4 w-4 transition-colors ${
          isPicked
            ? 'text-amber-500 fill-amber-500'
            : 'text-muted-foreground hover:text-amber-500'
        }`}
      />
    </Button>
  );
};
