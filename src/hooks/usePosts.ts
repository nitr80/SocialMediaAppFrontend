import { useCallback, useState } from "react";
import { getAllPosts as getAllPostsApi } from "../api/postsApi";
import { createPost as createPostApi } from "../api/postsApi";
import { getPostById as getPostByIdApi } from "../api/postsApi";
import type { Post } from "../types/post";
import { getErrorMessage } from "../utils/errorUtils";

export const usePosts = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const loadAllPosts = useCallback(async (): Promise<Post[]> => {
    setLoading(true);
    setError(null);
    try {
      const res = await getAllPostsApi();

      return res.data;
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Failed to load posts"));

      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const createPost = useCallback(async (content: string) => {
    setLoading(true);
    setError(null);
    try {
      await createPostApi({ content });
      // return res.data;
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Failed to create post"));
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getPostById = useCallback(async (id: number): Promise<Post> => {
    setLoading(true);
    setError(null);
    try {
      const res = await getPostByIdApi(id);
      return res.data;
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Failed to get the post"));
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { error, loading, loadAllPosts, createPost, getPostById };
};
