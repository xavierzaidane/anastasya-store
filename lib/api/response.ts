import { NextResponse } from "next/server";

/**
 * Standard API Response Format
 * {
 *   success: boolean,
 *   message: string,
 *   data: T | null
 * }
 */

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T | null;
}

export interface PaginatedData<T> {
  items: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

/**
 * Success response helper
 */
export function successResponse<T>(
  data: T,
  message = "Success",
  status = 200
): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      message,
      data,
    },
    { status }
  );
}

/**
 * Created response helper (201)
 */
export function createdResponse<T>(
  data: T,
  message = "Created successfully"
): NextResponse<ApiResponse<T>> {
  return successResponse(data, message, 201);
}

/**
 * Error response helper
 */
export function errorResponse(
  message: string,
  status = 500
): NextResponse<ApiResponse<null>> {
  return NextResponse.json(
    {
      success: false,
      message,
      data: null,
    },
    { status }
  );
}

/**
 * Common error responses
 */
export const ApiErrors = {
  badRequest: (message = "Bad request") => errorResponse(message, 400),
  unauthorized: (message = "Unauthorized") => errorResponse(message, 401),
  forbidden: (message = "Forbidden") => errorResponse(message, 403),
  notFound: (message = "Resource not found") => errorResponse(message, 404),
  conflict: (message = "Resource already exists") => errorResponse(message, 409),
  validationError: (message = "Validation failed") => errorResponse(message, 422),
  internalError: (message = "Internal server error") => errorResponse(message, 500),
};
