'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Blog } from '@/types/api';
import { Trash2 } from 'lucide-react';

interface DeleteBlogDialogProps {
  post: Blog;
  children?: React.ReactNode;
  onPostDeleted?: () => void;
}

export function DeleteBlogDialog({ post, children, onPostDeleted }: DeleteBlogDialogProps) {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    setIsDeleting(true);
    setError(null);

    try {
      const response = await fetch(`/api/blogs/${post.slug}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to delete blog post');
      }

      toast.success('Blog post deleted successfully');
      onPostDeleted?.();
      setOpen(false);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      toast.error('Failed to delete blog post', { description: errorMessage });
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
      <DialogContent className="sm:max-w-lg p-6 gap-0 border-border">
        <DialogHeader className="space-y-4 pb-4">
          <div className="mx-auto h-12 w-12 flex items-center justify-center ">
            <Trash2 className="h-6 w-6 text-destructive" />
          </div>
          <DialogTitle className="text-center text-lg font-semibold text-neutral-900 dark:text-white -mt-5">
            Delete Blog Post ?
          </DialogTitle>
        </DialogHeader>

        {/* Post Preview */}
        <div className="flex items-center gap-3 p-3 bg-neutral-50 dark:bg-background rounded-lg border mb-4">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-neutral-900 dark:text-white truncate">{post.title}</p>
            <p className="text-xs text-neutral-500">{post.category || 'Uncategorized'} . {post.author || 'Unknown'}</p>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-4">
            {error}
          </div>
        )}

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
