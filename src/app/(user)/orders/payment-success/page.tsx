"use client";

import Link from "next/link";
import { CheckCircle2, ShoppingBag, ArrowRight } from "lucide-react";

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-card border border-border/50 rounded-3xl p-8 shadow-2xl flex flex-col items-center text-center">
        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-500" />
        </div>
        
        <h1 className="text-3xl font-bold mb-2">Pembayaran Berhasil!</h1>
        <p className="text-muted-foreground mb-8">
          Terima kasih telah berbelanja di rewear.id. Pesanan Anda akan segera diproses oleh penjual.
        </p>

        <div className="flex flex-col w-full gap-3">
          <Link 
            href="/orders" 
            className="w-full flex items-center justify-center gap-2 bg-foreground text-background font-bold h-12 rounded-xl transition-all shadow-md hover:bg-foreground/90 active:scale-95"
          >
            <ShoppingBag className="w-4 h-4" />
            Lihat Pesanan Saya
          </Link>
          <Link 
            href="/" 
            className="w-full flex items-center justify-center gap-2 bg-muted text-foreground font-medium h-12 rounded-xl transition-all hover:bg-muted/80 active:scale-95"
          >
            Kembali ke Beranda
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
