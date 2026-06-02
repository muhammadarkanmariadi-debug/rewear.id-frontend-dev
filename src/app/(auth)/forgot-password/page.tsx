/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { Mail, Send } from "lucide-react";
import { useState } from "react";
import { useForgotPassword } from "@/hooks/api/use-auth";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const { mutate: forgotPassword, isPending: loading } = useForgotPassword();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    forgotPassword(email, {
      onSuccess: () => {
        setSuccess(true);
      },
      onError: (err: any) => {
        setError(err.message || "Gagal mengirim link reset kata sandi.");
      }
    });
  };

  if (success) {
    return (
      <div className="text-center space-y-4 py-8">
        <h2 className="text-2xl font-bold text-green-500">Tautan Terkirim!</h2>
        <p className="text-sm text-muted-foreground">
          Silakan periksa kotak masuk (atau folder spam) untuk email yang berisi tautan reset kata sandi Anda.
        </p>
        <div className="pt-4">
          <Link href="/login" className="text-primary hover:underline font-semibold">
            Kembali ke Halaman Masuk
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mb-6 text-center">
        <h2 className="text-xl font-bold">Lupa Kata Sandi?</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Masukkan email yang Anda gunakan saat mendaftar, kami akan mengirimkan link reset sandi.
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {error && (
          <div className="p-3 text-sm font-medium text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg">
            {error}
          </div>
        )}
        
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

        <button 
          type="submit"
          disabled={loading}
          className="inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 disabled:opacity-50"
        >
          {loading ? "Mengirim..." : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Kirim Tautan Reset
            </>
          )}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-muted-foreground">
        Ingat kata sandi Anda?{" "}
        <Link href="/login" className="font-semibold text-primary hover:underline">
          Masuk di Sini
        </Link>
      </div>
    </>
  );
}
