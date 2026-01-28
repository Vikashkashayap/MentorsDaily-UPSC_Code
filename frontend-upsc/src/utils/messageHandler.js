import { MESSAGE_TYPES } from '../enums/roles.js';

// Message handler class
export class MessageHandler {
  constructor() {
    this.messages = [];
    this.listeners = [];
  }

  // Add a message
  addMessage(message, type = MESSAGE_TYPES.INFO, duration = 5000) {
    const messageObj = {
      id: Date.now() + Math.random(),
      message,
      type,
      duration,
      timestamp: new Date()
    };

    this.messages.push(messageObj);
    this.notifyListeners();

    // Auto remove message after duration
    if (duration > 0) {
      setTimeout(() => {
        this.removeMessage(messageObj.id);
      }, duration);
    }

    return messageObj.id;
  }

  // Remove a message
  removeMessage(messageId) {
    this.messages = this.messages.filter(msg => msg.id !== messageId);
    this.notifyListeners();
  }

  // Clear all messages
  clearMessages() {
    this.messages = [];
    this.notifyListeners();
  }

  // Get all messages
  getMessages() {
    return this.messages;
  }

  // Add listener for message changes
  addListener(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(listener => listener !== callback);
    };
  }

  // Notify all listeners
  notifyListeners() {
    this.listeners.forEach(callback => callback(this.messages));
  }

  // Success message
  success(message, duration = 5000) {
    return this.addMessage(message, MESSAGE_TYPES.SUCCESS, duration);
  }

  // Error message
  error(message, duration = 7000) {
    return this.addMessage(message, MESSAGE_TYPES.ERROR, duration);
  }

  // Warning message
  warning(message, duration = 6000) {
    return this.addMessage(message, MESSAGE_TYPES.WARNING, duration);
  }

  // Info message
  info(message, duration = 5000) {
    return this.addMessage(message, MESSAGE_TYPES.INFO, duration);
  }
}

// Create global message handler instance
export const messageHandler = new MessageHandler();

// Helper functions for common message patterns
export const showSuccess = (message) => messageHandler.success(message);
export const showError = (message) => messageHandler.error(message);
export const showWarning = (message) => messageHandler.warning(message);
export const showInfo = (message) => messageHandler.info(message);

// API response message handler
export const handleApiResponse = (response, successMessage = 'Operation successful') => {
  if (response?.data?.message) {
    if (response.status >= 200 && response.status < 300) {
      showSuccess(response.data.message);
    } else {
      showError(response.data.message);
    }
  } else if (response?.status >= 200 && response?.status < 300) {
    showSuccess(successMessage);
  } else {
    showError('Something went wrong. Please try again.');
  }
};

// Error handler for API calls
export const handleApiError = (error, defaultMessage = 'An error occurred') => {
  const errorMessage = error?.response?.data?.message || 
                      error?.message || 
                      defaultMessage;
  showError(errorMessage);
  console.error('API Error:', error);
};