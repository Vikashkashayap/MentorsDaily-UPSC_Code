import callApi from "./baseService.js";

export const getAllFreeResources = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams();
    if (filters.category) queryParams.append("category", filters.category);
    if (filters.difficulty) queryParams.append("difficulty", filters.difficulty);
    if (filters.search) queryParams.append("search", filters.search);

    const queryString = queryParams.toString();
    const endpoint = queryString
      ? `api/v1/free-resourse/all?${queryString}`
      : "api/v1/free-resourse/all";

    const response = await callApi({
      endpoint,
      method: "GET",
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching free resources:", error);
    throw error;
  }
};

export const getFreeResourceById = async (id) => {
  try {
    const response = await callApi({
      endpoint: `api/v1/get/free-resourse/${id}`,
      method: "GET",
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching free resource:", error);
    throw error;
  }
};

export const createFreeResource = async (formData) => {
  try {
    const response = await callApi({
      endpoint: "api/v1/create-free-resourse",
      method: "POST",
      body: formData,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating free resource:", error);
    throw error;
  }
};

export const updateFreeResource = async (id, formData) => {
  try {
    const response = await callApi({
      endpoint: `api/v1/free-resourse/${id}`,
      method: "PUT",
      body: formData,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating free resource:", error);
    throw error;
  }
};

export const deleteFreeResource = async (id) => {
  try {
    const response = await callApi({
      endpoint: `api/v1/free-resourse/${id}`,
      method: "DELETE",
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting free resource:", error);
    throw error;
  }
};

export const getAvailableCategories = () => {
  return [
    "NCERT Books",
    "Previous Year Papers",
    "Study Notes",
    "Current Affairs",
    "Reference Books",
    "Practice Papers",
    "Syllabus",
    "Other"
  ];
};

export const getDifficultyLevels = () => {
  return ["Beginner", "Intermediate", "Advanced"];
};
