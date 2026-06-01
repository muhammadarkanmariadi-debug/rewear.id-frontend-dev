"use client";

import Link from "next/link";
import { CheckCircle2, XCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { authService } from "@/services";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function VerifyEmailLogic() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const searchParams = useSearchParams();
  
  const uId = searchParams.get("id");
  const uHash = searchParams.get("hash");
  const expires = searchParams.get("expires");
  const signature = searchParams.get("signature");

  useEffect(() => {
    if (!uId || !uHash || !expires || !signature) {
      setError("Tautan verifikasi tidak lengkap.");
      setLoading(false);
      return;
    }

    const verify = async () => {
       try {
         const res = await authService.verifyEmail(uId, uHash, {
           expires,
           signature
         });
         
         if (res.status) {
           setSuccess(true);
         } else {
           setError(res.message || "Verifikasi gagal atau link sudah kedaluwarsa.");
         }
       } catch (err) {
         setError("Terjadi kesalahan pada server saat memverifikasi tautan.");
       } finally {
         setLoading(false);
       }
    };

    verify();
  }, [uId, uHash, expires, signature]);

  if (loading) {
     return (
       <div className="text-center space-y-4 py-8">
         <h2 className="text-xl font-bold">Sedang Memverifikasi...</h2>
         <p className="text-sm text-muted-foreground animate-pulse">Mohon tunggu sebentar sementara kami memvalidasi tautan Anda.</p>
       </div>
     );
  }

  if (success) {
    return (
      <div className="text-center space-y-4 py-8">
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
        <h2 className="text-2xl font-bold text-green-500">Email Berhasil Diverifikasi!</h2>
        <p className="text-sm text-muted-foreground">
          Terima kasih, akun Anda kini sudah aktif sepenuhnya. Anda sekarang bisa mulai menikmati layanan Escrow.
        </p>
        <div className="pt-4">
          <Link href="/dashboard" className="text-primary hover:underline font-semibold block mb-2">
            Masuk ke Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center space-y-4 py-8">
      <XCircle className="w-16 h-16 text-red-500 mx-auto" />
      <h2 className="text-2xl font-bold text-red-500">Gagal Memverifikasi</h2>
      <p className="text-sm text-muted-foreground">
        {error}
      </p>
      <div className="pt-4">
          <Link href="/login" className="text-primary hover:underline font-semibold text-sm">
            Kembali ke Halaman Masuk
          </Link>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="text-center p-8">Memuat halaman...</div>}>
      <VerifyEmailLogic />
    </Suspense>
  )
}
