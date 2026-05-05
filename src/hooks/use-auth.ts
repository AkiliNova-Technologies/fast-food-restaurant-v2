"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  getCurrentUser,
  getStoredToken,
  getStoredUser,
  logout,
  type AuthUser,
} from "@/services/api/auth";

export function useAuthGuard() {
  const router = useRouter();

  const [user, setUser] = useState<AuthUser | null>(getStoredUser());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function verifyAuth() {
      const token = getStoredToken();

      if (!token) {
        router.replace("/login");
        return;
      }

      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch {
        await logout();
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    }

    verifyAuth();
  }, [router]);

  return {
    user,
    loading,
  };
}