import api from "./axios";

export const getLiked = (postId: number) => {
    return api.get(`/Posts/${postId}/Likes`);
}

export const getAllLiked = () => {
    return api.get(`/Posts/me/Likes`);
}

export const likePost = (postId: number) => {
    return api.post(`/Posts/${postId}/Likes`);
}

export const unlikePost = (postId: number) => {
    return api.delete(`/Posts/${postId}/Likes`);
}