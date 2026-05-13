/**
 * Parse comma-separated URLs from environment variable
 * @param {string} urlsString - Comma-separated URLs (e.g., "http://localhost:5173,https://example.com")
 * @returns {string[]} Array of trimmed URLs
 */
const parseOrigins = (urlsString) => {
    if (!urlsString) return [];
    return urlsString
        .split(',')
        .map(url => url.trim())
        .filter(url => url.length > 0);
};

/**
 * Check if origin is allowed
 * @param {string} origin - Request origin to check
 * @param {string[]} allowedOrigins - Array of allowed origins
 * @returns {boolean} True if origin is allowed
 */
const isOriginAllowed = (origin, allowedOrigins) => {
    if (!origin) return false;
    return allowedOrigins.includes(origin);
};

/**
 * Get CORS origin header value based on request origin
 * @param {string} origin - Request origin
 * @param {string} urlsString - Comma-separated allowed URLs from env
 * @returns {string|false} The origin if allowed, false otherwise
 */
const getCorsOrigin = (origin, urlsString) => {
    const allowedOrigins = parseOrigins(urlsString);
    
    // If no origins configured, deny CORS
    if (allowedOrigins.length === 0) {
        return false;
    }
    
    // Check if request origin is in allowed list
    if (isOriginAllowed(origin, allowedOrigins)) {
        return origin;
    }
    
    return false;
};

module.exports = {
    parseOrigins,
    isOriginAllowed,
    getCorsOrigin
};
