import api from "./axios";

const usersUrl = "/users";

export const getUserById = (id: number) => {
  return api.get(`${usersUrl}/${id}`);
};
