import api from "./axios";

const postsUrl = "/posts";

export const getPostById = (id: number) => {
  return api.get(`${postsUrl}/${id}`);
};

export const getAllPosts = () => {
  return api.get(postsUrl);
};

export const createPost = (data: { content: string }) => {
  api.post(postsUrl, data);
};

export const deletePost = (id: number) => {
  return api.delete(`${postsUrl}/${id}`);
};
