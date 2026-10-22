import api from "./axios";

export const getAllCommentsByPostId = (postId: number) => {
  return api.get(`/Posts/${postId}/Comments`);
};

export const createComment = (data: { content: string}, postId: number) => {
  return api.post(`/Posts/${postId}/Comments`, data);
};
