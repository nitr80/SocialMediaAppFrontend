import api from "./axios";

const likesUrl = "/likes";

export const getLiked = (postId: number) => {
    return api.get(`${likesUrl}/liked/${postId}`);
}

export const getAllLiked = () => {
    return api.get(`${likesUrl}/liked`);
}

export const likePost = (postId: number) => {
    return api.post(`${likesUrl}/like/${postId}`);
}

export const unlikePost = (postId: number) => {
    return api.post(`${likesUrl}/unlike/${postId}`);
}