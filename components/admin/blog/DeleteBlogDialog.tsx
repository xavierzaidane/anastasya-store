'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { BlogPost } from '@/data/blog';
import { Trash2 } from 'lucide-react';

interface DeleteBlogDialogProps {
  post: BlogPost;
  children?: React.ReactNode;
  onPostDeleted?: (postId: number) => void;
}

export function DeleteBlogDialog({ post, children, onPostDeleted }: DeleteBlogDialogProps) {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      const response = await fetch(`/api/blogs/${post.slug}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete blog post');
      }

      onPostDeleted?.(post.id);
      setOpen(false);
    } catch (error) {
      console.error('Error deleting blog post:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-3 text-xs text-destructive hover:text-red-700 hover:bg-red-50 transition-all duration-200"
          >
            <Trash2 className="h-3.5 w-3.5 mr-1.5" />
            Delete
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl p-6 gap-0 border-neutral-200/80">
        <DialogHeader className="space-y-4 pb-4">
          <div className="mx-auto h-12 w-12 rounded-full bg-red-50 flex items-center justify-center">
            <Trash2 className="h-5 w-5 text-destructive" />
          </div>
          <DialogTitle className="text-center text-lg font-semibold text-neutral-900">
            Delete Blog Post
          </DialogTitle>
        </DialogHeader>

        {/* Post Preview */}
        <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg border mb-4">
          <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center shrink-0">
            <span className="text-xs font-medium text-pink-700">
              {post.author.initial}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-neutral-900 truncate">{post.title}</p>
            <p className="text-xs text-neutral-500">{post.category}</p>
          </div>
        </div>

        <p className="text-sm text-neutral-500 text-center mb-6">
          This action cannot be undone.
        </p>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isDeleting}
            className="flex-1 h-10 border-neutral-200 hover:bg-neutral-50"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex-1 h-10 bg-destructive hover:bg-red-700"
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteBlogDialog;
