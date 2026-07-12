/**
 * apiResponse.js
 *
 * Standardised JSON response helpers for the TransitOps API.
 * Every response shares the same envelope shape so the frontend
 * can handle success/error uniformly.
 *
 * Envelope shape:
 * {
 *   success : boolean,
 *   message : string,
 *   data    : any          (success only)
 *   errors  : string[]     (validation failures only)
 *   meta    : object       (pagination / extras, optional)
 * }
 *
 * Usage (inside a controller):
 *   return ApiResponse.success(res, data, "Vehicle created", 201);
 *   return ApiResponse.error(res, "Not found", 404);
 *   return ApiResponse.paginated(res, items, total, page, limit);
 *   return ApiResponse.validationFail(res, errors);
 */

class ApiResponse {
  // ─── 2xx Success ────────────────────────────────────────────────────────────

  /**
   * Generic success response.
   * @param {import('express').Response} res
   * @param {*}      data       - payload to return
   * @param {string} message    - human-readable message
   * @param {number} statusCode - HTTP status (default 200)
   * @param {object} meta       - optional metadata (pagination, etc.)
   */
  static success(res, data = null, message = "Success", statusCode = 200, meta = null) {
    const body = { success: true, message };
    if (data !== null && data !== undefined) body.data = data;
    if (meta) body.meta = meta;
    return res.status(statusCode).json(body);
  }

  /**
   * 201 Created convenience method.
   */
  static created(res, data, message = "Resource created successfully") {
    return ApiResponse.success(res, data, message, 201);
  }

  /**
   * 204 No Content — for DELETE operations.
   * NOTE: body is intentionally empty per HTTP spec.
   */
  static noContent(res) {
    return res.status(204).send();
  }

  // ─── Paginated List ──────────────────────────────────────────────────────────

  /**
   * Returns a paginated list response.
   * @param {import('express').Response} res
   * @param {Array}  items     - current page items
   * @param {number} total     - total document count (all pages)
   * @param {number} page      - current page (1-indexed)
   * @param {number} limit     - items per page
   * @param {string} message
   */
  static paginated(res, items, total, page, limit, message = "Success") {
    const totalPages = Math.ceil(total / limit);
    return res.status(200).json({
      success: true,
      message,
      data: items,
      meta: {
        total,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
  }

  // ─── 4xx / 5xx Error ────────────────────────────────────────────────────────

  /**
   * Generic error response.
   * @param {import('express').Response} res
   * @param {string} message
   * @param {number} statusCode
   * @param {string[]} errors - optional array of field-level error messages
   */
  static error(res, message = "An error occurred", statusCode = 500, errors = null) {
    const body = { success: false, message };
    if (errors && errors.length) body.errors = errors;
    return res.status(statusCode).json(body);
  }

  /**
   * 400 Bad Request.
   */
  static badRequest(res, message = "Bad request", errors = null) {
    return ApiResponse.error(res, message, 400, errors);
  }

  /**
   * 401 Unauthorized.
   */
  static unauthorized(res, message = "Authentication required") {
    return ApiResponse.error(res, message, 401);
  }

  /**
   * 403 Forbidden.
   */
  static forbidden(res, message = "You do not have permission to perform this action") {
    return ApiResponse.error(res, message, 403);
  }

  /**
   * 404 Not Found.
   */
  static notFound(res, message = "Resource not found") {
    return ApiResponse.error(res, message, 404);
  }

  /**
   * 409 Conflict.
   */
  static conflict(res, message = "Resource already exists") {
    return ApiResponse.error(res, message, 409);
  }

  /**
   * 422 Validation / Business Rule failure.
   * @param {import('express').Response} res
   * @param {string|string[]} errors - one or more validation messages
   */
  static validationFail(res, errors) {
    const errorList = Array.isArray(errors) ? errors : [errors];
    return res.status(422).json({
      success: false,
      message: "Validation failed",
      errors: errorList,
    });
  }

  /**
   * 422 Business rule violation (semantically distinct from field validation).
   */
  static businessRuleViolation(res, message) {
    return res.status(422).json({
      success: false,
      message,
      type: "BUSINESS_RULE_VIOLATION",
    });
  }

  /**
   * 500 Internal Server Error.
   */
  static internalError(res, message = "Internal server error") {
    return ApiResponse.error(res, message, 500);
  }
}

module.exports = ApiResponse;
