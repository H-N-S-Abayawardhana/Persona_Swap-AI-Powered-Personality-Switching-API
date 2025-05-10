/**
 * Utility to standardize API response format
 */

/**
 * Format a successful response
 * @param {any} data - The data to include in the response
 * @param {string} message - A descriptive message
 * @returns {Object} - Formatted success response
 */
const success = (data, message = 'Operation successful') => {
  return {
    success: true,
    message,
    data
  };
};

/**
 * Format an error response
 * @param {string} message - Error message
 * @param {number} statusCode - HTTP status code
 * @returns {Object} - Formatted error response
 */
const error = (message = 'An error occurred', statusCode = 500) => {
  return {
    success: false,
    message,
    statusCode
  };
};

module.exports = {
  success,
  error
};