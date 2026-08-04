import api from "./axios";

const commentLikesUrl = "/commentLikes";

export const getLiked = (commentId: number) => {
  return api.get(`${commentLikesUrl}/liked/${commentId}`);
};

export const getAllLiked = (postId: number) => {
  return api.get(`${commentLikesUrl}/${postId}/liked`);
};

export const likeComment = (commentId: number) => {
    return api.post(`${commentLikesUrl}/like/${commentId}`)
};

export const unlikeComment = (commentId: number) => {
    return api.post(`${commentLikesUrl}/unlike/${commentId}`)
};
