import { USER_ROLES, isAdmin, isSuperAdmin } from '../enums/userRoles';

export const getUserData = () => {
  try {
    const user = localStorage.getItem("user");
    if (!user) return null;
    return JSON.parse(user);
  } catch (error) {
    console.error("Error parsing user data:", error);
    return null;
  }
};

export const getUserRole = () => {
  const userData = getUserData();
  return userData?.role || USER_ROLES.GUEST;
};

export const isUserAdmin = () => {
  const role = getUserRole();
  return isAdmin(role);
};

export const isUserSuperAdmin = () => {
  const role = getUserRole();
  return isSuperAdmin(role);
};

export const getToken = () => {
  return localStorage.getItem("token") || sessionStorage.getItem("token");
};

export const isAuthenticated = () => {
  const token = getToken();
  const user = getUserData();
  return !!(token && user);
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  sessionStorage.removeItem("token");
};