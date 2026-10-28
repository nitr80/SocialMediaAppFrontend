import type { Bio } from "../types/bio";
import type { User } from "../types/user";
import api from "./axios";

const usersUrl = "/Users";

export const getUserById = (id: number) => {
  return api.get<User>(`${usersUrl}/${id}`);
};

export const addOrUpdateBio = (bio: Bio) => {
  api.patch(`${usersUrl}/me/Bio`, bio);
};

export const addOrUpdateProfilePicture = (image: FormData) => {
  return api.patch<string>(`${usersUrl}/me/ProfilePicture`, image);
};

export const searchUsername = (username: string, signal?: AbortSignal) => {
  return api.get<User[]>(`${usersUrl}?search=${username}`, { signal });
};
