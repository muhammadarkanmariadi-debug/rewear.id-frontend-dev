/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { Mail, Lock, LogIn } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";
import { useLogin } from "@/hooks/api/use-auth";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const { mutate: login, isPending: loading } = useLogin();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    login({ email, password }, {
      onSuccess: (res) => {
        useAuthStore.getState().setAuth(res.data.user, res.data.token);

        // Cek jika ada callbackUrl di query string
        const search = window.location.search;
        const urlParams = new URLSearchParams(search);
        const callbackUrl = urlParams.get("callbackUrl");

        if (callbackUrl && callbackUrl.startsWith("/")) {
          router.push(callbackUrl);
          return;
        }

        // Jika tidak ada callbackUrl, arahkan sesuai peran default
        if (res.data.user?.is_admin) {
          router.push("/admin");
        } else if (res.data.user?.is_seller && res.data.user?.is_seller_verified) {
          router.push("/dashboard");
        } else {
          router.push("/");
        }
      },
      onError: (err: any) => {
        setError(err.message || "Gagal masuk. Periksa kembali detail Anda.");
      }
    });
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
        <Input
          id="email"
          type="email"
          label="Email"
          icon={<Mail className="h-4 w-4" />}
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="nama@email.com"
          disabled={loading}
        />

        {/* Password Input */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-foreground/80" htmlFor="password">Kata Sandi</label>
            <Link href="/forgot-password" className="text-xs font-semibold text-primary hover:underline">
              Lupa Sandi?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            icon={<Lock className="h-4 w-4" />}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            disabled={loading}
          />
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

   

      <div className="mt-6 text-center text-sm text-muted-foreground">
        Belum punya akun?{" "}
        <Link href="/register" className="font-semibold text-primary hover:underline">
          Daftar Sekarang
        </Link>
      </div>
    </>
  );
}

