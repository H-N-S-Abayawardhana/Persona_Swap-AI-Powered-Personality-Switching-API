/**
 * Utility for formatting API responses consistently
 */

/**
 * Format a successful response
 * @param {*} data - Data to include in the response
 * @param {string} message - Optional success message
 * @returns {Object} - Formatted success response
 */
function formatSuccess(data, message = '') {
  return {
    success: true,
    message: message,
    data: data
  };
}

/**
 * Format an error response
 * @param {string} message - Error message
 * @param {*} error - Optional error details 
 * @param {number} statusCode - HTTP status code
 * @returns {Object} - Formatted error response
 */
function formatError(message, error = null, statusCode = 500) {
  const response = {
    success: false,
    message: message,
    statusCode: statusCode
  };

  // In development, include error details
  // In production, you might want to exclude this
  if (error && process.env.NODE_ENV !== 'production') {
    response.error = typeof error === 'object' ? 
      error.message || JSON.stringify(error) : 
      error.toString();
  }

  return response;
}

/**
 * Express middleware to add response formatting helpers to res object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
function responseFormatterMiddleware(req, res, next) {
  // Add success response helper
  res.sendSuccess = function(data, message, statusCode = 200) {
    return res.status(statusCode).json(formatSuccess(data, message));
  };

  // Add error response helper
  res.sendError = function(message, error = null, statusCode = 500) {
    return res.status(statusCode).json(formatError(message, error, statusCode));
  };

  next();
}

module.exports = {
  formatSuccess,
  formatError,
  middleware: responseFormatterMiddleware
};