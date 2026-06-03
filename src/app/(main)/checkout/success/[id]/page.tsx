import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

interface SuccessPageProps {
  params: Promise<{ id: string }>;
}

export default async function CheckoutSuccessPage({ params }: SuccessPageProps) {
  const { id } = await params;

  return (
    <div className="container max-w-2xl mx-auto px-4 py-20 flex flex-col items-center text-center">
      <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
        <CheckCircle2 className="w-10 h-10 text-green-500" />
      </div>
      
      <h1 className="text-3xl font-bold tracking-tight mb-4">
        Pesanan Berhasil Dibuat!
      </h1>
      
      <p className="text-muted-foreground mb-8 text-lg max-w-md">
        Pesanan Anda telah masuk ke sistem Escrow. Silakan selesaikan pembayaran agar pesanan dapat segera diproses oleh penjual.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <Link 
          href={`/orders/${id}`}
          className="flex items-center justify-center gap-2 bg-foreground text-background font-bold px-8 py-4 rounded-xl shadow-md hover:bg-foreground/90 transition-transform active:scale-95"
        >
          Selesaikan Pembayaran
          <ArrowRight className="w-5 h-5" />
        </Link>
        <Link 
          href="/products"
          className="flex items-center justify-center gap-2 bg-surface-container border border-border font-bold px-8 py-4 rounded-xl hover:bg-muted transition-colors"
        >
          Lanjut Belanja
        </Link>
      </div>
    </div>
  );
}
