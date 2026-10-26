import { useCallback, useState } from "react";
import {
  followUser as followUserApi,
  getFollowingStatus as getFollowingStatusApi,
  unfollowUser as unfollowUserApi,
} from "../api/followsApi";
import { isAxiosError } from "axios";

export const useFollows = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const followUser = useCallback(async (userId: number) => {
    setLoading(true);
    setError(null);
    try {
      await followUserApi(userId);
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to Follow the User");
      } else {
        setError("Failed to Follow the User");
      }
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const unfollowUser = useCallback(async (userId: number) => {
    setLoading(true);
    setError(null);
    try {
      await unfollowUserApi(userId);
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to Unfollow the User");
      } else {
        setError("Failed to Unfollow the User");
      }
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getFollowingStatus = useCallback(
    async (userId: number): Promise<boolean> => {
      setLoading(true);
      setError(null);
      try {
        const res = await getFollowingStatusApi(userId);
        return res.data;
      } catch (err: unknown) {
        if (isAxiosError(err)) {
          setError(
            err.response?.data?.message || "Failed to get Following Status",
          );
        } else {
          setError("Failed to get Following Status");
        }
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return { error, loading, followUser, unfollowUser, getFollowingStatus };
};
