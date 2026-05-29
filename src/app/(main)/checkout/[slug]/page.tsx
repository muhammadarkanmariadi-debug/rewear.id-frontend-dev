import { notFound } from "next/navigation";
import { MOCK_PRODUCTS } from "@/configs/mock-data";
import { formatRupiah } from "@/shared/utils/format";
import { ShieldCheck, Truck, MapPin, CreditCard, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface CheckoutPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CheckoutPage({ params }: CheckoutPageProps) {
  const { slug } = await params;
  const product = MOCK_PRODUCTS.find(p => p.slug === slug);

  if (!product) {
    notFound();
  }

  const SHIPPING_COST = 25000;
  const ESCROW_FEE = 3000;
  const TOTAL_PRICE = product.price + SHIPPING_COST + ESCROW_FEE;

  return (
    <div className="container mx-auto px-4 md:px-6 py-6 md:py-10 max-w-4xl">
      
      <Link href={`/products/${product.slug}`} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Kembali ke Produk
      </Link>

      <h1 className="text-2xl font-bold tracking-tight mb-8">Checkout Pesanan</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* L E F T : Details */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Alamat Pengiriman */}
          <div className="border border-border bg-card rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5" /> Alamat Pengiriman
            </h3>
            <div className="bg-surface-container rounded-xl p-4 border border-border/50">
              <p className="font-semibold mb-1">Rizky Firmansyah <span className="text-muted-foreground font-normal">(Rumah)</span></p>
              <p className="text-sm text-muted-foreground mb-1">08123456789</p>
              <p className="text-sm text-muted-foreground">Jl. Mawar Merah No. 12, Kebayoran Baru, Jakarta Selatan, 12160, DKI Jakarta</p>
            </div>
          </div>

          {/* Produk yang Dibeli */}
          <div className="border border-border bg-card rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold mb-4">Detail Produk</h3>
            <div className="flex gap-4">
              <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-surface-container shrink-0 border border-border/50">
                <Image src={product.images[0]} alt={product.title} fill className="object-cover" />
              </div>
              <div>
                <h4 className="font-semibold text-sm line-clamp-2 mb-1">{product.title}</h4>
                <p className="text-sm text-muted-foreground mb-2">Penjual: {product.seller.name}</p>
                <p className="font-bold">{formatRupiah(product.price)}</p>
              </div>
            </div>
          </div>

          {/* Opsi Pengiriman */}
          <div className="border border-border bg-card rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Truck className="w-5 h-5" /> Pengiriman Bersama GoSend
            </h3>
            <select className="w-full bg-surface-container border border-border rounded-xl p-3 text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20">
              <option>GoSend Instant - Rp25.000 (Tiba Hari Ini)</option>
              <option>GoSend Same Day - Rp15.000 (Tiba Besok)</option>
              <option>JNE Reguler - Rp11.000 (2-3 Hari)</option>
            </select>
          </div>

        </div>

        {/* R I G H T : Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 border border-border bg-card rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold mb-4 text-lg">Ringkasan Belanja</h3>
            
            <div className="flex flex-col gap-3 text-sm mb-6 border-b border-border/50 pb-6">
              <div className="flex justify-between text-muted-foreground">
                <span>Total Harga (1 Barang)</span>
                <span>{formatRupiah(product.price)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Total Ongkos Kirim</span>
                <span>{formatRupiah(SHIPPING_COST)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Biaya Escrow (Admin)</span>
                <span>{formatRupiah(ESCROW_FEE)}</span>
              </div>
            </div>

            <div className="flex justify-between font-bold text-lg mb-6">
              <span>Total Tagihan</span>
              <span>{formatRupiah(TOTAL_PRICE)}</span>
            </div>

            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-3 mb-6 flex items-start gap-2">
              <ShieldCheck className="w-5 h-5 text-green-500 shrink-0" />
              <p className="text-xs text-green-700 dark:text-green-400 font-medium leading-relaxed">
                Pembayaran dikunci di sistem Rekber (Escrow). Dana diteruskan ke penjual hanya jika barang sesuai.
              </p>
            </div>

            <Link href="/orders/ORD-8923741" className="w-full flex items-center justify-center h-12 bg-foreground text-background font-bold rounded-xl hover:bg-foreground/90 transition-transform active:scale-95 shadow-md">
              Mulai Bayar & Escrow
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
