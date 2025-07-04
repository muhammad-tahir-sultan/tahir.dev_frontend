/**
 * Authentication Manager
 * 
 * This utility provides consistent authentication management
 * using localStorage for user data.
 */

// User storage key
const USER_DATA_KEY = 'sigmadevelopers_user';

/**
 * Save user data to localStorage
 * @param {Object} user - User data object
 * @returns {boolean} Success status
 */
export const saveUser = (user) => {
  if (!user) return false;
  
  try {
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(user));
    return true;
  } catch (error) {
    console.error('Error saving user data:', error);
    return false;
  }
};

/**
 * Get user data from localStorage
 * @returns {Object|null} User data or null if not found
 */
export const getUser = () => {
  try {
    const userData = localStorage.getItem(USER_DATA_KEY);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
};

/**
 * Check if user is authenticated
 * @returns {boolean} Authentication status
 */
export const isAuthenticated = () => {
  const user = getUser();
  return !!user;
};

/**
 * Clear all authentication data
 */
export const clearAuth = () => {
  try {
    localStorage.removeItem(USER_DATA_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing authentication data:', error);
    return false;
  }
};

export default {
  saveUser,
  getUser,
  isAuthenticated,
  clearAuth
}; 