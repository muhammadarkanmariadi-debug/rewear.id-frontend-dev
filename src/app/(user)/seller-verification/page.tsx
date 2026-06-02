/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle2, Clock, Camera, AlertCircle } from "lucide-react";
import Link from "next/link";
import { userService } from "@/services";
import { toast } from "sonner";
import { useProfileSettings } from "@/shared/hooks/use-profile-settings";
import { CldUploadWidget } from "next-cloudinary";

export default function SellerVerificationPage() {
  const router = useRouter();
  const { user, loading, fetchData } = useProfileSettings();
  const [isUploading, setIsUploading] = useState(false);
  const [ktpImageUrl, setKtpImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && user?.is_seller_verified) {
      toast.success("Akun seller Anda sudah terverifikasi!");
      router.push("/dashboard");
    }
  }, [loading, user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ktpImageUrl) return toast.warning("Pilih foto KTP terlebih dahulu.");

    setIsUploading(true);
    try {
      const payload = { ktp_image_url: ktpImageUrl };

      const res = await userService.updateProfile(payload);
      if (res.status) {
        toast.success(res.message || "KTP berhasil diunggah.");
        router.push("/settings");
        fetchData();
      } else {
        toast.error(res.message || "Gagal mengunggah KTP.");
      }
    } catch (err: any) {
      toast.error(err.message || "Terjadi kesalahan sistem.");
    } finally {
      setIsUploading(false);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto space-y-8 py-8">
      <div>
        <Link href="/settings" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Pengaturan
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Verifikasi Akun Seller</h1>
        <p className="text-muted-foreground mt-1">Langkah terakhir untuk mulai berjualan di rewear.id.</p>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 shadow-sm overflow-hidden relative">
        {user?.is_seller_verified ? (
          <div className="text-center py-12 space-y-4">
            <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold">Seller Terverifikasi</h2>
            <p className="text-muted-foreground max-w-sm mx-auto">Selamat! Akun Anda sudah terverifikasi. Anda sudah bisa mulai menjual produk Anda.</p>
            <div className="pt-6">
              <Link href="/dashboard" className="px-6 py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-colors">
                Buka Dashboard Seller
              </Link>
            </div>
          </div>
        ) : user?.is_seller ? (
          <div className="text-center py-12 space-y-4">
            <div className="w-20 h-20 bg-orange-500/10 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold">Menunggu Verifikasi</h2>
            <p className="text-muted-foreground max-w-sm mx-auto">Dokumen KTP Anda telah kami terima dan sedang dalam proses peninjauan oleh tim admin. Proses ini memakan waktu maksimal 1x24 jam.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-blue-500/10 text-blue-600 rounded-xl p-4 flex gap-3 items-start">
               <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
               <div className="text-sm">
                 <p className="font-bold">Informasi Privasi & Keamanan</p>
                 <p className="mt-1 opacity-90">KTP Anda hanya akan digunakan untuk verifikasi identitas dan mencegah penipuan. Data Anda disimpan dengan aman dan terenkripsi.</p>
               </div>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-semibold">Unggah Foto KTP</label>
              
              <CldUploadWidget 
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "rewear_unsigned"}
                onSuccess={(result: any) => {
                  if (result.info?.secure_url) {
                    setKtpImageUrl(result.info.secure_url);
                  }
                }}
                options={{ maxFiles: 1, multiple: false }}
              >
                {({ open }) => (
                  <div 
                    onClick={() => open()}
                    className="border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center justify-center gap-3 text-center cursor-pointer hover:bg-muted/50 hover:border-primary/50 transition-colors"
                  >
                    {ktpImageUrl ? (
                      <div className="relative w-full max-w-sm rounded-lg overflow-hidden border border-border aspect-[1.6/1]">
                        <img src={ktpImageUrl} alt="Preview KTP" className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <>
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                          <Camera className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm">Klik untuk memilih foto KTP</p>
                          <p className="text-xs text-muted-foreground mt-1">Maks. 2MB. Format: JPG, PNG.</p>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </CldUploadWidget>
            </div>

            <div className="pt-4 border-t border-border">
               <button disabled={isUploading || !ktpImageUrl} type="submit" className="w-full h-12 bg-foreground text-background font-bold rounded-xl shadow-md hover:bg-foreground/90 transition-transform active:scale-[0.98] disabled:opacity-50">
                 {isUploading ? "Mengunggah KTP..." : "Kirim Pengajuan"}
               </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
