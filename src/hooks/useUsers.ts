import { useCallback, useState } from "react";
import {
  addOrUpdateBio as addOrUpdateBioApi,
  addOrUpdateProfilePicture as addOrUpdateProfilePictureApi,
  getUserById as getUserByIdApi,
  searchUsername as searchUsernameApi,
} from "../api/usersApi";
import type { User } from "../types/user";
import type { Bio } from "../types/bio";
import { isAxiosError } from "axios";

export const useUsers = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getUserById = useCallback(async (id: number): Promise<User | null> => {
    setError(null);
    setLoading(true);
    try {
      const res = await getUserByIdApi(id);
      return res.data;
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to get user");
      } else {
        setError("Failed to get user");
      }
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const addOrUpdateBio = useCallback(async (bio: Bio) => {
    setError(null);
    try {
      await addOrUpdateBioApi(bio);
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to update bio");
      } else {
        setError("Failed to update bio");
      }
    }
  }, []);

  const addOrUpdateProfilePicture = useCallback(
    async (image: FormData): Promise<string | null> => {
      setError(null);
      try {
        const res = await addOrUpdateProfilePictureApi(image);
        return res.data;
      } catch (err: unknown) {
        if (isAxiosError(err)) {
          setError(
            err.response?.data?.message || "Failed to update profile picture",
          );
        } else {
          setError("Failed to update profile picture");
        }
        return null;
      }
    },
    [],
  );

  const searchUsername = useCallback(
    async (username: string): Promise<User[] | null> => {
      setError(null);
      setLoading(true);
      try {
        const res = await searchUsernameApi(username);
        return res.data;
      } catch (err: unknown) {
        if (isAxiosError(err)) {
          setError(err.response?.data?.message || "Failed to search username");
        } else {
          setError("Failed to search username");
        }
        return null;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return {
    error,
    loading,
    getUserById,
    addOrUpdateBio,
    addOrUpdateProfilePicture,
    searchUsername,
  };
};
