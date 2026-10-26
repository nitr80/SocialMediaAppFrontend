import api from "./axios";

export const getLiked = (commentId: number) => {
  return api.get<boolean>(`Comments/${commentId}/Likes`);
};

export const getAllLiked = (postId: number) => {
  return api.get<number[]>(`Comments/me/${postId}/Likes`);
};

export const likeComment = (commentId: number) => {
  return api.post<void>(`Comments/${commentId}/Likes`);
};

export const unlikeComment = (commentId: number) => {
  return api.delete<void>(`Comments/${commentId}/Likes`);
};
