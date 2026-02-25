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
import { Separator } from '@/components/ui/separator';
import { Product } from '@/data/products';
import { Eye, Star, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface ViewProductDialogProps {
  product: Product;
  children?: React.ReactNode;
}

export function ViewProductDialog({ product, children }: ViewProductDialogProps) {
  const [open, setOpen] = useState(false);

  const getCategoryBadgeVariant = (category: string) => {
    switch (category) {
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
    }
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
            <Badge variant={getCategoryBadgeVariant(product.category)}>
              {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
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
              <Image
                src={product.img}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className='border rounded-lg p-3'>
                <p className="text-sm text-neutral-500">Slug</p>
                <p className="font-medium font-mono text-neutral-900">{product.slug}</p>
              </div>
              <div className='border rounded-lg p-3'>
                <p className="text-sm text-neutral-500">Price</p>
                <p className="font-medium font-mono text-neutral-900 text-lg">{product.price}</p>
              </div>
            </div>

            
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Included Items */}
            <div className="border rounded-lg p-4">
              <p className="text-sm text-neutral-500 mb-2">Included Items</p>
              <ul className="space-y-1.5">
                {product.items.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-neutral-700">
                    <span className="text-green-500 mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Description */}
            <div className='border rounded-lg p-3'>
              <p className="text-sm text-neutral-500 mb-2">Description</p>
              <p className="text-neutral-700 whitespace-pre-wrap">{product.description}</p>
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
            <Link href={`/catalog/${product.category}/${product.slug}`} target="_blank">
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
