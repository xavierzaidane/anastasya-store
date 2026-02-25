'use client';

import { useState } from 'react';
import Image from 'next/image';
import { blogPosts, BlogPost } from '@/data/blog';
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
} from 'lucide-react';
import { ViewBlogDialog } from '@/components/admin/blog/ViewBlogDialog';
import { EditBlogDialog } from '@/components/admin/blog/EditBlogDialog';
import { DeleteBlogDialog } from '@/components/admin/blog/DeleteBlogDialog';
import { CreateBlogDialog } from '@/components/admin/blog/CreateBlogDialog';

export default function BlogPage() {
  const [selectedPosts, setSelectedPosts] = useState<number[]>([]);
  const [sortField, setSortField] = useState<keyof BlogPost | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Sort posts
  const sortedPosts = [...blogPosts].sort((a, b) => {
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

  const handleSort = (field: keyof BlogPost) => {
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

  const getCategoryBadgeVariant = (category: string) => {
    switch (category.toLowerCase()) {
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

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold font-mono text-neutral-900">Blog Posts</h1>
          <p className="text-sm text-neutral-500 mt-1">
            Manage your blog content and articles
          </p>
        </div>
        <CreateBlogDialog />
      </div>

      {/* Blog Table */}
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-neutral-50 hover:bg-neutral-50">
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
                  className="flex items-center gap-1 hover:text-neutral-900"
                >
                  Title
                  <ArrowUpDown className="h-3.5 w-3.5" />
                </button>
              </TableHead>
              <TableHead>
                <button
                  onClick={() => handleSort('category')}
                  className="flex items-center gap-1 hover:text-neutral-900"
                >
                  Category
                  <ArrowUpDown className="h-3.5 w-3.5" />
                </button>
              </TableHead>
              <TableHead>Author</TableHead>
              <TableHead>
                <button
                  onClick={() => handleSort('date')}
                  className="flex items-center gap-1 hover:text-neutral-900"
                >
                  Date
                  <ArrowUpDown className="h-3.5 w-3.5" />
                </button>
              </TableHead>
              <TableHead>
                <button
                  onClick={() => handleSort('readTime')}
                  className="flex items-center gap-1 hover:text-neutral-900"
                >
                  Read Time
                  <ArrowUpDown className="h-3.5 w-3.5" />
                </button>
              </TableHead>
              <TableHead className="text-center pr-4">Manage</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedPosts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-32 text-center">
                  <p className="text-neutral-500">No blog posts found</p>
                </TableCell>
              </TableRow>
            ) : (
              sortedPosts.map((post) => (
                <TableRow
                  key={post.id}
                  className={
                    selectedPosts.includes(post.id)
                      ? 'bg-neutral-50'
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
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-neutral-100 flex items-center justify-center">
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
                      <ImageIcon className="w-5 h-5 text-neutral-400 absolute" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col max-w-xs">
                      <span className="font-medium text-neutral-900 truncate">
                        {post.title}
                      </span>
                      <span className="text-xs text-neutral-500 truncate">
                        {post.excerpt.substring(0, 60)}...
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getCategoryBadgeVariant(post.category)}>
                      {post.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-neutral-200 flex items-center justify-center text-xs font-medium text-neutral-600">
                        {post.author.initial}
                      </div>
                      <span className="text-sm text-neutral-700">
                        {post.author.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-neutral-600">
                      {post.date}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-neutral-500">
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
                      <EditBlogDialog post={post}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 px-4 text-xs rounded-full shadow-none"
                        >
                          Edit
                        </Button>
                      </EditBlogDialog>
                      <DeleteBlogDialog post={post}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 px-4 text-xs rounded-full shadow-none text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
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
        <div className="flex items-center justify-between px-4 py-3 border-t border-neutral-200 bg-neutral-50">
          <p className="text-sm text-neutral-500">
            Showing <span className="font-medium">{sortedPosts.length}</span> of{' '}
            <span className="font-medium">{blogPosts.length}</span> posts
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
