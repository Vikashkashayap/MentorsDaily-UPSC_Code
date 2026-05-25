import axios, { type AxiosRequestConfig } from "axios";
import { publicEnv } from "@/lib/env";

const inFlightRequests = new Map<string, Promise<unknown>>();
const responseCache = new Map<
  string,
  { timestamp: number; response: unknown }
>();
const DEFAULT_GET_CACHE_TTL = 60 * 1000;

function buildApiUrl(endpoint: string) {
  const path = endpoint.startsWith("/") ? endpoint.slice(1) : endpoint;
  return `${publicEnv.apiUrl}/${path}`;
}

function getRequestKey(
  url: string,
  method: string,
  headers: Record<string, string> = {},
  body: unknown
) {
  const normalizedMethod = String(method || "GET").toUpperCase();
  const bodyKey =
    body instanceof FormData ? "form-data" : JSON.stringify(body ?? null);
  return `${normalizedMethod}:${url}:${JSON.stringify(headers)}:${bodyKey}`;
}

export type CallApiOptions = {
  endpoint: string;
  method?: string;
  body?: unknown;
  responseType?: AxiosRequestConfig["responseType"];
  headers?: Record<string, string>;
  requiresAuth?: boolean;
  dedupe?: boolean;
  useCache?: boolean;
  cacheTtl?: number;
  silentNotFound?: boolean;
};

export default async function callApi<T = unknown>({
  endpoint,
  method = "GET",
  body,
  responseType,
  headers = {},
  requiresAuth = true,
  dedupe = true,
  useCache = false,
  cacheTtl = DEFAULT_GET_CACHE_TTL,
  silentNotFound = false,
}: CallApiOptions) {
  try {
    const authToken =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const defaultHeaders: Record<string, string> = {
      ...(requiresAuth && authToken && { Authorization: authToken }),
    };
    if (!(body instanceof FormData)) {
      defaultHeaders["Content-Type"] = "application/json";
    }

    const finalHeaders = { ...defaultHeaders, ...headers };
    const requestUrl = buildApiUrl(endpoint);
    const normalizedMethod = String(method).toUpperCase();
    const requestKey = getRequestKey(
      requestUrl,
      normalizedMethod,
      finalHeaders,
      body
    );

    if (useCache && normalizedMethod === "GET") {
      const cached = responseCache.get(requestKey);
      if (cached && Date.now() - cached.timestamp < cacheTtl) {
        return cached.response as T;
      }
    }

    if (dedupe && inFlightRequests.has(requestKey)) {
      return inFlightRequests.get(requestKey) as Promise<T>;
    }

    const requestPromise = axios({
      url: requestUrl,
      method: normalizedMethod,
      data: body,
      responseType,
      headers: finalHeaders,
      timeout: 300000,
      withCredentials: false,
    })
      .then((response) => {
        if (useCache && normalizedMethod === "GET") {
          responseCache.set(requestKey, {
            timestamp: Date.now(),
            response,
          });
        }
        return response;
      })
      .finally(() => {
        inFlightRequests.delete(requestKey);
      });

    if (dedupe) inFlightRequests.set(requestKey, requestPromise);

    return requestPromise as Promise<T>;
  } catch (e: unknown) {
    const err = e as {
      response?: { status?: number; data?: { message?: string } };
    };
    if (!(silentNotFound && err.response?.status === 404)) {
      console.error("API call failed:", e);
    }
    if (err.response?.status === 401 && requiresAuth && typeof window !== "undefined") {
      const { logout } = await import("@/legacy/utils/authUtils");
      logout();
      window.location.href = "/login";
      return;
    }
    throw e instanceof Error
      ? e
      : new Error(err.response?.data?.message || "API CALL Failed");
  }
}
