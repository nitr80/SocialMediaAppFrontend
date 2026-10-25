import { useState } from "react";
import { useCallback } from "react";
import {
  getAllLiked as getAllLikedApi,
  getLiked as getLikedApi,
  likeComment as likeCommentApi,
  unlikeComment as unlikeCommentApi,
} from "../api/commentLikesApi";
import { isAxiosError } from "axios";

export const useCommentLikes = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getLikedComment = useCallback(
    async (commentId: number): Promise<boolean> => {
      setLoading(true);
      setError(null);
      try {
        const res = await getLikedApi(commentId);
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
    },
    [],
  );

  const getAllLikedComments = useCallback(
    async (postId: number): Promise<number[]> => {
      setLoading(true);
      setError(null);
      try {
        const res = await getAllLikedApi(postId);
        return res.data;
      } catch (err: unknown) {
        if (isAxiosError(err)) {
          setError(
            err.response?.data?.message || "Failed to get Liked Comments",
          );
        } else {
          setError("Failed to get Liked Comments");
        }
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const likeComment = useCallback(async (commentId: number) => {
    setLoading(true);
    setError(null);
    try {
      await likeCommentApi(commentId);
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to like Comment");
      } else {
        setError("Failed to like Comment");
      }
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const unlikeComment = useCallback(async (commentId: number) => {
    setLoading(true);
    setError(null);
    try {
      await unlikeCommentApi(commentId);
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to unlike Comment");
      } else {
        setError("Failed to unlike Comment");
      }
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    error,
    loading,
    getLikedComment,
    getAllLikedComments,
    likeComment,
    unlikeComment,
  };
};
