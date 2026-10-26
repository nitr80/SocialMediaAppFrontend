import api from "./axios";
import type { Post } from "../types/post";

const postsUrl = "/posts";

export const getPostById = (id: number) => {
  return api.get<Post>(`${postsUrl}/${id}`);
};

export const getAllPosts = () => {
  return api.get<Post[]>(postsUrl);
};

export const createPost = (data: { content: string }) => {
  api.post(postsUrl, data);
};

export const deletePost = (id: number) => {
  return api.delete<void>(`${postsUrl}/${id}`);
};
