import type { Bio } from "../types/bio";
import api from "./axios";

const usersUrl = "/Users";

export const getUserById = (id: number) => {
  return api.get(`${usersUrl}/${id}`);
};

export const addOrUpdateBio = (bio: Bio) => {
  api.patch(`${usersUrl}/me/Bio`, bio);
};

export const addOrUpdateProfilePicture = (image: FormData) => {
  api.patch(`${usersUrl}/me/ProfilePicture`, image);
};

export const searchUsernameApi = (username: string) => {
  return api.get(`${usersUrl}?search=${username}`);
};
