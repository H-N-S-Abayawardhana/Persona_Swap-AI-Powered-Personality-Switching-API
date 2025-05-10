/**
 * Rate limiter middleware to prevent abuse
 */

const rateLimit = require('express-rate-limit');
const responseFormatter = require('../utils/responseFormatter');

// Create rate limiter middleware
const limiter = rateLimit({
  windowMs: process.env.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000, // 15 minutes by default
  max: process.env.RATE_LIMIT_MAX || 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  
  // Custom handler for rate limit exceeded
  handler: (req, res, _) => {
    res.status(429).json(
      responseFormatter.error('Too many requests, please try again later', 429)
    );
  }
});

module.exports = limiter;