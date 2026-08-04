import {
  logout as logoutApi,
  refresh as refreshApi,
  register as registerApi,
} from "../api/authApi";
import { login as loginApi } from "../api/authApi";
import { useAuthStore } from "../store/authStore";

export const useAuth = () => {
  const { accessToken: token, user, setAuth, logout } = useAuthStore();

  const register = async (
    username: string,
    email: string,
    password: string,
  ) => {
    const res = await registerApi({ username, email, password });

    // console.log(res.data);
    // localStorage.setItem("token", res.data.accessToken);
    // localStorage.setItem("refreshToken", res.data.refreshToken);
    setAuth(res.data.accessToken, res.data.refreshToken, res.data.user);
  };

  const login = async (username: string, password: string) => {
    const res = await loginApi({ username, password });

    // localStorage.setItem("token", res.data.accessToken);
    // localStorage.setItem("refreshToken", res.data.refreshToken);
    setAuth(res.data.accessToken, res.data.refreshToken, res.data.user);
  };

  // const refresh = async (refreshToken: string | null) => {
  //   const res = await refreshApi({ refreshToken });

  //   localStorage.setItem("token", res.data.accessToken);
  //   localStorage.setItem("refreshToken", res.data.refreshToken);
  //   setAuth(res.data.accessToken, res.data.refreshToken, res.data.user);
  // };

  const logoutAsync = async () => {
    await logoutApi();

    logout();
  };

  return { token, user, register, login, logoutAsync };
};
