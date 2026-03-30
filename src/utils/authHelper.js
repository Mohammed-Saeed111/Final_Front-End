/**
 * Authentication Helper Utilities
 * Centralized functions for auth-related operations
 */

/**
 * Check if user is authenticated
 * @returns {boolean} True if token exists in localStorage
 */
export const isAuthenticated = () => {
  return !!localStorage.getItem('token')
}

/**
 * Get stored authentication token
 * @returns {string|null} The JWT token or null if not authenticated
 */
export const getAuthToken = () => {
  return localStorage.getItem('token')
}

/**
 * Save authentication token to localStorage
 * @param {string} token - The JWT token to save
 */
export const saveAuthToken = (token) => {
  if (token) {
    localStorage.setItem('token', token)
  }
}

/**
 * Clear authentication token and related data
 */
export const clearAuth = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('userData')
}

/**
 * Check if token is expired (basic check - doesn't verify signature)
 * @param {string} token - The JWT token to check
 * @returns {boolean} True if token appears to be expired
 */
export const isTokenExpired = (token) => {
  try {
    if (!token) return true
    
    // JWT format: header.payload.signature
    const parts = token.split('.')
    if (parts.length !== 3) return true
    
    // Decode payload (this doesn't verify the signature)
    const payload = JSON.parse(atob(parts[1]))
    
    // If no expiration time, assume it's valid
    if (!payload.exp) return false
    
    // Convert to milliseconds and compare with current time
    return payload.exp * 1000 < Date.now()
  } catch (error) {
    console.error('Token verification error:', error)
    return true
  }
}

/**
 * Get user ID from stored token (if available)
 * @returns {string|null} The user ID or null if not available
 */
export const getUserIdFromToken = () => {
  try {
    const token = getAuthToken()
    if (!token) return null
    
    const payload = JSON.parse(atob(token.split('.')[1]))
    return payload.id || null
  } catch (error) {
    return null
  }
}

export default {
  isAuthenticated,
  getAuthToken,
  saveAuthToken,
  clearAuth,
  isTokenExpired,
  getUserIdFromToken,
}
