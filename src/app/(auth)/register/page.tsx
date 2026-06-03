/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { User, Mail, Lock, UserPlus } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useRegister } from "@/hooks/api/use-auth";
import { Input } from "@/components/ui/input";

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
        <Input
          id="name"
          type="text"
          label="Nama Lengkap"
          icon={<User className="h-4 w-4" />}
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ahmad Fauzi"
          disabled={loading}
        />

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
        <Input
          id="password"
          type="password"
          label="Kata Sandi"
          icon={<Lock className="h-4 w-4" />}
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Minimal 8 karakter"
          disabled={loading}
        />

        {/* Confirm Password Input */}
        <Input
          id="confirm-password"
          type="password"
          label="Konfirmasi Sandi"
          icon={<Lock className="h-4 w-4" />}
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Ketik ulang kata sandi"
          disabled={loading}
        />

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

