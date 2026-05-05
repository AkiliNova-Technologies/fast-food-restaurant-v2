const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

type ApiOptions = RequestInit & {
  auth?: boolean;
};

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
  errors?: unknown;
};

function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("restaurant_admin_token");
}

function buildUrl(endpoint: string) {
  if (!API_BASE_URL) return endpoint;

  return `${API_BASE_URL.replace(/\/$/, "")}/${endpoint.replace(/^\//, "")}`;
}

export async function apiClient<T>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<ApiResponse<T>> {
  const headers = new Headers(options.headers);

  if (!(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  if (options.auth) {
    const token = getToken();

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
  }

  const response = await fetch(buildUrl(endpoint), {
    ...options,
    headers,
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Something went wrong.");
  }

  return result;
}