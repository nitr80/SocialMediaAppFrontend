import { useCallback, useState } from "react";
import { getAllCommentsByPostId as getAllCommentsByPostIdApi } from "../api/commentsApi";
import { createComment as createCommentApi } from "../api/commentsApi";
import type { Comment } from "../types/comment";
import { isAxiosError } from "axios";

export const useComments = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const getAllCommentsByPostId = useCallback(
    async (postId: number): Promise<Comment[]> => {
      setLoading(true);
      setError(null);
      try {
        const res = await getAllCommentsByPostIdApi(postId);
        return res.data;
      } catch (err: unknown) {
        if (isAxiosError(err)) {
          setError(err.response?.data?.message || "Failed to load comments");
        } else {
          setError("Failed to load comments");
        }
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const createComment = useCallback(async (content: string, postId: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await createCommentApi({ content }, postId);
      return res.data;
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to create comment");
      } else {
        setError("Failed to create comment");
      }
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { error, loading, getAllCommentsByPostId, createComment };
};
