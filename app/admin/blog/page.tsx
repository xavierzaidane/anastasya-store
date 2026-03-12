'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Blog, ApiResponse } from '@/types/api';
import { Button } from '@/components/ui/button';
import { CreateBlogDialog } from '@/components/admin/blog/CreateBlogDialog';
import { DataTable } from './data-table';
import { createColumns } from './columns';

export default function BlogPage() {
  const [posts, setPosts] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/blogs');
      if (!response.ok) {
        throw new Error('Failed to fetch blog posts');
      }
      
      const result: ApiResponse<Blog[]> = await response.json();
      setPosts(result.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handlePostCreated = () => {
    fetchPosts();
  };

  const handlePostUpdated = () => {
    fetchPosts();
  };

  const handlePostDeleted = () => {
    fetchPosts();
  };

  const columns = useMemo(
    () =>
      createColumns({
        onPostUpdated: handlePostUpdated,
        onPostDeleted: handlePostDeleted,
      }),
    []
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold font-mono text-foreground">Blog Posts</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your blog content and articles
          </p>
        </div>
        <CreateBlogDialog onPostCreated={handlePostCreated} />
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4">
          <p className="text-destructive">{error}</p>
          <Button variant="outline" size="sm" onClick={fetchPosts} className="mt-2">
            Try Again
          </Button>
        </div>
      )}

      {/* Blog DataTable */}
      <DataTable
        columns={columns}
        data={posts}
        isLoading={isLoading}
        searchPlaceholder="Search blog posts..."
      />
    </div>
  );
}
