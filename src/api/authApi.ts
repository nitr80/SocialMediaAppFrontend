import api from "./axios";
import axiosPublic from "./axiosPublic";

export const register = (data: {
  username: string;
  email: string;
  password: string;
}) => {
  return api.post("/auth/register", data);
};

export const login = (data: { username: string; password: string }) => {
  return api.post("/auth/login", data);
};

export const refresh = (data: { refreshToken: string }) => {
  return axiosPublic.post("/auth/refresh", data);
};

export const logout = () => {
  return api.post("/auth/logout");
};
