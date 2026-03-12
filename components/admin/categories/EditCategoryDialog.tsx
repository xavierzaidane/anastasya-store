/* eslint-disable react/no-children-prop */
'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useForm } from '@tanstack/react-form';
import { z } from 'zod';
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
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Pencil, X, Upload } from 'lucide-react';
import { toast } from 'sonner';

// Zod validation schema
const categoryFormSchema = z.object({
  name: z
    .string()
    .min(1, 'Category name is required')
    .min(2, 'Category name must be at least 2 characters'),
});

interface Category {
  id: number;
  slug: string;
  name: string;
  image: string | null;
  productCount: number;
}

interface EditCategoryDialogProps {
  category: Category;
  children?: React.ReactNode;
  onCategoryUpdated?: () => void;
}

export function EditCategoryDialog({ category, children, onCategoryUpdated }: EditCategoryDialogProps) {
  const [open, setOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(category.image || null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm({
    defaultValues: {
      name: category.name,
    },
    validators: {
      onSubmit: categoryFormSchema,
    },
    onSubmit: async ({ value }) => {
      setIsSubmitting(true);
      setSubmitError(null);

      try {
        // Upload image first if exists
        let imageUrl: string | null = imagePreview;
        if (imageFile) {
          const uploadFormData = new FormData();
          uploadFormData.append('file', imageFile);
          uploadFormData.append('folder', 'categories');

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

        // Update category with JSON data
        const categoryData = {
          name: value.name,
          image: imageUrl,
        };

        const response = await fetch(`/api/categories/${category.slug}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(categoryData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to update category');
        }

        toast.info('Category updated', {
          description: `"${value.name}" has been updated successfully.`,
        });
        onCategoryUpdated?.();
        setOpen(false);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred';
        setSubmitError(errorMessage);
        toast.error('Failed to update category', {
          description: errorMessage,
        });
        console.error('Error updating category:', err);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  // Reset form when category changes or dialog opens
  useEffect(() => {
    if (open) {
      form.reset();
      form.setFieldValue('name', category.name);
      setImageFile(null);
      setImagePreview(category.image || null);
      setSubmitError(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  }, [open, category, form]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        setSubmitError('Invalid file type. Allowed: JPEG, PNG, WebP, GIF');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setSubmitError('File too large. Max size: 5MB');
        return;
      }

      setImageFile(file);
      setSubmitError(null);
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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
          <DialogDescription>
            Update category details for &quot;{category.name}&quot;
          </DialogDescription>
        </DialogHeader>

        <form
          id="edit-category-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          {submitError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {submitError}
            </div>
          )}

          <FieldGroup className="py-4">
            {/* Current Slug (Read-only) */}
            <Field>
              <FieldLabel>Slug</FieldLabel>
              <Input
                value={category.slug}
                disabled
                className="bg-neutral-50"
              />
              <FieldDescription>
                Slug cannot be changed after creation
              </FieldDescription>
            </Field>

            {/* Category Name */}
            <form.Field
              name="name"
              children={(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={`edit-${field.name}`}>Category Name</FieldLabel>
                    <Input
                      id={`edit-${field.name}`}
                      name={field.name}
                      placeholder="e.g. Small Bouquet"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                    />
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            />

            {/* Image Upload */}
            <Field>
              <FieldLabel>Category Image</FieldLabel>
              <FieldDescription>Upload an image for your category (PNG, JPG up to 5MB)</FieldDescription>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={handleImageChange}
                className="hidden"
                id="edit-category-image-upload"
              />
              
              {imagePreview ? (
                <div className="relative">
                  <div className="relative w-full h-40 rounded-lg overflow-hidden bg-neutral-100">
                    <Image
                      src={imagePreview}
                      alt="Category preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute top-2 right-2 flex gap-2">
                    <label
                      htmlFor="edit-category-image-upload"
                      className="h-8 w-8 flex items-center justify-center bg-white rounded-full shadow-md cursor-pointer hover:bg-neutral-50"
                    >
                      <Upload className="h-4 w-4 text-neutral-600" />
                    </label>
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="h-8 w-8"
                      onClick={removeImage}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <label
                  htmlFor="edit-category-image-upload"
                  className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-neutral-300 rounded-lg cursor-pointer hover:border-neutral-400 hover:bg-neutral-50 transition-colors"
                >
                  <Upload className="h-8 w-8 text-neutral-400 mb-2" />
                  <span className="text-sm text-neutral-600">Click to upload image</span>
                  <span className="text-xs text-neutral-400 mt-1">JPEG, PNG, WebP, GIF (max 5MB)</span>
                </label>
              )}
            </Field>
          </FieldGroup>
        </form>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" form="edit-category-form" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditCategoryDialog;
