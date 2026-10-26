import { useCallback, useState } from "react";
import {
  followUser as followUserApi,
  getFollowingStatus as getFollowingStatusApi,
  unfollowUser as unfollowUserApi,
} from "../api/followsApi";
import { getErrorMessage } from "../utils/errorUtils";

export const useFollows = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const followUser = useCallback(async (userId: number) => {
    setLoading(true);
    setError(null);
    try {
      await followUserApi(userId);
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Failed to Follow the User"));
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
      setError(getErrorMessage(err, "Failed to Unfollow the User"));
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
        setError(getErrorMessage(err, "Failed to get Following Status"));
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return { error, loading, followUser, unfollowUser, getFollowingStatus };
};
