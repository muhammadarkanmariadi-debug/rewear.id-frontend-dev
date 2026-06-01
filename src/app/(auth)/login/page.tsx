"use client";

import Link from "next/link";
import { Mail, Lock, LogIn } from "lucide-react";
import { useState } from "react";
import { authService } from "@/services";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await authService.login(email, password);
    
      if (res.status) {
        useAuthStore.getState().setAuth(res.data.user, res.data.token);
        router.push("/dashboard");

      } else {
        setError(res.message || "Gagal masuk. Periksa kembali detail Anda.");
      }
    } catch (err) {
      setError("Terjadi kesalahan pada server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mb-6 text-center">
        <h2 className="text-xl font-bold">Selamat Datang Kembali</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Lanjutkan pencarian fashion andalanmu.
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleLogin}>
        {error && (
          <div className="p-3 text-sm font-medium text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg">
            {error}
          </div>
        )}
        
        {/* Email Input */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium" htmlFor="email">Email</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
              <Mail className="h-4 w-4" />
            </div>
            <input 
              id="email" 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm ring-offset-background disabled:cursor-not-allowed disabled:opacity-50" 
              placeholder="nama@email.com" 
              disabled={loading}
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium" htmlFor="password">Kata Sandi</label>
            <Link href="/forgot-password" className="text-xs font-semibold text-primary hover:underline">
              Lupa Sandi?
            </Link>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
              <Lock className="h-4 w-4" />
            </div>
            <input 
              id="password" 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm ring-offset-background disabled:cursor-not-allowed disabled:opacity-50" 
              placeholder="••••••••" 
              disabled={loading}
            />
          </div>
        </div>

        <button 
          type="submit"
          disabled={loading}
          className="inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 disabled:opacity-50"
        >
          {loading ? "Memproses..." : (
            <>
              <LogIn className="w-4 h-4 mr-2" />
              Masuk Sekarang
            </>
          )}
        </button>
      </form>

      <div className="mt-6 flex items-center justify-center space-x-2 text-sm text-muted-foreground">
        <span className="h-px w-full bg-border"></span>
        <span className="px-2">Atau</span>
        <span className="h-px w-full bg-border"></span>
      </div>

      <div className="mt-6">
        <button 
          type="button"
          disabled={loading}
          className="inline-flex w-full items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground disabled:opacity-50"
        >
          Lanjutkan dengan Google
        </button>
      </div>

      <div className="mt-6 text-center text-sm text-muted-foreground">
        Belum punya akun?{" "}
        <Link href="/register" className="font-semibold text-primary hover:underline">
          Daftar Sekarang
        </Link>
      </div>
    </>
  );
}

