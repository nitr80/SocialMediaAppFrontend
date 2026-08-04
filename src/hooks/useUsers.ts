import { useState } from "react";
import {
  addOrUpdateBio as addOrUpdateBioApi,
  addOrUpdateProfilePicture as addOrUpdateProfilePictureApi,
  getUserById as getUserByIdApi,
} from "../api/usersApi";
import type { User } from "../types/user";
import type { Bio } from "../types/bio";

export const useUsers = () => {
  const [userError, setError] = useState<string | null>(null);
  const [userLoading, setLoading] = useState<boolean>(false);

  const getUserById = async (id: number): Promise<User | null> => {
    setError(null);
    setLoading(true);
    try {
      const res = await getUserByIdApi(id);
      return res.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to get user");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const addOrUpdateBio = async (bio: Bio) => {
    setError(null);
    try { 
      await addOrUpdateBioApi(bio);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update bio");
    }
  };

  const addOrUpdateProfilePicture = async (image: FormData) => 
  {
    setError(null);
    try { 
      await addOrUpdateProfilePictureApi(image);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update profile picture");
    }
  }

  return { userError, userLoading, getUserById, addOrUpdateBio, addOrUpdateProfilePicture };
};
