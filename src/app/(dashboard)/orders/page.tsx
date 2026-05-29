import { formatRupiah } from "@/shared/utils/format";
import { Search } from "lucide-react";
import Link from "next/link";

export default function OrdersPage() {
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
            <select className="h-9 px-3 bg-background border border-border rounded-lg text-sm outline-none font-medium">
               <option>Semua Peran</option>
               <option>Sebagai Pembeli</option>
               <option>Sebagai Penjual</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-surface-container text-muted-foreground text-xs uppercase font-bold border-b border-border">
              <tr>
                <th className="px-6 py-4">ID Pesanan</th>
                <th className="px-6 py-4">Peran</th>
                <th className="px-6 py-4">Produk</th>
                <th className="px-6 py-4">Total Tagihan</th>
                <th className="px-6 py-4">Status & Escrow</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4 font-mono font-bold text-xs"><Link href="/orders/ORD-8923741" className="hover:underline">ORD-8923741</Link></td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-1 bg-foreground text-background font-bold rounded-md text-xs">Pembeli</span>
                </td>
                <td className="px-6 py-4 truncate max-w-[200px]">Kemeja Flanel Uniqlo Merah...</td>
                <td className="px-6 py-4 font-bold">{formatRupiah(178000)}</td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-1 bg-blue-500/10 text-blue-500 font-bold rounded-md text-xs">Sedang Dikirim</span>
                </td>
                <td className="px-6 py-4 text-right">
                   <Link href="/orders/ORD-8923741" className="text-xs font-bold text-foreground py-1.5 px-3 bg-surface-container rounded-lg hover:bg-muted transition-colors">Lacak</Link>
                </td>
              </tr>
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4 font-mono font-bold text-xs">ORD-1092834</td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-1 bg-surface-container border border-border text-foreground font-bold rounded-md text-xs">Penjual</span>
                </td>
                <td className="px-6 py-4 truncate max-w-[200px]">Celana Jeans Stradivarius...</td>
                <td className="px-6 py-4 font-bold">{formatRupiah(210000)}</td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-1 bg-amber-500/10 text-amber-500 font-bold rounded-md text-xs">Diproses</span>
                </td>
                <td className="px-6 py-4 text-right">
                   <Link href="#" className="text-xs font-bold text-foreground py-1.5 px-3 bg-surface-container rounded-lg hover:bg-muted transition-colors">Kirim</Link>
                </td>
              </tr>
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4 font-mono font-bold text-xs">ORD-5541238</td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-1 bg-surface-container border border-border text-foreground font-bold rounded-md text-xs">Penjual</span>
                </td>
                <td className="px-6 py-4 truncate max-w-[200px]">Hoodie H&M Polos Abu-abu</td>
                <td className="px-6 py-4 font-bold">{formatRupiah(150000)}</td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-1 bg-green-500/10 text-green-500 font-bold rounded-md text-xs">Selesai / Cair</span>
                </td>
                <td className="px-6 py-4 text-right">
                   <Link href="#" className="text-xs font-bold text-foreground py-1.5 px-3 bg-surface-container rounded-lg hover:bg-muted transition-colors">Lihat</Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
