import { create } from "zustand";
import type { User } from "../types/user";
import { persist } from "zustand/middleware";
import { refreshToken } from "../api/authService";

interface AuthStore {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;

  setAuth: (accessToken: string, refreshToken: string, user: User) => void;

  updateTokens: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      user: null,

      setAuth: (accessToken, refreshToken, user) =>
        set({ accessToken, refreshToken, user }),

      updateTokens: (accessToken: string, refreshToken: string) =>
        set({ accessToken, refreshToken }),

      logout: () => set({ accessToken: null, refreshToken: null, user: null }),
    }),
    {
      name: "auth-storage",
    },
  ),
);
