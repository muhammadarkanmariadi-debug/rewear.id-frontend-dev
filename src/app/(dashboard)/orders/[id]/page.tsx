import { notFound } from "next/navigation";
import { formatRupiah } from "@/shared/utils/format";
import { EscrowTimeline } from "@/widgets/escrow/escrow-timeline";
import { ShieldCheck, MapPin, Package, ArrowLeft, TriangleAlert } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface OrderPageProps {
  params: Promise<{ id: string }>;
}

export default async function OrderDetailPage({ params }: OrderPageProps) {
  const { id } = await params;

  if (id !== "ORD-8923741") {
    notFound(); // Simple mock gating
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 md:px-0">
      
      <Link href="/orders" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Kembali ke Daftar Pesanan
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Status Pesanan: {id}</h1>
          <p className="text-sm text-muted-foreground mt-1">Dibeli pada 29 Mei 2026</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-foreground text-background font-bold text-sm rounded-full shrink-0">
          <Truck className="w-4 h-4" />
          Sedang Dikirim
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* L E F T : Escrow Timeline */}
        <div className="md:col-span-7">
          <div className="border border-border bg-card rounded-2xl p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/20">
                <ShieldCheck className="w-4 h-4 text-green-500" />
              </div>
              <h2 className="text-xl font-bold">Pelacakan Escrow</h2>
            </div>
            
            <EscrowTimeline />

            <div className="mt-8 pt-6 border-t border-border/50">
              <button className="w-full bg-foreground text-background font-bold h-12 rounded-xl transition-all shadow-md opacity-50 cursor-not-allowed">
                Konfirmasi Barang Diterima
              </button>
              <p className="text-xs text-center text-muted-foreground mt-3 flex items-center justify-center gap-1.5">
                <TriangleAlert className="w-3.5 h-3.5" />
                Tombol akan aktif setelah kurir menyelesaikan pengiriman
              </p>
            </div>
          </div>
        </div>

        {/* R I G H T : Order Info */}
        <div className="md:col-span-5 flex flex-col gap-6">
          <div className="border border-border bg-card rounded-2xl p-6 shadow-sm flex flex-col items-center text-center">
            <div className="w-24 h-24 relative rounded-xl overflow-hidden mb-4 border border-border/50">
              <Image 
                src="https://picsum.photos/seed/order123/600/800" 
                alt="Product" 
                fill 
                className="object-cover" 
              />
            </div>
            <h3 className="font-bold text-lg mb-1 leading-tight">Kemeja Flanel Uniqlo Merah Hitam Original</h3>
            <p className="text-sm font-semibold text-foreground bg-surface-container rounded-md px-2 py-1 mt-2">
              Total Pembayaran: {formatRupiah(178000)}
            </p>
          </div>

          <div className="border border-border bg-card rounded-2xl p-6 shadow-sm">
             <h3 className="font-bold mb-4 flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4" /> Alamat Tujuan
            </h3>
            <div className="text-sm text-muted-foreground leading-relaxed">
              <p className="font-semibold text-foreground mb-1">Rizky Firmansyah (08123456789)</p>
              <p>Jl. Mawar Merah No. 12, Kebayoran Baru, Jakarta Selatan, 12160, DKI Jakarta</p>
            </div>
          </div>
          
          <div className="border border-border bg-card rounded-2xl p-6 shadow-sm">
             <h3 className="font-bold mb-4 flex items-center gap-2 text-sm">
              <Package className="w-4 h-4" /> Informasi Pengiriman
            </h3>
            <div className="text-sm text-muted-foreground leading-relaxed flex flex-col gap-2">
              <div className="flex justify-between">
                <span>Kurir</span>
                <span className="font-bold text-foreground">GoSend Instant</span>
              </div>
              <div className="flex justify-between">
                <span>Nomor Resi</span>
                <span className="font-bold text-foreground">GOSEND-88219</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

// Temporary truck icon stub if not at top due to lucide missing it in quick import
import { Truck } from "lucide-react";
