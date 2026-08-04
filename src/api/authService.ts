import { useAuthStore } from "../store/authStore";
import { refresh } from "./authApi";

export async function refreshToken() {
  const refreshToken = useAuthStore.getState().refreshToken;

  // const response = await axios.post("/auth/refresh", {
  //     refreshToken,
  // });

  if (!refreshToken) {
    throw new Error("No refresh token");
  }

  const response = await refresh({ refreshToken });

  useAuthStore
    .getState()
    .updateTokens(response.data.accessToken, response.data.refreshToken);

  return response.data.accessToken;
}
