import callApi from "./baseService.js";

export const register = async (payload) => {
  try {
    const response = await callApi({
      endpoint: "api/v1/register",
      method: "POST",
      body: payload,
    });
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

// User login
export const login = async (payload) => {
  try {
    const response = await callApi({
      endpoint: "api/v1/login",
      method: "POST",
      body: payload,
    });
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

// Fetch all users (requires auth)
export const getUsers = async () => {
  try {
    const response = await callApi({
      endpoint: "api/v1/users",
      method: "GET",
      requiresAuth: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// Fetch all courses (optional pagination: { page, limit })
export const getCourses = async (options = {}) => {
  try {
    const { page, limit } = options;
    let endpoint = "api/v1/get-course";
    if (Number.isInteger(page) && Number.isInteger(limit) && page >= 1 && limit >= 1) {
      endpoint += `?page=${page}&limit=${limit}`;
    }
    const response = await callApi({
      endpoint,
      method: "GET",
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};

export const getCourseById = async (courseId) => {
  try {
    const response = await callApi({
      endpoint: `api/v1/course/${courseId}`,
      method: "GET",
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching course by ID:", error);
    throw error;
  }
};

// Create a new course
export const createCourse = async (payload) => {
  try {
    const response = await callApi({
      endpoint: "api/v1/create-course",
      method: "POST",
      body: payload,
      requiresAuth: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating course:", error);
    throw error;
  }
};

// Create a new current affair
export const createCurrentAffair = async (payload) => {
  try {
    const response = await callApi({
      endpoint: "api/v1/create-affair",
      method: "POST",
      body: payload,
    });
    // Return backend message and data
    return response.data;
  } catch (error) {
    console.error("Error creating current affair:", error);
    throw error;
  }
};

export const fetchCurrentAffairs = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams();
    if (filters.limit) queryParams.append("limit", filters.limit);
    if (filters.page) queryParams.append("page", filters.page);
    if (filters.q) queryParams.append("q", filters.q);
    if (filters.from) queryParams.append("startDate", filters.from);
    if (filters.to) queryParams.append("endDate", filters.to);
    if (filters.startDate) queryParams.append("startDate", filters.startDate);
    if (filters.endDate) queryParams.append("endDate", filters.endDate);
    if (filters.paperName) queryParams.append("paperName", filters.paperName);
    if (filters.subject) queryParams.append("subject", filters.subject);
    const queryString = queryParams.toString();
    const endpoint = queryString
      ? `api/v1/get-affairs?${queryString}`
      : "api/v1/get-affairs";
    const response = await callApi({
      endpoint,
      method: "GET",
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching current affairs:", error);
    throw error;
  }
};

// Update a current affair by ID
export const updateCurrentAffair = async (id, payload) => {
  try {
    const response = await callApi({
      endpoint: `api/v1/update-affair/${id}`,
      method: "PUT",
      body: payload,
    });
    // Return backend message and data
    return response.data;
  } catch (error) {
    console.error("Error updating current affair:", error);
    throw error;
  }
};

// Delete a current affair by ID
export const deleteCurrentAffair = async (id) => {
  try {
    const response = await callApi({
      endpoint: `api/v1/delete-affair/${id}`,
      method: "DELETE",
    });
    // Return backend message and data
    return response.data;
  } catch (error) {
    console.error("Error deleting current affair:", error);
    throw error;
  }
};

// Fetch a single current affair by ID
export const fetchCurrentAffairById = async (id) => {
  try {
    const response = await callApi({
      endpoint: `api/v1/affair/${id}`,
      method: "GET",
    });
    // Return backend message and data
    return response.data;
  } catch (error) {
    console.error("Error fetching current affair by ID:", error);
    throw error;
  }
};

// Update a course by ID
export const updateCourse = async (id, payload) => {
  try {
    const response = await callApi({
      endpoint: `api/v1/course/${id}`,
      method: "PATCH",
      body: payload,
      requiresAuth: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating course:", error);
    throw error;
  }
};

// Delete a course by ID
export const deleteCourse = async (id) => {
  try {
    const response = await callApi({
      endpoint: `api/v1/course/${id}`,
      method: "DELETE",
      requiresAuth: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting course:", error);
    throw error;
  }
};

// Fetch a single course by ID
export const fetchCourseById = async (id) => {
  try {
    const response = await callApi({
      endpoint: `api/v1/course/${id}`,
      method: "GET",
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching course by ID:", error);
    throw error;
  }
};

// Utility: Get available subjects for current affairs
export const getAvailableSubjects = () => {
  return [
    "GS",
    "Polity",
    "Economy",
    "Environment",
    "ScienceTech",
    "InternationalRelations",
    "Geography",
    "ArtCulture",
    "Ethics",
    "Security",
    "Misc",
  ];
};

export const initiateCoursePayment = async (payload) => {
  try {
    const response = await callApi({
      endpoint: 'api/v1/initiate-course-payment',
      method: 'POST',
      body: payload,
    });
    return response.data;
  } catch (error) {
    console.error('Error initiating course payment:', error);
    throw error;
  }
};

export const verifyCoursePayment = async (payload) => {
  try {
    const response = await callApi({
      endpoint: 'api/v1/verify-course-payment',
      method: 'POST',
      body: payload,
    });
    return response.data;
  } catch (error) {
    console.error('Error verifying course payment:', error);
    throw error;
  }
};


export const getPaymentReceipt = async (paymentId) => {
  try {
    const response = await callApi({
      endpoint: `api/v1/payment-receipt/${paymentId}`,
      method: 'GET',
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching payment receipt:', error);
    throw error;
  }
};

// Fetch all payments (admin only)
export const getAllPayments = async () => {
  try {
    const response = await callApi({
      endpoint: 'api/v1/recent-payment',
      method: 'GET',
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching payments:', error);
    throw error;
  }
};

// ============================================
// PREPARATION BLOGS
// ============================================

// Get all preparation blogs
export const getPreparationBlogs = async () => {
  try {
    const response = await callApi({
      endpoint: 'api/v1/preparation/get-blog',
      method: 'GET',
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching preparation blogs:', error);
    throw error;
  }
};

// Create a new preparation blog
export const createPreparationBlog = async (formData) => {
  try {
    const response = await callApi({
      endpoint: 'api/v1/preparation/create-blog',
      method: 'POST',
      body: formData,
    });
    return response.data;
  } catch (error) {
    console.error('Error creating preparation blog:', error);
    throw error;
  }
};

// Update an existing preparation blog
export const updatePreparationBlog = async (id, formData) => {
  try {
    const response = await callApi({
      endpoint: `api/v1/preparation/${id}/update-blog`,
      method: 'PUT',
      body: formData,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating preparation blog:', error);
    throw error;
  }
};

// Delete a preparation blog
export const deletePreparationBlog = async (id) => {
  try {
    const response = await callApi({
      endpoint: `api/v1/preparation/${id}/delete-blog`,
      method: 'DELETE',
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting preparation blog:', error);
    throw error;
  }
};
