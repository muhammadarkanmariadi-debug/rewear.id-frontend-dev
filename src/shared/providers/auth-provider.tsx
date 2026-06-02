"use client"; // Hanya komponen ini yang bertindak di sisi client

import { useAuthStore } from "@/stores";
import { createContext, ReactNode, useContext, useEffect } from "react";
import { getCookies } from "@/lib/cookies";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<null>(null);

export default function AuthProvider({ children }: AuthProviderProps) {
  useEffect(() => {
    // Memaksa zustand mengambil data dari localStorage saat di browser
    useAuthStore.persist.rehydrate();

    // Verifikasi apakah token masih ada di cookies (misal tidak expired/terhapus)
    getCookies("token").then((token) => {
      if (!token) {
        useAuthStore.getState().logout();
      }
    });
  }, []);

  return <AuthContext.Provider value={null}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);

