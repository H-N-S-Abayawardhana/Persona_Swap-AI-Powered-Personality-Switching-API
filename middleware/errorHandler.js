/**
 * Global error handling middleware
 */

const responseFormatter = require('../utils/responseFormatter');

/**
 * Error handler middleware
 * @param {Error} err - Error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const errorHandler = (err, req, res, next) => {
  // Log error for server-side debugging
  console.error(`Error: ${err.message}`);
  console.error(err.stack);
  
  // Default status code and message
  const statusCode = err.statusCode || 500;
  const errorMessage = process.env.NODE_ENV === 'production' 
    ? 'Server error' 
    : err.message || 'Something went wrong';
  
  // Send formatted error response
  res.status(statusCode).json(
    responseFormatter.error(errorMessage, statusCode)
  );
};

module.exports = errorHandler;