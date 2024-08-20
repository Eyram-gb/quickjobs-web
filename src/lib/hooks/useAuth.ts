import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";

export function useAuth() {
  const { user, isAuthenticated, login, logout } = useAuthStore();

  useEffect(() => {
    const checkAuth = async () => {
      if (!isAuthenticated) {
        try {
          const response = await fetch("/api/user");
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
  }, [isAuthenticated, login]);

  return { user, isAuthenticated, login, logout };
}
