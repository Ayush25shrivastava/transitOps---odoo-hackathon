/**
 * asyncHandler.js
 *
 * Wraps async route controllers to eliminate repetitive try/catch boilerplate.
 * Automatically forwards any thrown error to Express's next() error handler.
 *
 * Usage:
 *   router.get("/", asyncHandler(async (req, res) => { ... }));
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
