'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { ArrowUpDown, Package, RefreshCw } from 'lucide-react';
import CreateCategoryDialog from '@/components/admin/categories/CreateCategoryDialog';
import ViewCategoryDialog from '@/components/admin/categories/ViewCategoryDialog';
import EditCategoryDialog from '@/components/admin/categories/EditCategoryDialog';
import DeleteCategoryDialog from '@/components/admin/categories/DeleteCategoryDialog';

interface Category {
  id: number;
  slug: string;
  name: string;
  image: string | null;
  productCount: number;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [sortField, setSortField] = useState<keyof Category | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch categories');
      }
      
      setCategories(data.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Sort categories
  const sortedCategories = [...categories].sort((a, b) => {
    if (!sortField) return 0;
    const aVal = a[sortField];
    const bVal = b[sortField];
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return sortDirection === 'asc'
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
    }
    return 0;
  });

  const handleSort = (field: keyof Category) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedCategories(sortedCategories.map((c) => c.id));
    } else {
      setSelectedCategories([]);
    }
  };

  const handleSelectCategory = (categoryId: number, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, categoryId]);
    } else {
      setSelectedCategories(selectedCategories.filter((id) => id !== categoryId));
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold font-mono text-neutral-900">Categories</h1>
          <p className="text-sm text-neutral-500 mt-1">
            Manage your product categories
          </p>
        </div>
        <div className="flex items-center gap-2">
          <CreateCategoryDialog onCategoryCreated={fetchCategories} />
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="p-4 text-sm text-red-600 bg-red-50 rounded-lg border border-red-200">
          {error}
        </div>
      )}

      {/* Categories Table */}
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-neutral-50 hover:bg-neutral-50">
              <TableHead className="w-12">
                <Checkbox
                  checked={
                    selectedCategories.length === sortedCategories.length &&
                    sortedCategories.length > 0
                  }
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead className="w-20">Image</TableHead>
              <TableHead>
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center gap-1 hover:text-neutral-900"
                >
                  Name
                  <ArrowUpDown className="h-3.5 w-3.5" />
                </button>
              </TableHead>
              <TableHead>
                <button
                  onClick={() => handleSort('slug')}
                  className="flex items-center gap-1 hover:text-neutral-900"
                >
                  Slug
                  <ArrowUpDown className="h-3.5 w-3.5" />
                </button>
              </TableHead>
              <TableHead>
                <button
                  onClick={() => handleSort('productCount')}
                  className="flex items-center gap-1 hover:text-neutral-900"
                >
                  Products
                  <ArrowUpDown className="h-3.5 w-3.5" />
                </button>
              </TableHead>
              <TableHead className="text-center pr-4">Manage</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center">
                  <div className="flex items-center justify-center gap-2 text-neutral-500">
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Loading categories...
                  </div>
                </TableCell>
              </TableRow>
            ) : sortedCategories.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center">
                  <p className="text-neutral-500">No categories found</p>
                </TableCell>
              </TableRow>
            ) : (
              sortedCategories.map((category) => (
                <TableRow
                  key={category.id}
                  className={
                    selectedCategories.includes(category.id)
                      ? 'bg-neutral-50'
                      : ''
                  }
                >
                  <TableCell>
                    <Checkbox
                      checked={selectedCategories.includes(category.id)}
                      onCheckedChange={(checked) =>
                        handleSelectCategory(category.id, checked as boolean)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-neutral-100">
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
                  </TableCell>
                  <TableCell>
                    <span className="font-medium text-neutral-900">
                      {category.name}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="font-mono text-sm text-neutral-600">
                      {category.slug}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {category.productCount}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center pr-1">
                    <div className="inline-flex items-center gap-3">
                      <ViewCategoryDialog category={category}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 px-4 text-xs rounded-full shadow-none"
                        >
                          View
                        </Button>
                      </ViewCategoryDialog>
                      <EditCategoryDialog category={category} onCategoryUpdated={fetchCategories}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 px-4 text-xs rounded-full shadow-none"
                        >
                          Edit
                        </Button>
                      </EditCategoryDialog>
                      <DeleteCategoryDialog category={category} onCategoryDeleted={fetchCategories}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 px-4 text-xs rounded-full shadow-none bg-destructive text-primary-foreground hover:text-destructive-foreground hover:bg-destructive-50 border"
                        >
                          Delete
                        </Button>
                      </DeleteCategoryDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {/* Table Footer */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-neutral-200 bg-neutral-50">
          <p className="text-sm text-neutral-500">
            Showing <span className="font-medium">{sortedCategories.length}</span> categories
          </p>
        </div>
      </div>
    </div>
  );
}
