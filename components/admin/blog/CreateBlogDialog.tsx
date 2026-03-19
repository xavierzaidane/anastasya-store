'use client';

import { useState, useRef } from 'react';
import { toast } from 'sonner';
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
import { Plus, X, ImageIcon } from 'lucide-react';
import type { CreateBlogInput } from '@/types/api';

interface CreateBlogDialogProps {
  children?: React.ReactNode;
  onPostCreated?: () => void;
}

const categories = [
  'Tips & Tricks',
  'Guides',
  'Care Tips',
  'Trends',
  'Sustainability',
  'Inspiration',
];

export function CreateBlogDialog({ children, onPostCreated }: CreateBlogDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<CreateBlogInput>({
    title: '',
    slug: '',
    category: '',
    excerpt: '',
    content: '',
    readTime: 5,
    author: 'Anastasya',
    image: '',
    published: false,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'title' && {
        slug: value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      }),
    }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };

  const handleAuthorChange = (value: string) => {
    setFormData((prev) => ({ ...prev, author: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Upload image first if exists
      let imageUrl: string | null = null;
      if (imageFile) {
        const uploadFormData = new FormData();
        uploadFormData.append('file', imageFile);
        uploadFormData.append('folder', 'blogs');

        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: uploadFormData,
        });

        if (!uploadResponse.ok) {
          throw new Error('Failed to upload image');
        }

        const uploadResult = await uploadResponse.json();
        imageUrl = uploadResult.data?.url || null;
      }

      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          image: imageUrl || formData.image || null,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to create blog post');
      }

      toast.success('Blog post created successfully');
      onPostCreated?.();
      setOpen(false);
      resetForm();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      toast.error('Failed to create blog post', { description: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      category: '',
      excerpt: '',
      content: '',
      readTime: 5,
      author: 'Anastasya',
      image: '',
      published: false,
    });
    setImageFile(null);
    setImagePreview(null);
    setError(null);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button className="gap-2 rounded-lg">
            <Plus className="h-4 w-4" />
            Add Post
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Blog Post</DialogTitle>
          <DialogDescription>
            Add a new article to your blog. Fill in the details below.
          </DialogDescription>
        </DialogHeader>
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            {/* Left Column */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Post title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    name="slug"
                    placeholder="post-slug"
                    value={formData.slug}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={handleCategoryChange}>
                    <SelectTrigger id="category">
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

              <div className="space-y-2">
                  <Label htmlFor="readTime">Read Time (min)</Label>
                  <Input
                    id="readTime"
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
                <Label htmlFor="authorName">Author Name</Label>
                <Input
                  id="authorName"
                  name="author"
                  placeholder="Author name"
                  value={formData.author || ''}
                  onChange={(e) => handleAuthorChange(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  name="excerpt"
                  placeholder="Brief description of the post..."
                  rows={3}
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <Label>Featured Image</Label>
                <div className="border-2 border-dashed border-neutral-200 rounded-lg p-4 text-center hover:border-neutral-300 transition-colors">
                  {imagePreview ? (
                    <div className="relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="mx-auto rounded-lg object-cover max-h-40 cursor-pointer"
                        onClick={() => fileInputRef.current?.click()}
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 h-6 w-6"
                        onClick={removeImage}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      <p className="text-xs text-neutral-400 mt-2">Click image to change</p>
                    </div>
                  ) : (
                    <div
                      className="cursor-pointer py-4"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <ImageIcon className="h-10 w-10 mx-auto text-neutral-400 mb-2" />
                      <p className="text-sm text-neutral-500">Click to upload image</p>
                      <p className="text-xs text-neutral-400 mt-1">PNG, JPG up to 5MB</p>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
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
              {isSubmitting ? 'Creating...' : 'Create Post'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateBlogDialog;
