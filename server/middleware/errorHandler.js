/**
 * Global error handler middleware.
 * Must be registered LAST in the Express middleware chain.
 *
 * Handles:
 *  - Operational ApiError subclasses (from utils/apiErrors.js) — isOperational: true
 *  - Mongoose errors (duplicate key, validation, cast)
 *  - JWT errors
 *  - Unknown/crash errors — logs as critical, returns 500
 */
const errorHandler = (err, req, res, next) => {
  // ─── Determine severity for logging ──────────────────────────────────────
  if (err.isOperational) {
    // Known, expected error — log at info level
    console.warn(`[WARN] ${req.method} ${req.originalUrl} → [${err.name}] ${err.message}`);
  } else {
    // Unexpected crash — log full stack
    console.error(`[ERROR] ${req.method} ${req.originalUrl} →`, err);
  }

  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  let errors = null;

  // ─── Mongoose Duplicate Key ───────────────────────────────────────────────
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || "field";
    message = `Duplicate value for '${field}'. Please use a unique value.`;
    statusCode = 409;
  }

  // ─── Mongoose Validation Error ────────────────────────────────────────────
  if (err.name === "ValidationError" && err.errors) {
    errors = Object.values(err.errors).map((e) => e.message);
    message = "Validation failed";
    statusCode = 422;
  }

  // ─── Mongoose Bad ObjectId ────────────────────────────────────────────────
  if (err.name === "CastError") {
    message = `Invalid ID format for field '${err.path}'`;
    statusCode = 400;
  }

  // ─── JWT Errors ───────────────────────────────────────────────────────────
  if (err.name === "JsonWebTokenError") {
    message = "Invalid token — please log in again";
    statusCode = 401;
  }
  if (err.name === "TokenExpiredError") {
    message = "Token expired — please log in again";
    statusCode = 401;
  }

  // ─── Non-operational crash: hide details in production ───────────────────
  if (!err.isOperational && process.env.NODE_ENV === "production") {
    message = "Internal server error";
    statusCode = 500;
    errors = null;
  }

  const body = { success: false, message };
  if (errors && errors.length) body.errors = errors;
  if (err.type) body.type = err.type;                           // e.g. BUSINESS_RULE_VIOLATION
  if (process.env.NODE_ENV === "development") body.stack = err.stack;

  return res.status(statusCode).json(body);
};

module.exports = errorHandler;
