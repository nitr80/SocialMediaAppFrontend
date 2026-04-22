import { useState } from "react";
import { getUserById as getUserByIdApi } from "../api/usersApi";
import type { User } from "../types/user";

export const useUsers = () => {
  const [userError, setError] = useState<string | null>(null);
  const [userLoading, setLoading] = useState<boolean>(false);

  const getUserById = async (id: number): Promise<User> => {
    setError(null);
    setLoading(true);
    try {
        const res = await getUserByIdApi(id);
        return res.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to get user");
    } finally {
      setLoading(false);
    }
  };

  return { userError, userLoading, getUserById};
};
