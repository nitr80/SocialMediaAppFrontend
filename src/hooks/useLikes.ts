import { useCallback, useState } from "react";
import { likePost as likePostApi } from "../api/likesApi";
import { unlikePost as unlikePostApi } from "../api/likesApi";
import { getLiked as getLikedApi } from "../api/likesApi";
import { getAllLiked as getAllLikedApi } from "../api/likesApi";
import { isAxiosError } from "axios";

export const useLikes = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const likePost = useCallback(async (postId: number) => {
    setLoading(true);
    setError(null);
    try {
      await likePostApi(postId);
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to Like the Post");
      } else {
        setError("Failed to Like the Post");
      }
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const unlikePost = useCallback(async (postId: number) => {
    setLoading(true);
    setError(null);
    try {
      await unlikePostApi(postId);
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to Unlike the Post");
      } else {
        setError("Failed to Unlike the Post");
      }
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getLiked = useCallback(async (postId: number): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const res = await getLikedApi(postId);
      return res.data;
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to get Liked");
      } else {
        setError("Failed to get Liked");
      }
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getAllLiked = useCallback(async (): Promise<number[]> => {
    setLoading(true);
    setError(null);
    try {
      const res = await getAllLikedApi();
      return res.data;
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        setError(
          err.response?.data?.message || "Failed to get All Liked Posts",
        );
      } else {
        setError("Failed to get All Liked Posts");
      }
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, likePost, unlikePost, getLiked, getAllLiked };
};
