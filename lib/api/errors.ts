import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";
import { ApiErrors, errorResponse } from "./response";

export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Object.setPrototypeOf(this, ApiError.prototype);
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message = "Bad request"): ApiError {
    return new ApiError(message, 400);
  }

  static unauthorized(message = "Unauthorized"): ApiError {
    return new ApiError(message, 401);
  }

  static forbidden(message = "Forbidden"): ApiError {
    return new ApiError(message, 403);
  }

  static notFound(message = "Resource not found"): ApiError {
    return new ApiError(message, 404);
  }

  static conflict(message = "Resource already exists"): ApiError {
    return new ApiError(message, 409);
  }

  static validationError(message = "Validation failed"): ApiError {
    return new ApiError(message, 422);
  }

  static internal(message = "Internal server error"): ApiError {
    return new ApiError(message, 500, false);
  }
}

export function formatZodError(error: ZodError): string {
  const messages = error.issues.map((issue) => {
    const path = issue.path.join(".");
    return path ? `${path}: ${issue.message}` : issue.message;
  });
  return messages.join(", ");
}

export function handleApiError(error: unknown): NextResponse {
  // Log error for debugging (in production, use a proper logging service)
  console.error("[API Error]:", error);

  // Handle Zod validation errors
  if (error instanceof ZodError) {
    const message = formatZodError(error);
    return ApiErrors.validationError(message);
  }

  if (error instanceof ApiError) {
    return errorResponse(error.message, error.statusCode);
  }

  // Handle Prisma errors
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002": // Unique constraint violation
        const target = (error.meta?.target as string[])?.join(", ") || "field";
        return ApiErrors.conflict(`A record with this ${target} already exists`);
      case "P2025": // Record not found
        return ApiErrors.notFound("Record not found");
      case "P2003": // Foreign key constraint violation
        return ApiErrors.badRequest("Invalid reference: related record not found");
      case "P2014": // Required relation violation
        return ApiErrors.badRequest("Cannot delete: record has related data");
      default:
        return ApiErrors.internalError("Database error occurred");
    }
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    return ApiErrors.badRequest("Invalid data provided");
  }


  if (error instanceof SyntaxError && error.message.includes("JSON")) {
    return ApiErrors.badRequest("Invalid JSON in request body");
  }

  return ApiErrors.internalError("An unexpected error occurred");
}

export function withErrorHandler<T extends unknown[]>(
  handler: (...args: T) => Promise<NextResponse>
): (...args: T) => Promise<NextResponse> {
  return async (...args: T): Promise<NextResponse> => {
    try {
      return await handler(...args);
    } catch (error) {
      return handleApiError(error);
    }
  };
}
