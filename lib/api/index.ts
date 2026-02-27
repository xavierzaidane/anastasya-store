/**
 * API Utilities - Clean Architecture Exports
 * 
 * This module provides centralized utilities for building consistent APIs:
 * - Response formatting (success/error responses)
 * - Error handling (global error handler, custom errors)
 * - Validation (Zod schemas)
 * - Authentication middleware (JWT-based)
 * - Pagination helpers
 */

// Response utilities
export {
  successResponse,
  createdResponse,
  errorResponse,
  ApiErrors,
  type ApiResponse,
  type PaginatedData,
} from "./response";

// Error handling
export {
  ApiError,
  handleApiError,
  withErrorHandler,
  formatZodError,
} from "./errors";

// Validation schemas
export {
  // Auth
  loginSchema,
  registerSchema,
  type LoginInput,
  type RegisterInput,
  // Users
  createUserSchema,
  updateUserSchema,
  type CreateUserInput,
  type UpdateUserInput,
  // Products
  createProductSchema,
  updateProductSchema,
  type CreateProductInput,
  type UpdateProductInput,
  // Categories
  createCategorySchema,
  updateCategorySchema,
  type CreateCategoryInput,
  type UpdateCategoryInput,
  // Blogs
  createBlogSchema,
  updateBlogSchema,
  type CreateBlogInput,
  type UpdateBlogInput,
  // Common
  idParamSchema,
  slugParamSchema,
  // Helpers
  validateBody,
  validateParams,
} from "./validation";

// Authentication middleware
export {
  getAuthUser,
  requireAuth,
  requireRole,
  requireAdmin,
  isAuthenticated,
  withAuth,
  withAdmin,
  verifyToken,
  type AuthUser,
  type AuthResult,
  type UserRole,
} from "./middleware";

// Pagination utilities
export {
  parsePaginationParams,
  createPaginationMeta,
  createPaginatedResult,
  parseSearchParams,
  DEFAULT_PAGE,
  DEFAULT_LIMIT,
  MAX_LIMIT,
  type PaginationParams,
  type PaginationMeta,
  type PaginatedResult,
} from "./pagination";
