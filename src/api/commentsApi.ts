import api from "./axios";

const commentsUrl = "/comments";

export const getAllCommentsByPostId = (postId: number) => {
  return api.get(`${commentsUrl}/${postId}`);
};

export const createComment = (data: { content: string; postId: number }) => {
  return api.post(`${commentsUrl}`, data);
};
