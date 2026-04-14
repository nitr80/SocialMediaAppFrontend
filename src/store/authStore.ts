import { create } from "zustand";
import type { User } from "../types/user";

interface AuthStore {
  token: string | null;
  user: User | null;

  setAuth: (token: string, user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  token: null,
  user: null,

  setAuth: (token, user) => set({ token, user }),

  logout: () => set({ token: null, user: null }),
}));
