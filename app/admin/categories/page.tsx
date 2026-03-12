'use client';

import { useState, useEffect, useMemo } from 'react';
import CreateCategoryDialog from '@/components/admin/categories/CreateCategoryDialog';
import { DataTable } from './data-table';
import { createColumns, Category } from './columns';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
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

  const columns = useMemo(
    () =>
      createColumns({
        onCategoryUpdated: fetchCategories,
        onCategoryDeleted: fetchCategories,
      }),
    []
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold font-mono text-foreground">Categories</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your product categories
          </p>
        </div>
        <div className="flex items-center gap-2">
          <CreateCategoryDialog onCategoryCreated={fetchCategories} />
        </div>
      </div>

      {error && (
        <div className="p-4 text-sm text-destructive bg-destructive/10 rounded-lg border border-destructive/20">
          {error}
        </div>
      )}
      <DataTable columns={columns} data={categories} isLoading={isLoading} />
    </div>
  );
}
