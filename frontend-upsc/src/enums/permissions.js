import { USER_ROLES } from './roles.js';

// Permission levels
export const PERMISSIONS = {
  // Admin permissions
  MANAGE_USERS: 'manage_users',
  MANAGE_CONTENT: 'manage_content',
  VIEW_ANALYTICS: 'view_analytics',
  MANAGE_SYSTEM: 'manage_system',
  
  // User permissions
  VIEW_STUDY_MATERIALS: 'view_study_materials',
  TAKE_TESTS: 'take_tests',
  ASK_QUESTIONS: 'ask_questions',
  VIEW_PROGRESS: 'view_progress',
  UPLOAD_ANSWERS: 'upload_answers'
};

// Role-based permissions mapping
export const ROLE_PERMISSIONS = {
  [USER_ROLES.SUPERADMIN]: [
    PERMISSIONS.MANAGE_USERS,
    PERMISSIONS.MANAGE_CONTENT,
    PERMISSIONS.VIEW_ANALYTICS,
    PERMISSIONS.MANAGE_SYSTEM,
    PERMISSIONS.VIEW_STUDY_MATERIALS,
    PERMISSIONS.TAKE_TESTS,
    PERMISSIONS.ASK_QUESTIONS,
    PERMISSIONS.VIEW_PROGRESS,
    PERMISSIONS.UPLOAD_ANSWERS
  ],
  [USER_ROLES.ADMIN]: [
    PERMISSIONS.MANAGE_USERS,
    PERMISSIONS.MANAGE_CONTENT,
    PERMISSIONS.VIEW_ANALYTICS,
    PERMISSIONS.VIEW_STUDY_MATERIALS,
    PERMISSIONS.TAKE_TESTS,
    PERMISSIONS.ASK_QUESTIONS,
    PERMISSIONS.VIEW_PROGRESS,
    PERMISSIONS.UPLOAD_ANSWERS
  ],
  [USER_ROLES.USER]: [
    PERMISSIONS.VIEW_STUDY_MATERIALS,
    PERMISSIONS.TAKE_TESTS,
    PERMISSIONS.ASK_QUESTIONS,
    PERMISSIONS.VIEW_PROGRESS,
    PERMISSIONS.UPLOAD_ANSWERS
  ],
  [USER_ROLES.STUDENT]: [
    PERMISSIONS.VIEW_STUDY_MATERIALS,
    PERMISSIONS.TAKE_TESTS,
    PERMISSIONS.ASK_QUESTIONS,
    PERMISSIONS.VIEW_PROGRESS,
    PERMISSIONS.UPLOAD_ANSWERS
  ]
};

// Check if user has specific permission
export const hasPermission = (userRole, permission) => {
  const userPermissions = ROLE_PERMISSIONS[userRole] || [];
  return userPermissions.includes(permission);
};

// Check if user is admin
export const isAdmin = (userRole) => {
  return userRole === USER_ROLES.ADMIN || userRole === USER_ROLES.SUPERADMIN;
};

// Check if user is superadmin
export const isSuperAdmin = (userRole) => {
  return userRole === USER_ROLES.SUPERADMIN;
};