import { formatRupiah } from "@/shared/utils/format";
import { ArrowDownToLine, Receipt, Wallet } from "lucide-react";

export default function WalletPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Saldo & Escrow</h1>
        <p className="text-muted-foreground mt-1">Cairkan pendapatan penjualan Anda ke rekening Bank.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Balance Card */}
        <div className="bg-foreground text-background border border-border rounded-3xl p-8 flex flex-col justify-between shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-background/10 rounded-bl-full translate-x-8 -translate-y-8 blur-2xl"></div>
          
          <div className="relative z-10">
            <h3 className="text-sm font-semibold text-background/80 mb-2 flex items-center gap-2">
              <Wallet className="w-4 h-4" /> Saldo Tersedia
            </h3>
            <p className="text-4xl font-bold font-mono tracking-tight">{formatRupiah(2450000)}</p>
          </div>

          <div className="relative z-10 mt-12 bg-background/10 rounded-xl p-4 border border-background/20 backdrop-blur-sm">
             <h4 className="text-xs font-semibold text-background/80 uppercase tracking-widest mb-1">Rekening Pencairan</h4>
             <p className="font-bold flex items-center gap-3">
               <span className="opacity-70">BCA</span>
               <span>**** 8892</span>
               <span className="opacity-70 ml-2">Rizky Firmansyah</span>
             </p>
          </div>
        </div>

        {/* Withdrawal Action */}
        <div className="bg-card border border-border rounded-3xl p-8 shadow-sm flex flex-col justify-center">
          <h3 className="font-bold text-lg mb-4">Tarik Saldo</h3>
          <p className="text-sm text-muted-foreground mb-6">Penarikan dana akan diproses maksimal 1x24 jam kerja. Minimal penarikan Rp50.000.</p>
          
          <div className="space-y-4">
             <div className="relative">
               <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-muted-foreground">Rp</span>
               <input type="number" placeholder="0" defaultValue={2450000} className="w-full bg-background border border-border rounded-xl pl-12 pr-4 py-3 text-lg font-bold outline-none focus:ring-2 focus:ring-foreground/20" />
             </div>
             <button className="w-full h-12 bg-foreground text-background font-bold rounded-xl shadow-md hover:bg-foreground/90 transition-transform active:scale-[0.98] flex justify-center items-center gap-2">
               <ArrowDownToLine className="w-4 h-4" /> Cairkan Dana
             </button>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border">
           <h3 className="font-bold text-lg">Riwayat Pencairan Transaksi</h3>
        </div>
        <table className="w-full text-sm text-left">
          <thead className="bg-surface-container text-muted-foreground text-xs uppercase font-bold border-b border-border">
            <tr>
              <th className="px-6 py-4">Tanggal</th>
              <th className="px-6 py-4">ID Transaksi</th>
              <th className="px-6 py-4">Jumlah</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            <tr className="hover:bg-muted/30 transition-colors">
              <td className="px-6 py-4">27 Mei 2026</td>
              <td className="px-6 py-4 font-mono font-bold text-xs"><Receipt className="w-4 h-4 inline mr-2 text-muted-foreground" />WD-991203</td>
              <td className="px-6 py-4 font-bold">{formatRupiah(850000)}</td>
              <td className="px-6 py-4">
                <span className="px-2.5 py-1 bg-green-500/10 text-green-500 font-bold rounded-md text-xs">Berhasil</span>
              </td>
            </tr>
            <tr className="hover:bg-muted/30 transition-colors">
              <td className="px-6 py-4">20 Mei 2026</td>
              <td className="px-6 py-4 font-mono font-bold text-xs"><Receipt className="w-4 h-4 inline mr-2 text-muted-foreground" />WD-881242</td>
              <td className="px-6 py-4 font-bold">{formatRupiah(1200000)}</td>
              <td className="px-6 py-4">
                <span className="px-2.5 py-1 bg-green-500/10 text-green-500 font-bold rounded-md text-xs">Berhasil</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}
