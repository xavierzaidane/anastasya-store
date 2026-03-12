'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Product, ApiResponse, PaginatedData, Category } from '@/types/api';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import CreateProductDialog from '@/components/admin/products/CreateProductDialog';
import { DataTable } from './data-table';
import { createColumns } from './columns';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch('/api/categories');
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const result: ApiResponse<Category[]> = await response.json();
      setCategories(result.data || []);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  }, []);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      let categorySlug = '';
      if (selectedCategory) {
        const category = categories.find(c => c.id.toString() === selectedCategory);
        categorySlug = category?.slug || '';
      }

      const params = new URLSearchParams({
        page: page.toString(),
        limit: pageSize.toString(),
        ...(categorySlug && { category: categorySlug }),
      });
      
      const response = await fetch(`/api/products?${params}`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      
      const result: ApiResponse<PaginatedData<Product>> = await response.json();
      setProducts(result.data.items);
      setTotalPages(result.data.totalPages);
      setTotal(result.data.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [page, pageSize, selectedCategory, categories]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleProductCreated = () => {
    fetchProducts();
  };

  const handleProductUpdated = () => {
    fetchProducts();
  };

  const handleProductDeleted = () => {
    fetchProducts();
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(1); 
  };

  const columns = useMemo(
    () =>
      createColumns({
        onProductUpdated: handleProductUpdated,
        onProductDeleted: handleProductDeleted,
      }),
    []
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold font-mono text-foreground">Products</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your flower bouquet inventory
          </p>
        </div>
        <CreateProductDialog onProductCreated={handleProductCreated} />
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-foreground">Filter by Category:</label>
        <Select value={selectedCategory} onValueChange={(value) => {
          setSelectedCategory(value === 'all' ? '' : value);
          setPage(1);
        }}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id.toString()}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {error && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4">
          <p className="text-destructive">{error}</p>
          <Button variant="outline" size="sm" onClick={fetchProducts} className="mt-2">
            Try Again
          </Button>
        </div>
      )}
      <DataTable
        columns={columns}
        data={products}
        isLoading={isLoading}
        searchPlaceholder="Search products..."
        page={page}
        totalPages={totalPages}
        total={total}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
    </div>
  );
}
