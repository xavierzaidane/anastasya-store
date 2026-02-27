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
import { Eye, ExternalLink, Package } from 'lucide-react';
import Link from 'next/link';

interface Category {
  id: number;
  slug: string;
  name: string;
  image: string | null;
  productCount: number;
}

interface ViewCategoryDialogProps {
  category: Category;
  children?: React.ReactNode;
}

export function ViewCategoryDialog({ category, children }: ViewCategoryDialogProps) {
  const [open, setOpen] = useState(false);

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
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            {category.name}
            <Badge variant="secondary">
              {category.productCount} {category.productCount === 1 ? 'product' : 'products'}
            </Badge>
          </DialogTitle>
          <DialogDescription>
            Category Details
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Category Image */}
          {category.image ? (
            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-neutral-100">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-neutral-100 flex items-center justify-center">
              <Package className="h-12 w-12 text-neutral-300" />
            </div>
          )}

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="border rounded-lg p-3">
              <p className="text-sm text-neutral-500">Slug</p>
              <p className="font-medium font-mono text-neutral-900">{category.slug}</p>
            </div>
            <div className="border rounded-lg p-3">
              <p className="text-sm text-neutral-500">Products</p>
              <p className="font-medium font-mono text-neutral-900 text-lg">{category.productCount}</p>
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
            <Link href={`/catalog/${category.slug}`} target="_blank">
              <ExternalLink className="h-4 w-4 mr-2" />
              View in Store
            </Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ViewCategoryDialog;
