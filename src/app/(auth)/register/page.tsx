/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { User, Mail, Lock, UserPlus } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useRegister } from "@/hooks/api/use-auth";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const { mutate: register, isPending: loading } = useRegister();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError("Kata sandi dan konfirmasi sandi tidak cocok.");
    }

    setError("");

    register({ name, email, password, password_confirmation: confirmPassword }, {
      onSuccess: () => {
        setSuccess(true);
        setTimeout(() => router.push("/verify-email-pending"), 3000);
      },
      onError: (err: any) => {
        setError(err.message || "Gagal mendaftar. Periksa kembali detail Anda.");
      }
    });
  };

  if (success) {
    return (
      <div className="text-center space-y-4 py-8">
        <h2 className="text-2xl font-bold text-green-500">Pendaftaran Berhasil!</h2>
        <p className="text-sm text-muted-foreground">
          Akun Anda telah berhasil dibuat. Silakan pastikan kotak masuk email Anda dan lakukan verifikasi. Anda akan diarahkan ke halaman login...
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-6 text-center">
        <h2 className="text-xl font-bold">Buat Akun Baru</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Bergabunglah bersama ribuan komunitas preloved aman.
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleRegister}>
        {error && (
          <div className="p-3 text-sm font-medium text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg">
            {error}
          </div>
        )}

        {/* Name Input */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium" htmlFor="name">Nama Lengkap</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
              <User className="h-4 w-4" />
            </div>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm ring-offset-background disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Ahmad Fauzi"
              disabled={loading}
            />
          </div>
        </div>

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
          <label className="text-sm font-medium" htmlFor="password">Kata Sandi</label>
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
              disabled={loading}
            />
          </div>
        </div>

        {/* Confirm Password Input */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium" htmlFor="confirm-password">Konfirmasi Sandi</label>
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
              placeholder="Ketik ulang kata sandi"
              disabled={loading}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 disabled:opacity-50 mt-2"
        >
          {loading ? "Mendaftar..." : (
            <>
              <UserPlus className="w-4 h-4 mr-2" />
              Daftar Sekarang
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
        Sudah memiliki akun?{" "}
        <Link href="/login" className="font-semibold text-primary hover:underline">
          Masuk di Sini
        </Link>
      </div>
    </>
  );
}

