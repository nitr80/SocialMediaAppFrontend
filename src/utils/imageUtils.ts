import { API_URL } from "../config/env";

export const getProfileImageUrl = (path?: string) => {
  return path ? `${API_URL}${path}` : "/user.png";
};
