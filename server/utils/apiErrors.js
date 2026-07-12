/**
 * apiErrors.js
 *
 * Custom error classes for the TransitOps API.
 * All classes extend the native Error and add a `statusCode`
 * so the global errorHandler can send the right HTTP status.
 *
 * Usage:
 *   throw new NotFoundError("Vehicle not found");
 *   throw new ValidationError("Cargo weight exceeds vehicle capacity");
 *   throw new UnauthorizedError();
 *   throw new ForbiddenError("Only fleet managers can retire vehicles");
 *   throw new ConflictError("Registration number already exists");
 *   throw new BusinessRuleError("Driver license has expired");
 */

// ─── Base API Error ───────────────────────────────────────────────────────────
class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; // distinguishes known errors from crashes
    Error.captureStackTrace(this, this.constructor);
  }
}

// ─── 400 Bad Request ──────────────────────────────────────────────────────────
class BadRequestError extends ApiError {
  constructor(message = "Bad request") {
    super(message, 400);
    this.name = "BadRequestError";
  }
}

// ─── 401 Unauthorized ────────────────────────────────────────────────────────
class UnauthorizedError extends ApiError {
  constructor(message = "Authentication required") {
    super(message, 401);
    this.name = "UnauthorizedError";
  }
}

// ─── 403 Forbidden ───────────────────────────────────────────────────────────
class ForbiddenError extends ApiError {
  constructor(message = "You do not have permission to perform this action") {
    super(message, 403);
    this.name = "ForbiddenError";
  }
}

// ─── 404 Not Found ───────────────────────────────────────────────────────────
class NotFoundError extends ApiError {
  constructor(message = "Resource not found") {
    super(message, 404);
    this.name = "NotFoundError";
  }
}

// ─── 409 Conflict ────────────────────────────────────────────────────────────
class ConflictError extends ApiError {
  constructor(message = "Resource already exists") {
    super(message, 409);
    this.name = "ConflictError";
  }
}

// ─── 422 Unprocessable Entity ────────────────────────────────────────────────
class ValidationError extends ApiError {
  constructor(message = "Validation failed") {
    super(message, 422);
    this.name = "ValidationError";
  }
}

// ─── 422 Business Rule Violation ─────────────────────────────────────────────
/**
 * Used specifically for domain/business rule violations
 * (e.g., cargo exceeds capacity, driver license expired, vehicle not available).
 * Also returns HTTP 422 but is semantically distinct for logging purposes.
 */
class BusinessRuleError extends ApiError {
  constructor(message = "Business rule violation") {
    super(message, 422);
    this.name = "BusinessRuleError";
  }
}

// ─── 429 Too Many Requests ───────────────────────────────────────────────────
class TooManyRequestsError extends ApiError {
  constructor(message = "Too many requests, please try again later") {
    super(message, 429);
    this.name = "TooManyRequestsError";
  }
}

// ─── 500 Internal Server Error ───────────────────────────────────────────────
class InternalError extends ApiError {
  constructor(message = "Internal server error") {
    super(message, 500);
    this.name = "InternalError";
  }
}

module.exports = {
  ApiError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
  ValidationError,
  BusinessRuleError,
  TooManyRequestsError,
  InternalError,
};
