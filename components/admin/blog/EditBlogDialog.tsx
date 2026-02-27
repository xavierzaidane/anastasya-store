'use client';

import { useState, useEffect } from 'react';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { BlogPost } from '@/data/blog';
import { Pencil } from 'lucide-react';

interface EditBlogDialogProps {
  post: BlogPost;
  children?: React.ReactNode;
  onPostUpdated?: (post: BlogFormData) => void;
}

interface BlogFormData {
  id: number;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  readTime: number;
  author: {
    name: string;
    initial: string;
  };
  date: string;
  image: string;
}

const categories = [
  'Tips & Tricks',
  'Guides',
  'Care Tips',
  'Trends',
  'Sustainability',
  'Inspiration',
];

export function EditBlogDialog({ post, children, onPostUpdated }: EditBlogDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<BlogFormData>({
    id: post.id,
    title: post.title,
    slug: post.slug,
    category: post.category,
    excerpt: post.excerpt,
    content: post.content,
    readTime: post.readTime,
    author: { ...post.author },
    date: post.date,
    image: post.image,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form when post changes or dialog opens
  useEffect(() => {
    if (open) {
      setFormData({
        id: post.id,
        title: post.title,
        slug: post.slug,
        category: post.category,
        excerpt: post.excerpt,
        content: post.content,
        readTime: post.readTime,
        author: { ...post.author },
        date: post.date,
        image: post.image,
      });
    }
  }, [open, post]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };

  const handleAuthorChange = (field: 'name' | 'initial', value: string) => {
    setFormData((prev) => ({
      ...prev,
      author: { ...prev.author, [field]: value },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/blogs/${post.slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update blog post');
      }

      onPostUpdated?.(formData);
      setOpen(false);
    } catch (error) {
      console.error('Error updating blog post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline" size="sm" className="h-8 px-4 text-xs rounded-full shadow-none">
            <Pencil className="h-3.5 w-3.5 mr-1.5" />
            Edit
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Blog Post</DialogTitle>
          <DialogDescription>
            Update the details for &quot;{post.title}&quot;
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            {/* Left Column */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-title">Title</Label>
                <Input
                  id="edit-title"
                  name="title"
                  placeholder="Post title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-slug">Slug</Label>
                  <Input
                    id="edit-slug"
                    name="slug"
                    placeholder="post-slug"
                    value={formData.slug}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-category">Category</Label>
                  <Select value={formData.category} onValueChange={handleCategoryChange}>
                    <SelectTrigger id="edit-category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-readTime">Read Time (min)</Label>
                  <Input
                    id="edit-readTime"
                    name="readTime"
                    type="number"
                    min={1}
                    placeholder="5"
                    value={formData.readTime}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, readTime: parseInt(e.target.value) || 1 }))
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-date">Date</Label>
                  <Input
                    id="edit-date"
                    name="date"
                    placeholder="February 20, 2026"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-authorName">Author Name</Label>
                  <Input
                    id="edit-authorName"
                    placeholder="Author name"
                    value={formData.author.name}
                    onChange={(e) => handleAuthorChange('name', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-excerpt">Excerpt</Label>
                <Textarea
                  id="edit-excerpt"
                  name="excerpt"
                  placeholder="Brief description of the post..."
                  rows={3}
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-content">Content</Label>
                <Textarea
                  id="edit-content"
                  name="content"
                  placeholder="Write your blog post content here..."
                  rows={18}
                  value={formData.content}
                  onChange={handleInputChange}
                  className="font-mono text-sm"
                  required
                />
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditBlogDialog;
