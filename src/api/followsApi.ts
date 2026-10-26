import api from "./axios";

export const followUser = (userId: number) => {
  return api.post(`/Users/${userId}/Follows`);
};

export const unfollowUser = (userId: number) => {
  return api.delete(`/Users/${userId}/Follows`);
};

export const getFollowingStatus = (userId: number) => {
  return api.get(`/Users/${userId}/Follows/status`);
};
