/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Lock, Save } from "lucide-react";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useResetPassword } from "@/hooks/api/use-auth";

function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  useEffect(() => {
    if (!token || !email) {
      // eslint-disable-next-line
      setError("Tautan reset tidak valid. Pastikan Anda membuka link dari email secara utuh.");
    }
  }, [token, email]);

  const { mutate: resetPassword, isPending: loading } = useResetPassword();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !email) return;

    if (password !== confirmPassword) {
      return setError("Kata sandi dan konfirmasi sandi tidak cocok.");
    }

    setError("");

    resetPassword({
      email,
      token,
      password,
      password_confirmation: confirmPassword
    }, {
      onSuccess: () => {
        setSuccess(true);
        setTimeout(() => router.push("/login"), 3000);
      },
      onError: (err: any) => {
        setError(err.message || "Gagal mereset kata sandi.");
      }
    });
  };

  if (success) {
    return (
      <div className="text-center space-y-4 py-8">
        <h2 className="text-2xl font-bold text-green-500">Berhasil!</h2>
        <p className="text-sm text-muted-foreground">
          Kata sandi berhasil direset. Silakan masuk menggunakan kata sandi yang baru.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-6 text-center">
        <h2 className="text-xl font-bold">Ubah Kata Sandi</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Silakan buat kata sandi baru untuk akun Anda.
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {error && (
          <div className="p-3 text-sm font-medium text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg">
            {error}
          </div>
        )}
        
        <div className="space-y-1.5">
          <label className="text-sm font-medium" htmlFor="password">Kata Sandi Baru</label>
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
              placeholder="Minimal 8 karakter" 
              disabled={loading || !token || !email}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium" htmlFor="confirm-password">Konfirmasi Sandi Baru</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
              <Lock className="h-4 w-4" />
            </div>
            <input 
              id="confirm-password" 
              type="password" 
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm ring-offset-background disabled:cursor-not-allowed disabled:opacity-50" 
              placeholder="Ketik ulang kata sandi baru" 
              disabled={loading || !token || !email}
            />
          </div>
        </div>

        <button 
          type="submit"
          disabled={loading || !token || !email}
          className="inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 disabled:opacity-50"
        >
          {loading ? "Menyimpan..." : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Simpan Kata Sandi
            </>
          )}
        </button>
      </form>
    </>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="text-center p-8">Memuat halaman...</div>}>
      <ResetPasswordForm />
    </Suspense>
  )
}
