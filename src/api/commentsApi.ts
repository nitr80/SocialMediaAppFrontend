import api from "./axios";
import type { Comment } from "../types/comment";

export const getAllCommentsByPostId = (postId: number) => {
  return api.get<Comment[]>(`/Posts/${postId}/Comments`);
};

export const createComment = (data: { content: string }, postId: number) => {
  return api.post<Comment>(`/Posts/${postId}/Comments`, data);
};
