import axios from "axios";
import { logout } from "../utils/authUtils";
import { ROUTES } from "../constants/routesEnum";

const BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/$/, "");
const inFlightRequests = new Map();
const responseCache = new Map();
const DEFAULT_GET_CACHE_TTL = 60 * 1000;

function buildApiUrl(endpoint) {
  const path = endpoint.startsWith("/") ? endpoint.slice(1) : endpoint;
  return `${BASE_URL}/${path}`;
}

function getRequestKey(url, method, headers = {}, body) {
  const normalizedMethod = String(method || "GET").toUpperCase();
  const safeHeaders = headers || {};
  const bodyKey = body instanceof FormData ? "form-data" : JSON.stringify(body ?? null);
  return `${normalizedMethod}:${url}:${JSON.stringify(safeHeaders)}:${bodyKey}`;
}

/** Drop cached GET responses whose request key contains the substring (e.g. "get-course"). */
export function clearResponseCacheByUrlSubstring(substring = "") {
  if (!substring) return;
  for (const key of responseCache.keys()) {
    if (key.includes(substring)) responseCache.delete(key);
  }
}

export default async function callApi({
  endpoint,
  method,
  body,
  responseType,
  headers = {},
  requiresAuth = true,
  dedupe = true,
  useCache = false,
  cacheTtl = DEFAULT_GET_CACHE_TTL,
  /** When true, 404 responses are not logged (optional public lookups). */
  silentNotFound = false,
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

    const requestUrl = buildApiUrl(endpoint);
    const normalizedMethod = String(method || "GET").toUpperCase();
    const requestKey = getRequestKey(requestUrl, normalizedMethod, finalHeaders, body);

    if (useCache && normalizedMethod === "GET") {
      const cached = responseCache.get(requestKey);
      if (cached && Date.now() - cached.timestamp < cacheTtl) {
        return cached.response;
      }
    }

    if (dedupe && inFlightRequests.has(requestKey)) {
      return inFlightRequests.get(requestKey);
    }

    const requestPromise = axios({
      url: requestUrl,
      method: normalizedMethod,
      data: body,
      responseType,
      headers: finalHeaders,
      timeout: 300000,
      withCredentials: false,
      // Add flag to indicate if this is a public request
      isPublicRequest: !requiresAuth,
      requiresAuth: requiresAuth,
    }).then((response) => {
      if (useCache && normalizedMethod === "GET") {
        responseCache.set(requestKey, {
          timestamp: Date.now(),
          response,
        });
      }
      return response;
    }).finally(() => {
      inFlightRequests.delete(requestKey);
    });

    if (dedupe) {
      inFlightRequests.set(requestKey, requestPromise);
    }

    return requestPromise;
  } catch (e) {
    if (!(silentNotFound && e.response?.status === 404)) {
      console.error("API call failed:", e);
    }

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