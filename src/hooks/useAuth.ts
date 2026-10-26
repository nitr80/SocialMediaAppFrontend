import { useCallback } from "react";
import { logout as logoutApi, register as registerApi } from "../api/authApi";
import { login as loginApi } from "../api/authApi";
import { useAuthStore } from "../store/authStore";

export const useAuth = () => {
  const { accessToken: token, user, setAuth, logout } = useAuthStore();

  const register = useCallback(
    async (username: string, email: string, password: string) => {
      const res = await registerApi({ username, email, password });

      setAuth(res.data.accessToken, res.data.refreshToken, res.data.user);
    },
    [setAuth],
  );

  const login = useCallback(
    async (username: string, password: string) => {
      const res = await loginApi({ username, password });

      setAuth(res.data.accessToken, res.data.refreshToken, res.data.user);
    },
    [setAuth],
  );

  const logoutAsync = useCallback(async () => {
    await logoutApi();

    logout();
  }, [logout]);

  return { token, user, register, login, logoutAsync };
};
