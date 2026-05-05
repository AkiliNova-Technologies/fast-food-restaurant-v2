import { apiClient } from "@/lib/api-client";

export type LoginPayload = {
  email: string;
  password: string;
};

export type AuthUser = {
  id: number;
  name: string;
  email: string;
  role: "admin" | "staff";
};

export type LoginResponse = {
  token: string;
  user: AuthUser;
};

const TOKEN_KEY = "restaurant_admin_token";
const USER_KEY = "restaurant_admin_user";

export async function login(payload: LoginPayload) {
  const res = await apiClient<LoginResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  localStorage.setItem(TOKEN_KEY, res.data.token);
  localStorage.setItem(USER_KEY, JSON.stringify(res.data.user));

  return res.data;
}

export async function logout() {
  try {
    await apiClient<null>("/api/auth/logout", {
      method: "POST",
      auth: true,
    });
  } finally {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }
}

export async function getCurrentUser() {
  const res = await apiClient<AuthUser>("/api/auth/me", {
    auth: true,
  });

  return res.data;
}

export function getStoredUser(): AuthUser | null {
  if (typeof window === "undefined") return null;

  const user = localStorage.getItem(USER_KEY);

  if (!user) return null;

  try {
    return JSON.parse(user) as AuthUser;
  } catch {
    return null;
  }
}

export function getStoredToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}