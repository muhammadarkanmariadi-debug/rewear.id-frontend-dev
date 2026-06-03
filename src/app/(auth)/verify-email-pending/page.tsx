"use client";

import Link from "next/link";
import { MailCheck, RefreshCcw } from "lucide-react";
import { useResendVerification } from "@/hooks/api/use-auth";

export default function VerifyEmailPendingPage() {
  const { mutate: resend, isPending } = useResendVerification();

  return (
    <div className="text-center space-y-4 py-8">
      <div className="flex justify-center mb-4">
        <MailCheck className="w-16 h-16 text-primary" />
      </div>
      <h2 className="text-2xl font-bold">Periksa Email Anda</h2>
      <p className="text-sm text-muted-foreground max-w-sm mx-auto">
        Tautan verifikasi telah dikirimkan ke alamat email yang Anda daftarkan. 
        Silakan periksa kotak masuk (atau folder spam) dan ikuti petunjuk untuk mengaktifkan akun Anda.
      </p>
      
      <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          onClick={() => resend()}
          disabled={isPending}
          className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? <RefreshCcw className="w-4 h-4 mr-2 animate-spin" /> : null}
          Kirim Ulang Email
        </button>
        <Link 
          href="/login" 
          className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-2 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground"
        >
          Kembali ke Halaman Masuk
        </Link>
      </div>
    </div>
  );
}
