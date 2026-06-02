import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware"; // 1. Import persist
import type { User } from "@/entities";
import { authService } from "@/services";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  setAuth: (user: User, token: string) => void;
  setUser: (user: User) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // State awal sekarang cukup set default saja
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: true,

      setAuth: (user, token) => {
        // Tidak perlu manual localStorage.setItem lagi!
        set({ user, token, isAuthenticated: true, isLoading: false });
      },

      setUser: (user) => set({ user }),

      logout: () => {
       
        set({ user: null, token: null, isAuthenticated: false, isLoading: false });
      },

      setLoading: (isLoading) => set({ isLoading }),
    }),
    {
      name: "auth-storage", // Nama kunci di localStorage
      storage: createJSONStorage(() => localStorage), // Menggunakan localStorage

      // Opsional: Jika kamu menggunakan Next.js (SSR), gunakan ini agar tidak error hydration
      skipHydration: true,
    }
  )
);