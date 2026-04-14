import api from "./axios";

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

