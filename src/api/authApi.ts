import api from "./axios";
import axiosPublic from "./axiosPublic";
import type {
  AuthResponse,
  LoginRequest,
  RefreshRequest,
  RefreshResponse,
  RegisterRequest,
} from "../types/auth";

export const register = (data: RegisterRequest) => {
  return api.post<AuthResponse>("/Auth/Register", data);
};

export const login = (data: LoginRequest) => {
  return api.post<AuthResponse>("/Auth/Login", data);
};

export const refresh = (data: RefreshRequest) => {
  return axiosPublic.post<RefreshResponse>("/Auth/Refresh", data);
};

export const logout = () => {
  return api.post<void>("/Auth/Logout");
};
