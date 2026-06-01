"use client"; // Hanya komponen ini yang bertindak di sisi client

import { useAuthStore } from "@/stores";
import { useEffect } from "react";


export default function AuthProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Memaksa zustand mengambil data dari localStorage saat di browser
    useAuthStore.persist.rehydrate();
  }, []);

  return <>{children}</>;
}