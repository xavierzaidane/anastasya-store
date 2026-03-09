'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types/api';
import { Eye, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface ViewProductDialogProps {
  product: Product;
  children?: React.ReactNode;
}

export function ViewProductDialog({ product, children }: ViewProductDialogProps) {
  const [open, setOpen] = useState(false);

  const getCategoryBadgeVariant = (categorySlug: string) => {
    switch (categorySlug) {
       case 'small':
        return 'secondary';
      case 'medium':
        return 'default';
      case 'large':
        return 'destructive';
      case 'money':
        return 'ghost';
      case 'round':
        return 'outline';
      case 'custom':
        return 'link';
      default:
        return 'default';
    }
  };

  const formatPrice = (price: string | number) => {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(numPrice);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline" size="sm" className="h-8 px-4 text-xs rounded-full shadow-none">
            <Eye className="h-3.5 w-3.5 mr-1.5" />
            View
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            {product.name}
            <Badge variant={getCategoryBadgeVariant(product.category?.slug || '')}>
              {product.category?.name || 'Uncategorized'}
            </Badge>
          </DialogTitle>
          <DialogDescription>
            Product Details
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Product Image */}
            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-neutral-100">
              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-neutral-400">
                  No image available
                </div>
              )}
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className='border rounded-lg p-3'>
                <p className="text-sm text-muted-foreground">Slug</p>
                <p className="font-medium font-mono text-foreground">{product.slug}</p>
              </div>
              <div className='border rounded-lg p-3'>
                <p className="text-sm text-muted-foreground">Price</p>
                <p className="font-medium font-mono text-foreground text-lg">{formatPrice(product.price)}</p>
              </div>
            </div>

            
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Included Items */}
            <div className="border rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-2">Included Items</p>
              {product.items && product.items.length > 0 ? (
                <ul className="space-y-1.5">
                  {product.items.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-foreground">
                      <span className="text-green-500 mt-0.5">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground text-sm">No items listed</p>
              )}
            </div>

            {/* Description */}
            <div className='border rounded-lg p-3'>
              <p className="text-sm text-muted-foreground mb-2">Description</p>
              <p className="text-foreground whitespace-pre-wrap">{product.description || 'No description available'}</p>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
          >
            Close
          </Button>
          <Button asChild>
            <Link href={`/catalog/${product.category?.slug || 'products'}/${product.slug}`} target="_blank">
              <ExternalLink className="h-4 w-4 mr-2" />
              View in Store
            </Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ViewProductDialog;
