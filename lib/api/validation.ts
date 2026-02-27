import { z } from "zod";

/**
 * Auth Schemas
 */
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
  adminSecret: z.string().optional(),
});

export const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;

/**
 * User Schemas
 */
export const createUserSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  role: z.enum(["ADMIN", "CUSTOMER"]).optional().default("CUSTOMER"),
});

export const updateUserSchema = z.object({
  email: z.string().email("Invalid email address").optional(),
  password: z.string().min(8, "Password must be at least 8 characters").optional(),
  name: z.string().min(1, "Name is required").max(100, "Name is too long").optional(),
  role: z.enum(["ADMIN", "CUSTOMER"]).optional(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;

/**
 * Product Schemas
 */
export const createProductSchema = z.object({
  name: z.string().min(1, "Product name is required").max(200, "Name is too long"),
  price: z.number().positive("Price must be positive"),
  categoryId: z.number().int().positive("Category ID is required"),
  description: z.string().optional(),
  img: z.string().optional().nullable(),
  items: z.array(z.string()).optional().default([]),
});

export const updateProductSchema = z.object({
  name: z.string().min(1, "Product name is required").max(200, "Name is too long").optional(),
  price: z.number().positive("Price must be positive").optional(),
  categoryId: z.number().int().positive("Category ID is required").optional(),
  description: z.string().optional(),
  image: z.string().optional().nullable(),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;

/**
 * Category Schemas
 */
export const createCategorySchema = z.object({
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(100, "Slug is too long")
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with hyphens"),
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  image: z.string().min(1, "Image path is required").optional().nullable(),
});

export const updateCategorySchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long").optional(),
  image: z.string().optional().nullable(),
});

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;

/**
 * Blog Schemas
 */
export const createBlogSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title is too long"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(200, "Slug is too long")
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with hyphens")
    .optional(),
  excerpt: z.string().max(500, "Excerpt is too long").optional().nullable(),
  content: z.string().min(1, "Content is required"),
  category: z.string().max(100, "Category is too long").optional().nullable(),
  readTime: z.number().int().positive("Read time must be positive").optional().default(5),
  author: z.string().max(100, "Author name is too long").optional().nullable(),
  image: z.string().optional().nullable(),
  published: z.boolean().optional().default(false),
});

export const updateBlogSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title is too long").optional(),
  excerpt: z.string().max(500, "Excerpt is too long").optional().nullable(),
  content: z.string().min(1, "Content is required").optional(),
  category: z.string().max(100, "Category is too long").optional().nullable(),
  readTime: z.number().int().positive("Read time must be positive").optional(),
  author: z.string().max(100, "Author name is too long").optional().nullable(),
  image: z.string().optional().nullable(),
  published: z.boolean().optional(),
});

export type CreateBlogInput = z.infer<typeof createBlogSchema>;
export type UpdateBlogInput = z.infer<typeof updateBlogSchema>;

/**
 * Common Schemas
 */
export const idParamSchema = z.object({
  id: z.string().regex(/^\d+$/, "Invalid ID format").transform(Number),
});

export const slugParamSchema = z.object({
  slug: z.string().min(1, "Slug is required"),
});

/**
 * Helper to validate request body
 */
export async function validateBody<T>(
  request: Request,
  schema: z.ZodSchema<T>
): Promise<T> {
  const body = await request.json();
  return schema.parse(body);
}

/**
 * Helper to validate params
 */
export function validateParams<T>(
  params: unknown,
  schema: z.ZodSchema<T>
): T {
  return schema.parse(params);
}
