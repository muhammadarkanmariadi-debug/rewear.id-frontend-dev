import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen relative bg-surface-container-low font-sans">
      
      {/* Kolom Kiri: Visual (Hanya untuk Desktop) */}
      <div className="hidden lg:flex w-1/2 relative bg-surface-container-high overflow-hidden items-end justify-center p-12">
        <Image
          src="https://picsum.photos/seed/authhero/1080/1600"
          alt="Vintage Fashion Style"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        <div className="relative z-10 text-white w-full max-w-lg mb-8">
          <div className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-md px-3 py-1 text-sm font-semibold mb-4 border border-white/30">
            Escrow Protected
          </div>
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            Ekosistem Fashion Sirkular.
          </h2>
          <p className="text-white/80 text-lg leading-relaxed">
            Sirkulasi pakaian berkualitas, bergaya premium, tanpa harus merobek kantong. Semua transaksi dilindungi secara profesional.
          </p>
        </div>
      </div>

      {/* Kolom Kanan: Form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center relative p-6 sm:p-12 md:p-16 lg:p-24 bg-background">
        
        {/* Tombol Back */}
        <Link 
          href="/" 
          className="absolute top-6 left-6 sm:top-8 sm:left-8 inline-flex items-center justify-center p-2 rounded-full text-muted-foreground bg-surface-container hover:bg-accent hover:text-foreground transition-colors group shadow-sm border border-border/40"
          aria-label="Kembali ke Beranda"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        </Link>
        
        <div className="w-full max-w-sm sm:max-w-md bg-card/50 backdrop-blur-sm sm:bg-transparent rounded-2xl p-6 sm:p-0 shadow-lg sm:shadow-none border border-border/50 sm:border-none">
          <div className="mb-6 text-center sm:text-left">
            <Link href="/" className="inline-block flex-col mb-8 group">
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg group-hover:scale-105 transition-transform">
                  R
                </div>
                <span className="font-bold text-2xl tracking-tight">
                  rewear<span className="text-primary">.id</span>
                </span>
              </div>
            </Link>
          </div>
          
          {children}
          
        </div>
      </div>
    </div>
  );
}
