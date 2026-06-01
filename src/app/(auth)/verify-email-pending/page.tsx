import Link from "next/link";
import { MailCheck } from "lucide-react";

export default function VerifyEmailPendingPage() {
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
      
      <div className="pt-6">
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
