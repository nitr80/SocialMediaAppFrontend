import { useState } from "react";
import { getAllPosts as getAllPostsApi } from "../api/postsApi";
import { createPost as createPostApi } from "../api/postsApi";
import { getPostById as getPostByIdApi } from "../api/postsApi";
import type { Post } from "../types/post";

export const usePosts = () => {
  const [postError, setError] = useState<string | null>(null);
  const [postLoading, setLoading] = useState(false);
  const loadAllPosts = async (): Promise<Post[]> => {
    setLoading(true);
    setError(null);
    try {
      const res = await getAllPostsApi();
      return res.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to load posts");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (content: string) => {
    setLoading(true);
    setError(null);
    try {
      await createPostApi({ content });
      // return res.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create post");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getPostById = async (id: number): Promise<Post> => {
    setLoading(true);
    setError(null);
    try {
      const res = await getPostByIdApi(id);
      return res.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to get the post");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { postError, postLoading, loadAllPosts, createPost, getPostById };
};
