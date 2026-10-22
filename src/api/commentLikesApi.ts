import api from "./axios";

export const getLiked = (commentId: number) => {
  return api.get(`Comments/${commentId}/Likes`);
};

export const getAllLiked = (postId: number) => {
  return api.get(`Comments/me/${postId}/Likes`);
};

export const likeComment = (commentId: number) => {
    return api.post(`Comments/${commentId}/Likes`)
};

export const unlikeComment = (commentId: number) => {
    return api.delete(`Comments/${commentId}/Likes`)
};
