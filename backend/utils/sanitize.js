/**
 * XSS Sanitization Utility
 * Recursively strips HTML tags from all string values in objects/arrays.
 */

/**
 * Strip HTML tags from a string
 * @param {string} str - Input string
 * @returns {string} - Sanitized string
 */
const stripTags = (str) => {
  if (typeof str !== 'string') return str;
  return str
    .replace(/<[^>]*>/g, '')       // Remove HTML tags
    .replace(/&lt;/g, '<')          // Decode common HTML entities for re-stripping
    .replace(/&gt;/g, '>')
    .replace(/<[^>]*>/g, '')       // Strip again after decode
    .replace(/javascript:/gi, '')   // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, '');    // Remove inline event handlers
};

/**
 * Recursively sanitize all string values in an object or array
 * @param {*} data - Input data (object, array, or primitive)
 * @returns {*} - Sanitized data
 */
const sanitizeInput = (data) => {
  if (typeof data === 'string') {
    return stripTags(data);
  }

  if (Array.isArray(data)) {
    return data.map((item) => sanitizeInput(item));
  }

  if (data !== null && typeof data === 'object') {
    const sanitized = {};
    for (const [key, value] of Object.entries(data)) {
      sanitized[key] = sanitizeInput(value);
    }
    return sanitized;
  }

  return data;
};

module.exports = { sanitizeInput, stripTags };
