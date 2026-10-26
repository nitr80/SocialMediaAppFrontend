import api from "./axios";

export const getLiked = (postId: number) => {
  return api.get<boolean>(`/Posts/${postId}/Likes`);
};

export const getAllLiked = () => {
  return api.get<number[]>(`/Posts/me/Likes`);
};

export const likePost = (postId: number) => {
  return api.post<void>(`/Posts/${postId}/Likes`);
};

export const unlikePost = (postId: number) => {
  return api.delete<void>(`/Posts/${postId}/Likes`);
};
