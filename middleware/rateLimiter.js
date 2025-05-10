/**
 * Rate limiting middleware to prevent abuse
 */

// Simple in-memory storage for rate limiting
// In production, you would use Redis or a similar solution
const requestsStore = {};

// Clean up old request records periodically to prevent memory leaks
setInterval(() => {
  const now = Date.now();
  // Remove entries older than the window time
  Object.keys(requestsStore).forEach(key => {
    requestsStore[key] = requestsStore[key].filter(timestamp => {
      return now - timestamp < 60 * 1000; // Keep requests from the last minute
    });
    
    if (requestsStore[key].length === 0) {
      delete requestsStore[key];
    }
  });
}, 60 * 1000); // Clean up every minute

/**
 * Rate limiter middleware
 * Limits API requests based on IP address
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
function rateLimiter(req, res, next) {
  // Settings
  const maxRequests = process.env.RATE_LIMIT_MAX || 10; // Maximum requests
  const windowMs = process.env.RATE_LIMIT_WINDOW || 60 * 1000; // Time window in milliseconds (1 minute)
  
  // Get client identifier (IP address)
  const clientId = req.ip || req.connection.remoteAddress;
  
  // Initialize or get the client's request timestamps
  if (!requestsStore[clientId]) {
    requestsStore[clientId] = [];
  }
  
  // Clean up old timestamps for this client
  const now = Date.now();
  const recentRequests = requestsStore[clientId].filter(timestamp => {
    return now - timestamp < windowMs;
  });
  
  // Check if the client has made too many requests
  if (recentRequests.length >= maxRequests) {
    // Calculate reset time
    const oldestRequest = Math.min(...recentRequests);
    const resetTime = oldestRequest + windowMs;
    const timeToReset = resetTime - now;
    
    // Set rate limit headers
    res.setHeader('X-RateLimit-Limit', maxRequests);
    res.setHeader('X-RateLimit-Remaining', 0);
    res.setHeader('X-RateLimit-Reset', Math.ceil(resetTime / 1000));
    res.setHeader('Retry-After', Math.ceil(timeToReset / 1000));
    
    return res.status(429).json({
      success: false,
      message: `Too many requests. Please try again in ${Math.ceil(timeToReset / 1000)} seconds.`
    });
  }
  
  // Add current request timestamp
  requestsStore[clientId] = [...recentRequests, now];
  
  // Set rate limit headers
  res.setHeader('X-RateLimit-Limit', maxRequests);
  res.setHeader('X-RateLimit-Remaining', maxRequests - requestsStore[clientId].length);
  
  // Continue with the request
  next();
}

module.exports = rateLimiter;