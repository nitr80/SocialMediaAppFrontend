import api from "./axios";
import type { Post } from "../types/post";
import type { PagedList } from "../types/pagedList";

interface getAllPostsParams {
  limit: number;
  cursor: string | null;
}

const postsUrl = "/posts";

export const getPostById = (id: number) => {
  return api.get<Post>(`${postsUrl}/${id}`);
};

export const getAllPosts = (limit: number, cursor: string | null) => {
  const params: getAllPostsParams = {
    limit,
    cursor,
  };

  return api.get<PagedList<Post>>(postsUrl, { params });
};

export const createPost = (data: { content: string }) => {
  api.post(postsUrl, data);
};

export const deletePost = (id: number) => {
  return api.delete<void>(`${postsUrl}/${id}`);
};
