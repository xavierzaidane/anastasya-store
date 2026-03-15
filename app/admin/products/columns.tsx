'use client';

import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types/api';
import { ViewProductDialog } from '@/components/admin/products/ViewProductDialog';
import { EditProductDialog } from '@/components/admin/products/EditProductDialog';
import { DeleteProductDialog } from '@/components/admin/products/DeleteProductDialog';

interface ColumnsProps {
  onProductUpdated: () => void;
  onProductDeleted: () => void;
}

const getCategoryBadgeVariant = (categoryId: number) => {
  const variants: Array<'default' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link'> = [
    'default',
    'secondary',
    'destructive',
    'outline',
    'ghost',
    'link',
  ];
  return variants[categoryId % variants.length];
};

const formatPrice = (price: string | number) => {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(numPrice);
};

export const createColumns = ({
  onProductUpdated,
  onProductDeleted,
}: ColumnsProps): ColumnDef<Product>[] => [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() ? 'indeterminate' : false)
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'image',
    header: 'Image',
    cell: ({ row }) => {
      const image = row.getValue('image') as string | null;
      const name = row.original.name;
      return (
        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-muted">
          {image ? (
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
              No img
            </div>
          )}
        </div>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="-ml-4"
        >
          Product
          <ArrowUpDown className="ml-2 h-3.5 w-3.5" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const name = row.getValue('name') as string;
      const description = row.original.description;
      return (
        <div className="flex flex-col">
          <span className="font-medium text-foreground">{name}</span>
          <span className="text-xs text-muted-foreground truncate max-w-50">
            {description}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'items',
    header: 'Items',
    cell: ({ row }) => {
      const items = row.getValue('items') as string[];
      return (
        <span className="text-xs text-muted-foreground">
          {items?.length > 0 ? `${items.length} items` : 'No items'}
        </span>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: 'gallery',
    header: 'Gallery',
    cell: ({ row }) => {
      const gallery = row.getValue('gallery') as string[];
      return (
        <span className="text-xs text-muted-foreground">
          {gallery?.length > 0 ? `${gallery.length} image${gallery.length !== 1 ? 's' : ''}` : 'No images'}
        </span>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ row }) => {
      const category = row.original.category;
      return (
        <Badge variant={getCategoryBadgeVariant(category?.id || 0)}>
          {category?.name || 'Uncategorized'}
        </Badge>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: 'price',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="-ml-4"
        >
          Price
          <ArrowUpDown className="ml-2 h-3.5 w-3.5" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const price = row.getValue('price') as string | number;
      return (
        <span className="font-light font-mono text-foreground">
          {formatPrice(price)}
        </span>
      );
    },
  },
  {
    id: 'actions',
    header: () => <div className="text-center pr-4">Manage</div>,
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div className="flex items-center justify-center gap-3">
          <ViewProductDialog product={product}>
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-4 text-xs rounded-full shadow-none"
            >
              View
            </Button>
          </ViewProductDialog>
          <EditProductDialog product={product} onProductUpdated={onProductUpdated}>
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-4 text-xs rounded-full shadow-none"
            >
              Edit
            </Button>
          </EditProductDialog>
          <DeleteProductDialog product={product} onProductDeleted={onProductDeleted}>
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-4 text-xs rounded-full shadow-none bg-destructive text-primary-foreground dark:text-destructive hover:text-destructive-foreground hover:bg-destructive-50 border"
            >
              Delete
            </Button>
          </DeleteProductDialog>
        </div>
      );
    },
    enableSorting: false,
  },
];
