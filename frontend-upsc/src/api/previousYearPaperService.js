import callApi from "./baseService.js";

// Create a new previous year paper
export const createPreviousYearPaper = async (payload) => {
  try {
    const response = await callApi({
      endpoint: "api/v1/previousyear/add-new-paper",
      method: "POST",
      body: payload,
      requiresAuth: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating previous year paper:", error);
    throw error;
  }
};

// Get all previous year papers
export const getAllPreviousYearPapers = async () => {
  try {
    const response = await callApi({
      endpoint: "api/v1/previousyear/get-all-papers",
      method: "GET",
      requiresAuth: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching previous year papers:", error);
    throw error;
  }
};

// Get all previous year papers (public - tries with auth if available, otherwise without)
export const getPublicPreviousYearPapers = async () => {
  try {
    // Check if user has a token - if yes, use authenticated endpoint
    const authToken = localStorage.getItem("token");
    const requiresAuth = !!authToken;
    
    const response = await callApi({
      endpoint: "api/v1/previousyear/get-all-papers",
      method: "GET",
      requiresAuth: requiresAuth,
    });
    return response.data;
  } catch (error) {
    // If authenticated request fails, try without auth
    if (error.response?.status === 401) {
      try {
        const response = await callApi({
          endpoint: "api/v1/previousyear/get-all-papers",
          method: "GET",
          requiresAuth: false,
        });
        return response.data;
      } catch (fallbackError) {
        console.error("Error fetching public previous year papers:", fallbackError);
        throw fallbackError;
      }
    }
    console.error("Error fetching public previous year papers:", error);
    throw error;
  }
};

// Update a previous year paper by ID
export const updatePreviousYearPaper = async (id, payload) => {
  try {
    const response = await callApi({
      endpoint: `api/v1/previousyear/${id}/updatepapers`,
      method: "PUT",
      body: payload,
      requiresAuth: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating previous year paper:", error);
    throw error;
  }
};

// Delete a previous year paper by ID
export const deletePreviousYearPaper = async (id) => {
  try {
    const response = await callApi({
      endpoint: `api/v1/previousyear/${id}/deletepapers`,
      method: "DELETE",
      requiresAuth: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting previous year paper:", error);
    throw error;
  }
};

// Get available exam types
export const getExamTypes = () => {
  return ["Prelims", "Mains", "Compulsory"];
};

