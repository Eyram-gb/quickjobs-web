import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { API_BASE_URL } from "../constants";

export function useAuth() {
  const { user, isAuthenticated, login, logout } = useAuthStore();

  useEffect(() => {
    const checkAuth = async () => {
      if (!isAuthenticated) {
        try {
          const response = await fetch(`${API_BASE_URL}/${user?.id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          });
          if (response.ok) {
            const userData = await response.json();
            login(userData);
          }
        } catch (error) {
          console.error("Error checking authentication status:", error);
        }
      }
    };

    checkAuth();
  }, [isAuthenticated, login, user?.id]);

  return { user, isAuthenticated, login, logout };
}
