// Application constants
export const APP_CONFIG = {
  NAME: 'MentorsDaily',
  VERSION: '1.0.0',
  API_BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api',
  TOKEN_KEY: 'token',
  USER_KEY: 'user',
  REMEMBER_ME_KEY: 'remember_me'
};

// UI Constants
export const UI_CONSTANTS = {
  TOAST_DURATION: {
    SUCCESS: 5000,
    ERROR: 7000,
    WARNING: 6000,
    INFO: 5000
  },
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 10,
    MAX_PAGE_SIZE: 100
  },
  DEBOUNCE_DELAY: 300,
  THROTTLE_DELAY: 100
};

// Form validation rules
export const VALIDATION_RULES = {
  EMAIL: {
    required: true,
    type: 'email',
    message: 'Please enter a valid email address'
  },
  PASSWORD: {
    required: true,
    minLength: 6,
    message: 'Password must be at least 6 characters long'
  },
  NAME: {
    required: true,
    minLength: 2,
    maxLength: 50,
    message: 'Name must be between 2 and 50 characters'
  },
  PHONE: {
    required: false,
    minLength: 10,
    maxLength: 15,
    message: 'Please enter a valid phone number'
  }
};

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password'
  },
  USER: {
    PROFILE: '/user/profile',
    UPDATE_PROFILE: '/user/profile',
    CHANGE_PASSWORD: '/user/change-password'
  },
  ADMIN: {
    USERS: '/admin/users',
    STATS: '/admin/stats',
    DASHBOARD: '/admin/dashboard'
  },
  STUDY: {
    MCQ: '/study/mcq',
    TESTS: '/study/tests',
    LIBRARY: '/study/library',
    PROGRESS: '/study/progress'
  }
};

// Local storage keys
export const STORAGE_KEYS = {
  TOKEN: 'mentorsdaily_token',
  USER: 'mentorsdaily_user',
  THEME: 'mentorsdaily_theme',
  LANGUAGE: 'mentorsdaily_language',
  SETTINGS: 'mentorsdaily_settings'
};

// Theme constants
export const THEME = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system'
};

// Language constants
export const LANGUAGES = {
  EN: 'en',
  HI: 'hi'
};

// Study subjects
export const SUBJECTS = {
  HISTORY: 'history',
  GEOGRAPHY: 'geography',
  POLITY: 'polity',
  ECONOMICS: 'economics',
  SCIENCE: 'science',
  CURRENT_AFFAIRS: 'current_affairs',
  GENERAL_STUDIES: 'general_studies'
};

// Course categories
export const COURSE_CATEGORIES = {
  GS: 'General Studies',
  GS_CSAT: 'GS + CSAT',
  PRELIMS_MAINS_INTERVIEW: 'Prelims + Mains + Interview',
  PRELIMS: 'Prelims',
  MAINS: 'Mains',
  INTERVIEW: 'Interview',
  ESSAY: 'Essay',
  ETHICS: 'Ethics',
  OPTIONAL: 'Optional',
  CURRENT_AFFAIRS: 'Current Affairs',
  TEST_SERIES: 'Test Series',
  MENTORSHIP: 'Mentorship',
  COUNSELLING: 'Counselling'
};

// Test difficulty levels
export const DIFFICULTY_LEVELS = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard'
};

// Test status
export const TEST_STATUS = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
};

// User progress status
export const PROGRESS_STATUS = {
  NOT_STARTED: 'not_started',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  REVIEWED: 'reviewed'
};