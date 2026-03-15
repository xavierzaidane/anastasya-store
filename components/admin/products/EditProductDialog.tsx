/* eslint-disable react/no-children-prop */
'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useForm } from '@tanstack/react-form';
import { z } from 'zod';
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
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field';
import { Product, Category, ApiResponse } from '@/types/api';
import { Pencil, Plus, X, ImageIcon } from 'lucide-react';

// Zod validation schema
const productFormSchema = z.object({
  name: z
    .string()
    .min(1, 'Product name is required')
    .min(2, 'Product name must be at least 2 characters'),
  categoryId: z
    .string()
    .min(1, 'Please select a category'),
  price: z
    .string()
    .min(1, 'Price is required')
    .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
      message: 'Price must be a positive number',
    }),
  description: z
    .string()
    .min(1, 'Description is required')
    .min(10, 'Description must be at least 10 characters'),
  items: z
    .array(z.object({ value: z.string() }))
    .refine((items) => items.some((item) => item.value.trim() !== ''), {
      message: 'At least one item is required',
    }),
});

interface EditProductDialogProps {
  product: Product;
  children?: React.ReactNode;
  onProductUpdated?: () => void;
}

export function EditProductDialog({ product, children, onProductUpdated }: EditProductDialogProps) {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(product.image || null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>(product.gallery || []);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const form = useForm({
    defaultValues: {
      name: product.name,
      categoryId: product.categoryId?.toString() || '',
      price: product.price?.toString() || '',
      description: product.description || '',
      items: product.items?.length > 0
        ? product.items.map((item) => ({ value: item }))
        : [{ value: '' }] as { value: string }[],
    },
    validators: {
      onSubmit: productFormSchema,
    },
    onSubmit: async ({ value }) => {
      setIsSubmitting(true);
      setSubmitError(null);

      try {
        // Filter out empty items
        const cleanedItems = value.items
          .map((item) => item.value)
          .filter((item) => item.trim() !== '');

        // Upload image first if exists
        let imageUrl: string | null = imagePreview;
        if (imageFile) {
          const uploadFormData = new FormData();
          uploadFormData.append('file', imageFile);
          uploadFormData.append('folder', 'products');

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

        // Upload gallery images
        const galleryUrls: string[] = [...galleryPreviews.slice(0, product.gallery?.length || 0)];
        for (const galleryFile of galleryFiles) {
          const uploadFormData = new FormData();
          uploadFormData.append('file', galleryFile);
          uploadFormData.append('folder', 'gallery');

          const uploadResponse = await fetch('/api/upload', {
            method: 'POST',
            body: uploadFormData,
          });

          if (!uploadResponse.ok) {
            throw new Error('Failed to upload gallery image');
          }

          const uploadResult = await uploadResponse.json();
          galleryUrls.push(uploadResult.data?.url);
        }

        // Update product with JSON data
        const productData = {
          name: value.name,
          price: parseFloat(value.price),
          categoryId: parseInt(value.categoryId),
          description: value.description || undefined,
          image: imageUrl,
          gallery: galleryUrls,
          items: cleanedItems,
        };

        const response = await fetch(`/api/products/${product.slug}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(productData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to update product');
        }

        toast.info('Product updated successfully');
        onProductUpdated?.();
        setOpen(false);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred';
        setSubmitError(errorMessage);
        toast.error('Failed to update product', { description: errorMessage });
        console.error('Error updating product:', err);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  // Fetch categories when dialog opens
  useEffect(() => {
    if (open) {
      fetchCategories();
    }
  }, [open]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      if (response.ok) {
        const result: ApiResponse<Category[]> = await response.json();
        setCategories(result.data);
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  // Reset form when product changes or dialog opens
  useEffect(() => {
    if (open) {
      form.reset();
      form.setFieldValue('name', product.name);
      form.setFieldValue('categoryId', product.categoryId?.toString() || '');
      form.setFieldValue('price', product.price?.toString() || '');
      form.setFieldValue('description', product.description || '');
      form.setFieldValue(
        'items',
        product.items?.length > 0
          ? product.items.map((item) => ({ value: item }))
          : [{ value: '' }]
      );
      setImageFile(null);
      setImagePreview(product.image || null);
      setGalleryFiles([]);
      setGalleryPreviews(product.gallery || []);
      setSubmitError(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      if (galleryInputRef.current) {
        galleryInputRef.current.value = '';
      }
    }
  }, [open, product, form]);

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

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newGalleryFiles = Array.from(files);
      setGalleryFiles([...galleryFiles, ...newGalleryFiles]);

      // Create previews
      newGalleryFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setGalleryPreviews((prev) => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeGalleryImage = (index: number, isExisting: boolean) => {
    if (isExisting) {
      // Remove from existing gallery
      const updatedGallery = galleryPreviews.filter((_, i) => i !== index);
      setGalleryPreviews(updatedGallery);
    } else {
      // Remove from new gallery files
      const newIndex = index - (product.gallery?.length || 0);
      setGalleryFiles((prev) => prev.filter((_, i) => i !== newIndex));
      setGalleryPreviews((prev) => prev.filter((_, i) => i !== index));
    }
    if (galleryInputRef.current) {
      galleryInputRef.current.value = '';
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
      <DialogContent className="sm:max-w-6xl">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>
            Update the details for &quot;{product.name}&quot;
          </DialogDescription>
        </DialogHeader>
        <form
          id="edit-product-form"
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-2">
            {/* Left Column */}
            <FieldGroup>
              {/* Product Name */}
              <form.Field
                name="name"
                children={(field) => {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={`edit-${field.name}`}>Product Name</FieldLabel>
                      <Input
                        id={`edit-${field.name}`}
                        name={field.name}
                        placeholder="e.g., Rose Whisper"
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

              <div className="grid grid-cols-2 gap-3">
                {/* Category */}
                <form.Field
                  name="categoryId"
                  children={(field) => {
                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={`edit-${field.name}`}>Category</FieldLabel>
                        <Select
                          name={field.name}
                          value={field.state.value}
                          onValueChange={(value) => {
                            field.handleChange(value);
                          }}
                        >
                          <SelectTrigger id={`edit-${field.name}`} aria-invalid={isInvalid}>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category.id} value={category.id.toString()}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {isInvalid && <FieldError errors={field.state.meta.errors} />}
                      </Field>
                    );
                  }}
                />

                {/* Price */}
                <form.Field
                  name="price"
                  children={(field) => {
                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={`edit-${field.name}`}>Price (IDR)</FieldLabel>
                        <Input
                          id={`edit-${field.name}`}
                          name={field.name}
                          type="number"
                          placeholder="e.g., 85000"
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
              </div>

              {/* Product Image */}
              <Field>
                <FieldLabel>Product Image</FieldLabel>
                <FieldDescription>Upload an image for your product (PNG, JPG up to 5MB)</FieldDescription>
                <FieldContent>
                  {imagePreview ? (
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-muted">
                      <Image
                        src={imagePreview}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 p-1.5 bg-background/90 rounded-full hover:bg-background text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <label
                      htmlFor="edit-image-upload"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-xl cursor-pointer bg-muted hover:bg-muted/80 transition-colors"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <ImageIcon className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">
                          <span className="font-medium text-foreground">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 5MB</p>
                      </div>
                    </label>
                  )}
                  <input
                    ref={fileInputRef}
                    id="edit-image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </FieldContent>
              </Field>

              {/* Description */}
              <form.Field
                name="description"
                children={(field) => {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={`edit-${field.name}`}>Description</FieldLabel>
                      <Textarea
                        id={`edit-${field.name}`}
                        name={field.name}
                        placeholder="Describe your flower bouquet..."
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        rows={3}
                        aria-invalid={isInvalid}
                      />
                      {isInvalid && <FieldError errors={field.state.meta.errors} />}
                    </Field>
                  );
                }}
              />
            </FieldGroup>

            {/* Right Column - Included Items */}
            <form.Field
              name="items"
              mode="array"
              children={(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <FieldSet>
                    <FieldLegend variant="label">Included Items</FieldLegend>
                    <FieldDescription>
                      Add the items included in this product bundle.
                    </FieldDescription>
                    <FieldGroup className="gap-2">
                      {field.state.value.map((_, index) => (
                        <form.Field
                          key={index}
                          name={`items[${index}].value`}
                          children={(subField) => {
                            const isSubFieldInvalid =
                              subField.state.meta.isTouched && !subField.state.meta.isValid;
                            return (
                              <Field orientation="horizontal" data-invalid={isSubFieldInvalid}>
                                <FieldContent>
                                  <div className="flex gap-2">
                                    <Input
                                      id={`edit-item-${index}`}
                                      name={subField.name}
                                      placeholder={`Item ${index + 1}`}
                                      value={subField.state.value}
                                      onBlur={subField.handleBlur}
                                      onChange={(e) => subField.handleChange(e.target.value)}
                                      aria-invalid={isSubFieldInvalid}
                                    />
                                    {field.state.value.length > 1 && (
                                      <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => field.removeValue(index)}
                                      >
                                        <X className="h-4 w-4" />
                                      </Button>
                                    )}
                                  </div>
                                </FieldContent>
                              </Field>
                            );
                          }}
                        />
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => field.pushValue({ value: '' })}
                        className="mt-2 w-fit"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Item
                      </Button>
                    </FieldGroup>
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </FieldSet>
                );
              }}
            />

            {/* Gallery */}
            <Field>
              <FieldLabel>Product Gallery</FieldLabel>
              <FieldDescription>Upload additional product images (PNG, JPG up to 5MB each)</FieldDescription>
              <FieldContent>
                <div className="grid grid-cols-3 gap-2 mb-2">
                  {galleryPreviews.map((preview, index) => (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                      <Image
                        src={preview}
                        alt={`Gallery ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeGalleryImage(index, index < (product.gallery?.length || 0))}
                        className="absolute top-1 right-1 p-1 bg-background/90 rounded-full hover:bg-background text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
                <label
                  htmlFor="edit-gallery-upload"
                  className="flex flex-col items-center justify-center w-full h-20 border-2 border-dashed border-border rounded-lg cursor-pointer bg-muted hover:bg-muted/80 transition-colors"
                >
                  <div className="flex flex-col items-center justify-center py-3">
                    <Plus className="h-5 w-5 text-muted-foreground mb-1" />
                    <p className="text-xs text-muted-foreground text-center">
                      Click to add gallery images
                    </p>
                  </div>
                </label>
                <input
                  ref={galleryInputRef}
                  id="edit-gallery-upload"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleGalleryChange}
                  className="hidden"
                />
              </FieldContent>
            </Field>
          </div>
        </form>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button type="submit" form="edit-product-form" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditProductDialog;
