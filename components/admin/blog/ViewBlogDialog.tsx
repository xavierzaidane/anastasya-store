'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BlogPost } from '@/data/blog';
import { Eye, ExternalLink, Clock, User } from 'lucide-react';
import Link from 'next/link';

interface ViewBlogDialogProps {
  post: BlogPost;
  children?: React.ReactNode;
}

export function ViewBlogDialog({ post, children }: ViewBlogDialogProps) {
  const [open, setOpen] = useState(false);

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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline" size="sm" className="h-8 px-4 text-xs rounded-full shadow-none">
            <Eye className="h-3.5 w-3.5 mr-1.5" />
            View
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            {post.title}
          </DialogTitle>
          <DialogDescription>
            Blog Post Details
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
          {/* Left Column */}
          <div className="space-y-4">
            {/* Basic Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="border rounded-lg p-3">
                <p className="text-sm text-neutral-500">Slug</p>
                <p className="font-medium font-mono text-neutral-900 text-sm truncate">{post.slug}</p>
              </div>
              <div className="border rounded-lg p-3">
                <p className="text-sm text-neutral-500">Category</p>
                <Badge variant={getCategoryBadgeVariant(post.category)} className="mt-1">
                  {post.category}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="border rounded-lg p-3">
                <div className="flex items-center gap-1.5 text-sm text-neutral-500 mb-1">
                  <Clock className="h-3.5 w-3.5" />
                  Read Time
                </div>
                <p className="font-medium text-neutral-900">{post.readTime} min</p>
              </div>
              <div className="border rounded-lg p-3">
                <p className="text-sm text-neutral-500">Date</p>
                <p className="font-medium text-neutral-900">{post.date}</p>
              </div>
            </div>

            {/* Author */}
            <div className="border rounded-lg p-3">
              <div className="flex items-center gap-1.5 text-sm text-neutral-500 mb-2">
                <User className="h-3.5 w-3.5" />
                Author
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center">
                  <span className="text-xs font-medium text-pink-700">
                    {post.author.initial}
                  </span>
                </div>
                <span className="font-medium text-neutral-900">{post.author.name}</span>
              </div>
            </div>

            {/* Excerpt */}
            <div className="border rounded-lg p-3">
              <p className="text-sm text-neutral-500 mb-2">Excerpt</p>
              <p className="text-neutral-700 text-sm">{post.excerpt}</p>
            </div>
          </div>

          {/* Right Column - Content Preview */}
          <div className="space-y-4">
            <div className="border rounded-lg p-4 h-full">
              <p className="text-sm text-neutral-500 mb-2">Content Preview</p>
              <div className="prose prose-sm max-w-none text-neutral-700 max-h-80 overflow-y-auto">
                <p className="whitespace-pre-wrap text-sm leading-relaxed">
                  {post.content.substring(0, 1500)}
                  {post.content.length > 1500 && '...'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
          >
            Close
          </Button>
          <Button asChild>
            <Link href={`/blog/${post.slug}`} target="_blank">
              <ExternalLink className="h-4 w-4 mr-2" />
              View in Blog
            </Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ViewBlogDialog;
