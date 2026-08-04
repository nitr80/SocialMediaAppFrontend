import type { Bio } from "../types/bio";
import api from "./axios";

const usersUrl = "/users";

export const getUserById = (id: number) => {
  return api.get(`${usersUrl}/${id}`);
};

export const addOrUpdateBio = (bio: Bio) => {
  api.patch(`${usersUrl}/update-bio`, bio);
};

export const addOrUpdateProfilePicture = (image: FormData) => {
  api.patch(`${usersUrl}/update-profile-picture`, image);
};
