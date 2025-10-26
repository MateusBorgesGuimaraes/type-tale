const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      next: {
        revalidate: 300,
        ...options.next,
      },
      ...options,
    });

    const contentType = response.headers.get("content-type") || "";
    const isJson = contentType.includes("application/json");
    const rawData = isJson ? await response.json() : await response.text();

    if (!response.ok) {
      const err: ApiError = {
        message: rawData?.message || "Erro desconhecido",
        error: rawData?.error || response.statusText,
        statusCode: rawData?.statusCode || response.status,
      };
      throw err;
    }

    return {
      data: rawData.data ?? rawData,
      meta: rawData.meta,
      message: rawData.message ?? "Success",
      statusCode: rawData.statusCode ?? response.status,
      timestamp: rawData.timestamp,
    };
  } catch (error) {
    if (error instanceof Error && "statusCode" in error) {
      throw error;
    }
    throw {
      message: "Falha na conexão com o servidor",
      error: error instanceof Error ? error.message : "Unknown error",
      statusCode: 500,
    } as ApiError;
  }
}
