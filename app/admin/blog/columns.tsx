'use client';

import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { ArrowUpDown, Clock, ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Blog } from '@/types/api';
import { ViewBlogDialog } from '@/components/admin/blog/ViewBlogDialog';
import { EditBlogDialog } from '@/components/admin/blog/EditBlogDialog';
import { DeleteBlogDialog } from '@/components/admin/blog/DeleteBlogDialog';

interface ColumnsProps {
  onPostUpdated: () => void;
  onPostDeleted: () => void;
}

const getCategoryBadgeVariant = (category: string | null) => {
  switch (category?.toLowerCase()) {
    case 'tips & tricks':
      return 'secondary';
    case 'guides':
      return 'default';
    case 'care tips':
      return 'outline';
    case 'trends':
      return 'destructive';
    case 'sustainability':
      return 'secondary';
    case 'inspiration':
      return 'default';
    default:
      return 'outline';
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const createColumns = ({
  onPostUpdated,
  onPostDeleted,
}: ColumnsProps): ColumnDef<Blog>[] => [
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
      const title = row.original.title;
      return (
        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          ) : null}
          <ImageIcon className="w-5 h-5 text-muted-foreground absolute" />
        </div>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: 'title',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="-ml-4"
        >
          Title
          <ArrowUpDown className="ml-2 h-3.5 w-3.5" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const title = row.getValue('title') as string;
      const excerpt = row.original.excerpt;
      return (
        <div className="flex flex-col max-w-xs">
          <span className="font-medium text-foreground truncate">{title}</span>
          <span className="text-xs text-muted-foreground truncate">
            {excerpt ? `${excerpt.substring(0, 60)}...` : 'No excerpt'}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'category',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="-ml-4"
        >
          Category
          <ArrowUpDown className="ml-2 h-3.5 w-3.5" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const category = row.getValue('category') as string | null;
      return category ? (
        <Badge variant={getCategoryBadgeVariant(category)}>{category}</Badge>
      ) : (
        <span className="text-muted-foreground text-sm">-</span>
      );
    },
  },
  {
    accessorKey: 'author',
    header: 'Author',
    cell: ({ row }) => {
      const author = row.getValue('author') as string | null;
      return (
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground">
            {author ? author.charAt(0).toUpperCase() : 'A'}
          </div>
          <span className="text-sm text-foreground">{author || 'Unknown'}</span>
        </div>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="-ml-4"
        >
          Date
          <ArrowUpDown className="ml-2 h-3.5 w-3.5" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = row.getValue('createdAt') as string;
      return (
        <span className="text-sm text-muted-foreground">{formatDate(date)}</span>
      );
    },
  },
  {
    accessorKey: 'readTime',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="-ml-4"
        >
          Read Time
          <ArrowUpDown className="ml-2 h-3.5 w-3.5" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const readTime = row.getValue('readTime') as number;
      return (
        <div className="flex items-center gap-1 text-muted-foreground">
          <Clock className="w-3.5 h-3.5" />
          <span className="text-sm">{readTime} min</span>
        </div>
      );
    },
  },
  {
    id: 'actions',
    header: () => <div className="text-center pr-4">Manage</div>,
    cell: ({ row }) => {
      const post = row.original;
      return (
        <div className="flex items-center justify-center gap-3">
          <ViewBlogDialog post={post}>
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-4 text-xs rounded-full shadow-none"
            >
              View
            </Button>
          </ViewBlogDialog>
          <EditBlogDialog post={post} onPostUpdated={onPostUpdated}>
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-4 text-xs rounded-full shadow-none"
            >
              Edit
            </Button>
          </EditBlogDialog>
          <DeleteBlogDialog post={post} onPostDeleted={onPostDeleted}>
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-4 text-xs rounded-full shadow-none bg-destructive text-primary-foreground dark:text-destructive hover:text-destructive-foreground hover:bg-destructive-50 border"
            >
              Delete
            </Button>
          </DeleteBlogDialog>
        </div>
      );
    },
    enableSorting: false,
  },
];
