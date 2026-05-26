import { API_STATUS, MESSAGE_TYPES } from '../enums/roles';
import { messageHandler } from './messageHandler';

// Data handler class for managing API responses and data
export class DataHandler {
  constructor() {
    this.cache = new Map();
    this.loadingStates = new Map();
  }

  // Handle API response with proper error handling
  async handleApiCall(apiCall, options = {}) {
    const {
      showSuccessMessage = true,
      showErrorMessage = true,
      successMessage = 'Operation successful',
      errorMessage = 'Something went wrong',
      cacheKey = null,
      cacheDuration = 5 * 60 * 1000 // 5 minutes
    } = options;

    try {
      if (cacheKey) {
        this.loadingStates.set(cacheKey, true);
      }

      const response = await apiCall();

      const isSuccess = (response?.status >= 200 && response?.status < 300) ||
        (response?.data?.success === true) ||
        (response?.success === true);
      if (isSuccess) {
        if (showSuccessMessage && response?.data?.message) {
          messageHandler.success(response.data.message);
        } else if (showSuccessMessage && successMessage) {
          messageHandler.success(successMessage);
        }

        if (cacheKey) {
          this.cache.set(cacheKey, {
            data: response.data,
            timestamp: Date.now(),
            duration: cacheDuration
          });
        }

        return {
          status: API_STATUS.SUCCESS,
          data: response.data || response,
          message: response?.data?.message || successMessage
        };
      } else {
        throw new Error(response?.data?.data?.message || response?.message || errorMessage);
      }
    } catch (error) {
      console.error('API Error:', error);

      if (showErrorMessage) {
        const errorMsg = error?.response?.data?.message ||
          error?.message ||
          errorMessage;
        messageHandler.error(errorMsg);
      }

      return {
        status: API_STATUS.ERROR,
        data: null,
        message: error?.response?.data?.message || error?.message || errorMessage,
        error: error
      };
    } finally {
      // Clear loading state
      if (cacheKey) {
        this.loadingStates.set(cacheKey, false);
      }
    }
  }

  // Get cached data
  getCachedData(key) {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < cached.duration) {
      return cached.data;
    }
    return null;
  }

  // Check if data is loading
  isLoading(key) {
    return this.loadingStates.get(key) || false;
  }

  // Clear cache
  clearCache(key = null) {
    if (key) {
      this.cache.delete(key);
    } else {
      this.cache.clear();
    }
  }

  // Format user data for display
  formatUserData(userData) {
    if (!userData) return null;

    return {
      id: userData._id || userData.id,
      name: userData.name || 'User',
      email: userData.email || '',
      role: userData.role || 'user',
      createdAt: userData.createdAt ? new Date(userData.createdAt) : null,
      updatedAt: userData.updatedAt ? new Date(userData.updatedAt) : null,
      isAdmin: userData.role === 'admin' || userData.role === 'superadmin',
      isSuperAdmin: userData.role === 'superadmin'
    };
  }

  // Format test data for display
  formatTestData(testData) {
    if (!testData) return null;

    return {
      id: testData._id || testData.id,
      title: testData.title || 'Test',
      subject: testData.subject || 'General',
      totalQuestions: testData.totalQuestions || 0,
      duration: testData.duration || 0,
      difficulty: testData.difficulty || 'medium',
      score: testData.score || 0,
      maxScore: testData.maxScore || 100,
      percentage: testData.score && testData.maxScore ?
        Math.round((testData.score / testData.maxScore) * 100) : 0,
      completedAt: testData.completedAt ? new Date(testData.completedAt) : null,
      status: testData.status || 'pending'
    };
  }

  // Format progress data
  formatProgressData(progressData) {
    if (!progressData) return null;

    return {
      prelims: {
        completed: progressData.prelims?.completed || 0,
        total: progressData.prelims?.total || 0,
        percentage: progressData.prelims?.percentage || 0
      },
      mains: {
        completed: progressData.mains?.completed || 0,
        total: progressData.mains?.total || 0,
        percentage: progressData.mains?.percentage || 0
      },
      currentAffairs: {
        completed: progressData.currentAffairs?.completed || 0,
        total: progressData.currentAffairs?.total || 0,
        percentage: progressData.currentAffairs?.percentage || 0
      }
    };
  }

  // Validate form data
  validateFormData(data, rules) {
    const errors = {};

    Object.keys(rules).forEach(field => {
      const rule = rules[field];
      const value = data[field];

      // Required validation
      if (rule.required && (!value || value.toString().trim() === '')) {
        errors[field] = rule.message || `${field} is required`;
        return;
      }

      // Email validation
      if (rule.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          errors[field] = rule.message || 'Please enter a valid email';
        }
      }

      // Min length validation
      if (rule.minLength && value && value.length < rule.minLength) {
        errors[field] = rule.message || `${field} must be at least ${rule.minLength} characters`;
      }

      // Max length validation
      if (rule.maxLength && value && value.length > rule.maxLength) {
        errors[field] = rule.message || `${field} must not exceed ${rule.maxLength} characters`;
      }

      // Custom validation
      if (rule.custom && value) {
        const customError = rule.custom(value, data);
        if (customError) {
          errors[field] = customError;
        }
      }
    });

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  // Debounce function for search inputs
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Throttle function for scroll events
  throttle(func, limit) {
    let inThrottle;
    return function () {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
}

// Create global data handler instance
export const dataHandler = new DataHandler();

// Helper functions for common data operations
export const formatDate = (date, options = {}) => {
  const defaultOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };

  return new Date(date).toLocaleDateString('en-IN', { ...defaultOptions, ...options });
};

export const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m ${secs}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${secs}s`;
  } else {
    return `${secs}s`;
  }
};

export const formatNumber = (num, options = {}) => {
  const defaultOptions = {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  };

  return new Intl.NumberFormat('en-IN', { ...defaultOptions, ...options }).format(num);
};

export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};