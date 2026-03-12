'use client';

import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { ArrowUpDown, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import ViewCategoryDialog from '@/components/admin/categories/ViewCategoryDialog';
import EditCategoryDialog from '@/components/admin/categories/EditCategoryDialog';
import DeleteCategoryDialog from '@/components/admin/categories/DeleteCategoryDialog';

export interface Category {
  id: number;
  slug: string;
  name: string;
  image: string | null;
  productCount: number;
}

interface ColumnsProps {
  onCategoryUpdated: () => void;
  onCategoryDeleted: () => void;
}

export const createColumns = ({
  onCategoryUpdated,
  onCategoryDeleted,
}: ColumnsProps): ColumnDef<Category>[] => [
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
            <div className="w-full h-full flex items-center justify-center">
              <Package className="h-5 w-5 text-muted-foreground" />
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
          Name
          <ArrowUpDown className="ml-2 h-3.5 w-3.5" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="font-medium text-foreground">
          {row.getValue('name')}
        </span>
      );
    },
  },
  {
    accessorKey: 'slug',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="-ml-4"
        >
          Slug
          <ArrowUpDown className="ml-2 h-3.5 w-3.5" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="font-mono text-sm text-muted-foreground">
          {row.getValue('slug')}
        </span>
      );
    },
  },
  {
    accessorKey: 'productCount',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="-ml-4"
        >
          Products
          <ArrowUpDown className="ml-2 h-3.5 w-3.5" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <Badge variant="secondary">
          {row.getValue('productCount')}
        </Badge>
      );
    },
  },
  {
    id: 'actions',
    header: () => <div className="text-center">Manage</div>,
    cell: ({ row }) => {
      const category = row.original;
      return (
        <div className="flex items-center justify-center gap-3">
          <ViewCategoryDialog category={category}>
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-4 text-xs rounded-full shadow-none"
            >
              View
            </Button>
          </ViewCategoryDialog>
          <EditCategoryDialog category={category} onCategoryUpdated={onCategoryUpdated}>
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-4 text-xs rounded-full shadow-none"
            >
              Edit
            </Button>
          </EditCategoryDialog>
          <DeleteCategoryDialog category={category} onCategoryDeleted={onCategoryDeleted}>
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-4 text-xs rounded-full shadow-none bg-destructive text-primary-foreground dark:text-destructive hover:text-destructive-foreground hover:bg-destructive-50 border"
            >
              Delete
            </Button>
          </DeleteCategoryDialog>
        </div>
      );
    },
    enableSorting: false,
  },
];
