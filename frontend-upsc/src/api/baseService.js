// import axios from "axios";

// const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// /**
//  * General API call function
//  * @param {Object} options - API options
//  * @param {string} options.endpoint - API endpoint (without BASE_URL)
//  * @param {string} [options.method=GET] - HTTP method
//  * @param {Object} [options.body] - Request body for POST/PUT/PATCH
//  * @param {Object} [options.headers] - Additional headers
//  * @returns {Promise<any>} - Response data
//  */
// export default async function callApi({
//   endpoint,
//   method,
//   body,
//   responseType,
//   headers = {},
// }) {
//   try {
//     const authToken = localStorage.getItem("token");

//     const defaultHeaders = {
//       "Content-Type": "application/json",
//       ...(authToken && { "Authorization": `${authToken}` })
//     };

//     const finalHeaders = { ...defaultHeaders, ...headers };

//     const response = await axios({
//       url: `${BASE_URL}/${endpoint}`,
//       method,
//       data: body,
//       responseType,
//       headers: finalHeaders,
//       timeout: 300000,
//     });

//     return response;
//   } catch (e) {
//     console.error("API call failed:", e);

//     if (e.response?.status === 401) {
//       attemptLogout();
//       window.location = LOGIN_ROUTE;
//     }

//     throw e instanceof Error
//       ? e
//       : new Error(e?.response?.data?.message || "API CALL Failed");
//   }
// }



import axios from "axios";
import { logout } from "../utils/authUtils";
import { ROUTES } from "../constants/routesEnum";

const BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/$/, "");

function buildApiUrl(endpoint) {
  const path = endpoint.startsWith("/") ? endpoint.slice(1) : endpoint;
  return `${BASE_URL}/${path}`;
}

export default async function callApi({
  endpoint,
  method,
  body,
  responseType,
  headers = {},
  requiresAuth = true,
}) {
  try {
    const authToken = localStorage.getItem("token");
    const defaultHeaders = {
      ...(requiresAuth && authToken && { "Authorization": `${authToken}` })
    };
    if (!(body instanceof FormData)) {
      defaultHeaders["Content-Type"] = "application/json";

    }

    const finalHeaders = { ...defaultHeaders, ...headers };

    const response = await axios({
      url: buildApiUrl(endpoint),
      method,
      data: body,
      responseType,
      headers: finalHeaders,
      timeout: 300000,
      withCredentials: false,
      // Add flag to indicate if this is a public request
      isPublicRequest: !requiresAuth,
      requiresAuth: requiresAuth,
    });

    return response;
  } catch (e) {
    console.error("API call failed:", e);

    // Handle token expiry or unauthorized access (only for authenticated requests)
    if (e.response?.status === 401 && requiresAuth) {
      logout();
      window.location.href = ROUTES.LOGIN;
      return;
    }

    throw e instanceof Error
      ? e
      : new Error(e?.response?.data?.message || "API CALL Failed");
  }
}