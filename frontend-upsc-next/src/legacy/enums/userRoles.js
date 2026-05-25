export const USER_ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  USER: 'user',
  GUEST: 'guest'
};

export const ROLE_HIERARCHY = {
  [USER_ROLES.SUPER_ADMIN]: 4,
  [USER_ROLES.ADMIN]: 3,
  [USER_ROLES.USER]: 2,
  [USER_ROLES.GUEST]: 1
};

export const isAdmin = (role) => {
  return role === USER_ROLES.ADMIN || role === USER_ROLES.SUPER_ADMIN;
};

export const isSuperAdmin = (role) => {
  return role === USER_ROLES.SUPER_ADMIN;
};

export const hasMinimumRole = (userRole, requiredRole) => {
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole];
};