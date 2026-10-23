import { useState } from "react";
import {
  followUserApi,
  getFollowingStatusApi,
  unfollowUserApi,
} from "../api/followsApi";

export const useFollows = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const followUser = async (userId: number) => {
    setLoading(true);
    setError(null);
    try {
      await followUserApi(userId);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to Follow the User");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const unfollowUser = async (userId: number) => {
    setLoading(true);
    setError(null);
    try {
      await unfollowUserApi(userId);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to Unfollow the User");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getFollowingStatus = async (userId: number): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const res = await getFollowingStatusApi(userId);
      return res.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to get Following Status");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { error, loading, followUser, unfollowUser, getFollowingStatus };
};
