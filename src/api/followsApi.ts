import api from "./axios";

export const followUserApi = (userId: number) => {
    return api.post(`/Users/${userId}/Follows`);
}

export const unfollowUserApi = (userId: number) => {
    return api.delete(`/Users/${userId}/Follows`);
}

export const getFollowingStatusApi = (userId: number) => {
    return api.get(`/Users/${userId}/Follows/status`);
}