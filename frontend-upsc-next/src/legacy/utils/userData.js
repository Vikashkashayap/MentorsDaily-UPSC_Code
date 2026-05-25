// Utility function to get user data
// In a real app, this would come from authentication context or API

export const getUserData = () => {
  try {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const userRaw = localStorage.getItem('user');
    if (!token || !userRaw) return null;
    const user = JSON.parse(userRaw);
    const name = user?.name || user?.fullName || user?.email || "User";
    return {
      ...user,
      name,
      email: user?.email || null,
      role: user?.role || "user",
      initial: getInitials(name),
    };
  } catch {
    return null;
  }
};

export const getInitials = (name) => {
  if (!name) return "U";
  return name
    .split(" ")
    .map(word => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
};
