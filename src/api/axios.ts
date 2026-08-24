import axios from "axios";
import { refreshToken } from "./authService";
import { useAuthStore } from "../store/authStore";

const api = axios.create({
  baseURL: "http://localhost:8080",
  // baseURL: "http://localhost:5226",
  // withCredentials: true,
});

api.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().accessToken;

  if (accessToken && config.headers) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    console.log("Interceptor hit:", error.config.url);
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry && originalRequest.url !== "/auth/refresh") {
      console.log("Trying refresh");
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshToken();

        console.log("Refresh succeeded");

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch {
        // useAuthStore.getState().logout();
        console.log("Refresh failed");
        window.location.href = "/";
      }
    }

    return Promise.reject(error);
  },
);

export default api;
