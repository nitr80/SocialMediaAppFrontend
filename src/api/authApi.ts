import api from "./axios";
import axiosPublic from "./axiosPublic";

export const register = (data: {
  username: string;
  email: string;
  password: string;
}) => {
  return api.post("/Auth/Register", data);
};

export const login = (data: { username: string; password: string }) => {
  return api.post("/Auth/Login", data);
};

export const refresh = (data: { refreshToken: string }) => {
  return axiosPublic.post("/Auth/Refresh", data);
};

export const logout = () => {
  return api.post("/Auth/Logout");
};
