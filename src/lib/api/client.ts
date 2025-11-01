import { getAccessToken } from "@/actions/auth";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

type ApiError = {
  message: string | string[];
  error: string;
  statusCode: number;
};

type ApiResponse<T> = {
  data: T;
  statusCode: number;
  message: string;
  timestamp: string;
  meta?: Record<string, any>;
};

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<ApiResponse<T>> {
  try {
    const token = await getAccessToken();

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (options.headers) {
      const customHeaders = new Headers(options.headers);
      customHeaders.forEach((value, key) => {
        headers[key] = value;
      });
    }

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const contentType = response.headers.get("content-type") || "";
    const isJson = contentType.includes("application/json");
    const rawData = isJson ? await response.json() : await response.text();

    if (!response.ok) {
      const err: ApiError = {
        message: rawData?.message || "Unknown error",
        error: rawData?.error || response.statusText,
        statusCode: rawData?.statusCode || response.status,
      };
      throw err;
    }

    return {
      data: rawData.data ?? rawData,
      statusCode: rawData.statusCode ?? response.status,
      message: rawData.message ?? "Success",
      timestamp: rawData.timestamp ?? new Date().toISOString(),
      meta: rawData.meta,
    };
  } catch (error: any) {
    if (error?.statusCode) {
      throw error;
    }

    throw {
      message: "Connection to the server failed.",
      error: error instanceof Error ? error.message : "Unknown error",
      statusCode: 500,
    } as ApiError;
  }
}

export async function apiFetchClient<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      credentials: "include",
      ...options,
    });

    const contentType = response.headers.get("content-type") || "";
    const isJson = contentType.includes("application/json");
    const rawData = isJson ? await response.json() : await response.text();

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      }

      const err: ApiError = {
        message: rawData?.message || "Unknown error",
        error: rawData?.error || response.statusText,
        statusCode: rawData?.statusCode || response.status,
      };
      throw err;
    }

    return {
      data: rawData.data ?? rawData,
      statusCode: rawData.statusCode ?? response.status,
      message: rawData.message ?? "Success",
      timestamp: rawData.timestamp ?? new Date().toISOString(),
      meta: rawData.meta,
    };
  } catch (error: any) {
    if (error?.statusCode) {
      throw error;
    }
    throw {
      message: "Connection to the server failed.",
      error: error instanceof Error ? error.message : "Unknown error",
      statusCode: 500,
    } as ApiError;
  }
}
