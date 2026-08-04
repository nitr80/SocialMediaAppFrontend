import { useState } from "react";
import {
  getAllLiked as getAllLikedApi,
  getLiked as getLikedApi,
  likeComment as likeCommentApi,
  unlikeComment as unlikeCommentApi,
} from "../api/commentLikesApi";

export const useCommentLikes = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getLikedComment = async (commentId: number): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const res = await getLikedApi(commentId);
      return res.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to get Liked");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getAllLikedComments = async (postId: number): Promise<number[]> => {
    setLoading(true);
    setError(null);
    try {
      const res = await getAllLikedApi(postId);
      return res.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to get Liked Comments");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const likeComment = async (commentId: number) => {
    setLoading(true);
    setError(null);
    try {
      likeCommentApi(commentId);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to like Comment");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const unlikeComment = async (commentId: number) => {
    setLoading(true);
    setError(null);
    try {
      unlikeCommentApi(commentId);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to like Comment");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { error, loading, getLikedComment, getAllLikedComments, likeComment, unlikeComment };
};
