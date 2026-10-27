import { beforeEach, describe, expect, it } from "vitest";
import { useAuthStore } from "./authStore";
import type { User } from "../types/user";

describe("authStore", () => {
  beforeEach(() => {
    localStorage.clear();
    useAuthStore.setState({
      accessToken: null,
      refreshToken: null,
      user: null,
    });
  });

  it("setAuth sets tokens and user", () => {
    const user: User = { id: 1, username: "test", email: "test@test.com" };
    useAuthStore.getState().setAuth("access", "refresh", user);
    const state = useAuthStore.getState();
    expect(state.accessToken).toBe("access");
    expect(state.refreshToken).toBe("refresh");
    expect(state.user).toEqual(user);
  });

  it("updateTokens updates only tokens", () => {
    const user: User = { id: 2, username: "u", email: "e" };
    useAuthStore.getState().setAuth("a1", "r1", user);
    useAuthStore.getState().updateTokens("a2", "r2");
    const state = useAuthStore.getState();
    expect(state.accessToken).toBe("a2");
    expect(state.refreshToken).toBe("r2");
    expect(state.user).toEqual(user);
  });

  it("logout clears tokens and user", () => {
    const user: User = { id: 3, username: "u2", email: "e2" };
    useAuthStore.getState().setAuth("a", "r", user);
    useAuthStore.getState().logout();
    const state = useAuthStore.getState();
    expect(state.accessToken).toBeNull();
    expect(state.refreshToken).toBeNull();
    expect(state.user).toBeNull();
  });
});
