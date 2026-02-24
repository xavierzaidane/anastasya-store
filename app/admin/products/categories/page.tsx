'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
import {
  Plus,
  ArrowUpDown,
  Loader2,
  ImageIcon,
} from 'lucide-react';

interface Category {
  id: number;
  slug: string;
  name: string;
  image: string | null;
  productCount: number;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [sortField, setSortField] = useState<keyof Category | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/categories');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

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

  const handleDeleteCategory = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return;
    
    try {
      const response = await fetch(`/api/categories/${slug}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete category');
      }
      
      // Remove from local state
      setCategories(categories.filter((c) => c.slug !== slug));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete category');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-neutral-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <p className="text-red-500">{error}</p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

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
        <Button asChild className="gap-2 rounded-xl">
          <Link href="/admin/products/categories/new">
            <Plus className="h-4 w-4" />
            Add Category
          </Link>
        </Button>
      </div>

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
            {sortedCategories.length === 0 ? (
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
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-neutral-100 flex items-center justify-center">
                      {category.image ? (
                        <Image
                          src={category.image}
                          alt={category.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <ImageIcon className="w-5 h-5 text-neutral-400" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium text-neutral-900">
                      {category.name}
                    </span>
                  </TableCell>
                  <TableCell>
                    <code className="text-xs bg-neutral-100 px-2 py-1 rounded text-neutral-600">
                      {category.slug}
                    </code>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {category.productCount} {category.productCount === 1 ? 'product' : 'products'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center pr-1">
                    <div className="inline-flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 px-4 text-xs rounded-full shadow-none"
                        asChild
                      >
                        <Link
                          href={`/catalog/${category.slug}`}
                          target="_blank"
                        >
                          View
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 px-4 text-xs rounded-full shadow-none"
                        asChild
                      >
                        <Link href={`/admin/products/categories/${category.slug}/edit`}>
                          Edit
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 px-4 text-xs rounded-full shadow-none text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                        onClick={() => handleDeleteCategory(category.slug)}
                      >
                        Delete
                      </Button>
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
            Showing <span className="font-medium">{sortedCategories.length}</span> of{' '}
            <span className="font-medium">{categories.length}</span> categories
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
