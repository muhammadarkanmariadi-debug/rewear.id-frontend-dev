import { formatRupiah } from "@/shared/utils/format";
import { Search } from "lucide-react";
import Link from "next/link";
import { orderService } from "@/services";

export default async function OrdersPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const rawParams = await searchParams;
  const role = (rawParams.role as string) || "buyer";

  let orders = [];
  try {
    const res = role === "seller" 
      ? await orderService.getSellerOrders() 
      : await orderService.getAll();
    // Normalizing so both arrays are accessible
    orders = res.data || [];
    console.log(orders)
  } catch (err) {
    console.error("Failed to load orders");
  }

  // Handle Select redirect through a simple map on client or just using Next.js <Link> in a client component?
  // We can just rely on basic links or leave the select as a controlled UI in a sub-component.
  // For simplicity, we can do a standard Server Component and link buttons instead of a native <select> or use a client wrapper for the toolbar.

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Daftar Pesanan</h1>
        <p className="text-muted-foreground mt-1">Lacak pembelian Anda dan kelola pesanan masuk dari pembeli.</p>
      </div>

      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-4 justify-between bg-surface-container/50">
          <div className="relative max-w-sm w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Cari ID Pesanan..." 
              className="w-full pl-9 pr-4 h-9 bg-background border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="flex gap-2">
            <Link href="?role=buyer" className={`h-9 px-4 flex items-center justify-center rounded-lg text-sm font-medium border ${role === 'buyer' ? 'bg-foreground text-background border-foreground' : 'bg-background border-border text-foreground hover:bg-muted'}`}>Sebagai Pembeli</Link>
            <Link href="?role=seller" className={`h-9 px-4 flex items-center justify-center rounded-lg text-sm font-medium border ${role === 'seller' ? 'bg-foreground text-background border-foreground' : 'bg-background border-border text-foreground hover:bg-muted'}`}>Sebagai Penjual</Link>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-surface-container text-muted-foreground text-xs uppercase font-bold border-b border-border">
              <tr>
                <th className="px-6 py-4">ID Pesanan</th>
                <th className="px-6 py-4">Peran</th>
                <th className="px-6 py-4">Total Tagihan</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {orders.length === 0 ? (
                <tr>
                   <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">Tidak ada pesanan ditemukan.</td>
                </tr>
              ) : orders.map((order: any) => (
                <tr key={order.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 font-mono font-bold text-xs"><Link href={`/orders/${order.id}`} className="hover:underline">ORD-{order.id.slice(0, 8).toUpperCase()}</Link></td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 ${role === 'buyer' ? 'bg-foreground text-background' : 'bg-surface-container border border-border text-foreground'} font-bold rounded-md text-xs`}>{role === 'buyer' ? 'Pembeli' : 'Penjual'}</span>
                  </td>
                  <td className="px-6 py-4 font-bold">{formatRupiah(Number(order.total_price))}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 bg-amber-500/10 text-amber-500 font-bold rounded-md text-xs uppercase">{order.status}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                     <Link href={`/orders/${order.id}`} className="text-xs font-bold text-foreground py-1.5 px-3 bg-surface-container rounded-lg hover:bg-muted transition-colors">Lihat Detail</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

