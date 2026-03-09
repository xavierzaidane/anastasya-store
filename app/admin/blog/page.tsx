'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Blog, ApiResponse } from '@/types/api';
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
  ArrowUpDown,
  ImageIcon,
  Clock,
  Loader2,
} from 'lucide-react';
import { ViewBlogDialog } from '@/components/admin/blog/ViewBlogDialog';
import { EditBlogDialog } from '@/components/admin/blog/EditBlogDialog';
import { DeleteBlogDialog } from '@/components/admin/blog/DeleteBlogDialog';
import { CreateBlogDialog } from '@/components/admin/blog/CreateBlogDialog';

export default function BlogPage() {
  const [posts, setPosts] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPosts, setSelectedPosts] = useState<number[]>([]);
  const [sortField, setSortField] = useState<keyof Blog | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

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

  // Sort posts
  const sortedPosts = [...posts].sort((a, b) => {
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

  const handleSort = (field: keyof Blog) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedPosts(sortedPosts.map((p) => p.id));
    } else {
      setSelectedPosts([]);
    }
  };

  const handleSelectPost = (postId: number, checked: boolean) => {
    if (checked) {
      setSelectedPosts([...selectedPosts, postId]);
    } else {
      setSelectedPosts(selectedPosts.filter((id) => id !== postId));
    }
  };

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

      {/* Blog Table */}
      <div className="bg-card rounded-xl border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted hover:bg-muted">
              <TableHead className="w-12">
                <Checkbox
                  checked={
                    selectedPosts.length === sortedPosts.length &&
                    sortedPosts.length > 0
                  }
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead className="w-20">Image</TableHead>
              <TableHead>
                <button
                  onClick={() => handleSort('title')}
                  className="flex items-center gap-1 hover:text-foreground"
                >
                  Title
                  <ArrowUpDown className="h-3.5 w-3.5" />
                </button>
              </TableHead>
              <TableHead>
                <button
                  onClick={() => handleSort('category')}
                  className="flex items-center gap-1 hover:text-foreground"
                >
                  Category
                  <ArrowUpDown className="h-3.5 w-3.5" />
                </button>
              </TableHead>
              <TableHead>Author</TableHead>
              <TableHead>
                <button
                  onClick={() => handleSort('createdAt')}
                  className="flex items-center gap-1 hover:text-foreground"
                >
                  Date
                  <ArrowUpDown className="h-3.5 w-3.5" />
                </button>
              </TableHead>
              <TableHead>
                <button
                  onClick={() => handleSort('readTime')}
                  className="flex items-center gap-1 hover:text-foreground"
                >
                  Read Time
                  <ArrowUpDown className="h-3.5 w-3.5" />
                </button>
              </TableHead>
              <TableHead className="text-center pr-4">Manage</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={8} className="h-32 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                    <span className="text-muted-foreground">Loading blog posts...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : sortedPosts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-32 text-center">
                  <p className="text-muted-foreground">No blog posts found</p>
                </TableCell>
              </TableRow>
            ) : (
              sortedPosts.map((post) => (
                <TableRow
                  key={post.id}
                  className={
                    selectedPosts.includes(post.id)
                      ? 'bg-muted'
                      : ''
                  }
                >
                  <TableCell>
                    <Checkbox
                      checked={selectedPosts.includes(post.id)}
                      onCheckedChange={(checked) =>
                        handleSelectPost(post.id, checked as boolean)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                      {post.image ? (
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      ) : null}
                      <ImageIcon className="w-5 h-5 text-muted-foreground absolute" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col max-w-xs">
                      <span className="font-medium text-foreground truncate">
                        {post.title}
                      </span>
                      <span className="text-xs text-muted-foreground truncate">
                        {post.excerpt ? `${post.excerpt.substring(0, 60)}...` : 'No excerpt'}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {post.category ? (
                      <Badge variant={getCategoryBadgeVariant(post.category)}>
                        {post.category}
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground text-sm">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground">
                        {post.author ? post.author.charAt(0).toUpperCase() : 'A'}
                      </div>
                      <span className="text-sm text-foreground">
                        {post.author || 'Unknown'}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">
                      {formatDate(post.createdAt)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="w-3.5 h-3.5" />
                      <span className="text-sm">{post.readTime} min</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center pr-1">
                    <div className="inline-flex items-center gap-3">
                      <ViewBlogDialog post={post}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 px-4 text-xs rounded-full shadow-none"
                        >
                          View
                        </Button>
                      </ViewBlogDialog>
                      <EditBlogDialog post={post} onPostUpdated={handlePostUpdated}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 px-4 text-xs rounded-full shadow-none"
                        >
                          Edit
                        </Button>
                      </EditBlogDialog>
                      <DeleteBlogDialog post={post} onPostDeleted={handlePostDeleted}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 px-4 text-xs rounded-full shadow-none text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/20"
                        >
                          Delete
                        </Button>
                      </DeleteBlogDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {/* Table Footer / Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t bg-muted">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-medium">{sortedPosts.length}</span> of{' '}
            <span className="font-medium">{posts.length}</span> posts
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
