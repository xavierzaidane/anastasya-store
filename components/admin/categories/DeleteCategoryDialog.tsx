'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Trash2, Package, AlertTriangle } from 'lucide-react';

interface Category {
  id: number;
  slug: string;
  name: string;
  image: string | null;
  productCount: number;
}

interface DeleteCategoryDialogProps {
  category: Category;
  children?: React.ReactNode;
  onCategoryDeleted?: () => void;
}

export function DeleteCategoryDialog({ category, children, onCategoryDeleted }: DeleteCategoryDialogProps) {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    setIsDeleting(true);
    setError(null);

    try {
      const response = await fetch(`/api/categories/${category.slug}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete category');
      }

      onCategoryDeleted?.();
      setOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-3 text-xs text-destructive hover:text-red-700 hover:bg-red-50 transition-all duration-200"
          >
            <Trash2 className="h-3.5 w-3.5 mr-1.5" />
            Delete
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm p-6 gap-0 border-neutral-200/80">
        <DialogHeader className="space-y-4 pb-4">
          <div className="mx-auto h-12 w-12 rounded-full bg-red-50 flex items-center justify-center">
            <Trash2 className="h-5 w-5 text-destructive" />
          </div>
          <DialogTitle className="text-center text-lg font-semibold text-neutral-900">
            Delete Category
          </DialogTitle>
        </DialogHeader>

        {error && (
          <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg mb-4">
            {error}
          </div>
        )}

        {/* Category Preview */}
        <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg border mb-4">
          <div className="relative w-12 h-12 rounded-md overflow-hidden bg-neutral-100 shrink-0">
            {category.image ? (
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Package className="h-5 w-5 text-neutral-300" />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-neutral-900 truncate">{category.name}</p>
            <p className="text-xs text-neutral-500">{category.productCount} products</p>
          </div>
        </div>

        {category.productCount > 0 && (
          <div className="flex items-start gap-2 p-3 bg-amber-50 rounded-lg border border-amber-200 mb-4">
            <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-700">
              This category has {category.productCount} product(s). You may need to reassign them first.
            </p>
          </div>
        )}

        <p className="text-sm text-neutral-500 text-center mb-6">
          This action cannot be undone.
        </p>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isDeleting}
            className="flex-1 h-10 border-neutral-200 hover:bg-neutral-50"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex-1 h-10"
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteCategoryDialog;
