import { formatRupiah } from "@/shared/utils/format";
import { ArrowRight, Package, TrendingUp, Wallet } from "lucide-react";
import Link from "next/link";
import { orderService, productService } from "@/services";

export default async function DashboardPage() {
  let products = [];
  let orders = [];

  try {
     const [prodRes, orderRes] = await Promise.all([
        productService.getSellerProducts(),
        orderService.getSellerOrders()
     ]);
     products = prodRes?.data?.slice(0, 3) || [];
     orders = orderRes?.data?.slice(0, 4) || [];
  } catch (err) {
     console.error("Failed to load dashboard metrics");
  }

  // Dashboard sum metrics can be calculated directly or obtained via balance api if it exists.
  // We will run basic calculation on orders as placeholder logic for dashboard.
  const stats = [
    { label: "Total Penjualanku", value: orders.length || 0, icon: Package, amount: null },
    { label: "Saldo Tersedia", value: null, icon: Wallet, amount: products.length > 0 ? 0 : 0 },
    { label: "Dana Tertahan (Escrow)", value: null, icon: TrendingUp, amount: 0 },
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
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {orders.length === 0 ? (
                  <tr>
                     <td colSpan={3} className="px-6 py-8 text-center text-muted-foreground">Belum ada pesanan terbaru.</td>
                  </tr>
                ) : orders.map((order: any) => (
                   <tr key={order.id} className="hover:bg-muted/30 transition-colors">
                     <td className="px-6 py-4 font-semibold"><Link href={`/orders/${order.id}`} className="hover:underline">ORD-{order.id.slice(0, 8).toUpperCase()}</Link></td>
                     <td className="px-6 py-4">
                       <span className="px-2.5 py-1 bg-blue-500/10 text-blue-500 font-bold rounded-md text-xs uppercase">{order.status}</span>
                     </td>
                     <td className="px-6 py-4 font-semibold">{formatRupiah(Number(order.total_price))}</td>
                   </tr>
                ))}
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
            {products.length === 0 ? (
               <p className="text-sm text-muted-foreground py-4 text-center">Belum ada produk.</p>
            ) : products.map((product: any) => (
              <div key={product.id} className="flex gap-4 items-center">
                <div className="w-16 h-16 rounded-xl bg-surface-container overflow-hidden shrink-0 border border-border/50">
                  <img src={product.images?.[0] || ""} alt={product.title} className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-semibold text-sm truncate">{product.title}</h4>
                  <p className="text-muted-foreground text-xs mt-1">Status: {product.status}</p>
                </div>
              </div>
            ))}
            
            <Link href="/my-products" className="block w-full py-3 text-center text-sm font-bold bg-surface-container hover:bg-muted border border-border rounded-xl transition-colors">
              Kelola Semua Produk
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

