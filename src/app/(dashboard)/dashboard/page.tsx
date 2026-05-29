import { formatRupiah } from "@/shared/utils/format";
import { ArrowRight, Package, TrendingUp, Wallet } from "lucide-react";
import Link from "next/link";
import { MOCK_PRODUCTS } from "@/configs/mock-data";

export default function DashboardPage() {
  const stats = [
    { label: "Total Penjualan", value: 124, icon: Package, amount: null },
    { label: "Saldo Tersedia", value: null, icon: Wallet, amount: 2450000 },
    { label: "Dana Tertahan (Escrow)", value: null, icon: TrendingUp, amount: 650000 },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Ringkasan Seller</h1>
        <p className="text-muted-foreground mt-1">Pantau performa penjualan dan saldo Escrow Anda hari ini.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-card border border-border p-6 rounded-2xl shadow-sm flex flex-col justify-between">
              <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-foreground" />
              </div>
              <div>
                <p className="text-sm font-semibold text-muted-foreground mb-1">{stat.label}</p>
                <h3 className="text-2xl font-bold">
                  {stat.amount !== null ? formatRupiah(stat.amount) : stat.value}
                </h3>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* L E F T : Pesanan Terbaru */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Pesanan Terbaru</h2>
            <Link href="/orders" className="text-sm font-semibold text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
              Lihat Semua <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
            <table className="w-full text-sm text-left">
              <thead className="bg-surface-container text-muted-foreground text-xs uppercase font-bold border-b border-border">
                <tr>
                  <th className="px-6 py-4">ID Pesanan</th>
                  <th className="px-6 py-4">Produk</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 font-semibold"><Link href="/orders/ORD-8923741" className="hover:underline">ORD-8923741</Link></td>
                  <td className="px-6 py-4 truncate max-w-[200px]">Kemeja Flanel Uniqlo Merah...</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 bg-blue-500/10 text-blue-500 font-bold rounded-md text-xs">Sedang Dikirim</span>
                  </td>
                  <td className="px-6 py-4 font-semibold">{formatRupiah(175000)}</td>
                </tr>
                <tr className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 font-semibold">ORD-1092834</td>
                  <td className="px-6 py-4 truncate max-w-[200px]">Celana Jeans Stradivarius...</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 bg-amber-500/10 text-amber-500 font-bold rounded-md text-xs">Diproses</span>
                  </td>
                  <td className="px-6 py-4 font-semibold">{formatRupiah(210000)}</td>
                </tr>
                <tr className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 font-semibold">ORD-5541238</td>
                  <td className="px-6 py-4 truncate max-w-[200px]">Hoodie H&M Polos Abu-abu</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 bg-green-500/10 text-green-500 font-bold rounded-md text-xs">Selesai</span>
                  </td>
                  <td className="px-6 py-4 font-semibold">{formatRupiah(150000)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* R I G H T : Katalog Aktif */}
        <div className="lg:col-span-1 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Produk Populer Anda</h2>
          </div>
          
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-5">
            {MOCK_PRODUCTS.slice(0, 3).map(product => (
              <div key={product.id} className="flex gap-4 items-center">
                <div className="w-16 h-16 rounded-xl bg-surface-container overflow-hidden shrink-0 border border-border/50">
                  <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-semibold text-sm truncate">{product.title}</h4>
                  <p className="text-muted-foreground text-xs mt-1">Dilihat 120x • {product.wishlistCount} Favorit</p>
                </div>
              </div>
            ))}
            
            <Link href="/products" className="block w-full py-3 text-center text-sm font-bold bg-surface-container hover:bg-muted border border-border rounded-xl transition-colors">
              Kelola Semua Produk
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
