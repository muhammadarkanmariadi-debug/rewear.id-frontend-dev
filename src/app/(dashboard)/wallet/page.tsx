"use client";

import { useEffect, useState } from "react";
import { formatRupiah } from "@/shared/utils/format";
import { ArrowDownToLine, Receipt, Wallet } from "lucide-react";
import { bankAccountService, withdrawalService } from "@/services";
import type { ApiResponse } from "@/lib/http-client";

interface BankAccountItem {
  id: string;
  bank_name: string;
  account_number: string;
  account_holder_name: string;
}

interface WithdrawalItem {
  id: string;
  amount: number;
  bank_name: string;
  account_number: string;
  status: string;
}

export default function WalletPage() {
  const [bankAccounts, setBankAccounts] = useState<BankAccountItem[]>([]);
  const [withdrawals, setWithdrawals] = useState<WithdrawalItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState<number>(0);
  const [selectedBankId, setSelectedBankId] = useState<string>("");

  const fetchData = async () => {
    try {
      const [banksRes, withRes] = await Promise.all([
        bankAccountService.getAll(),
        withdrawalService.getAll()
      ]);
      if (banksRes.status && banksRes.data) {
        setBankAccounts(banksRes.data);
        if (banksRes.data.length) setSelectedBankId(banksRes.data[0].id);
      }
      if (withRes.status && withRes.data) {
        setWithdrawals(withRes.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleWithdraw = async () => {
    if (!selectedBankId || amount < 50000) return alert("Minimal penarikan Rp50.000");
    try {
      const res = await withdrawalService.request({
        bank_account_id: selectedBankId,
        amount
      });
      if (res.status) {
        alert("Permintaan penarikan berhasil dibuat!");
        fetchData();
      } else {
        alert(res.message || "Gagal melakukan penarikan dana");
      }
    } catch (err) {
      alert("Gagal melakukan penarikan dana");
      console.error(err);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading wallet...</div>;

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

          <div className="relative z-10 mt-12 space-y-3">
             <h4 className="text-xs font-semibold text-background/80 uppercase tracking-widest mb-1">Daftar Rekening</h4>
             {bankAccounts.length === 0 ? (
               <p className="text-sm">Belum ada bank yang tertaut.</p>
             ) : (
               bankAccounts.map((b) => (
                 <div key={b.id} className="bg-background/10 rounded-xl p-4 border border-background/20 backdrop-blur-sm flex justify-between items-center">
                    <p className="font-bold flex items-center gap-3">
                      <span className="opacity-70">{b.bank_name}</span>
                      <span>**** {b.account_number.slice(-4)}</span>
                      <span className="opacity-70 ml-2 hidden sm:inline">{b.account_holder_name}</span>
                    </p>
                 </div>
               ))
             )}
          </div>
        </div>

        {/* Withdrawal Action */}
        <div className="bg-card border border-border rounded-3xl p-8 shadow-sm flex flex-col justify-center">
          <h3 className="font-bold text-lg mb-4">Tarik Saldo</h3>
          <p className="text-sm text-muted-foreground mb-6">Penarikan dana diproses maksimal 1x24 jam kerja. Minimal Rp50.000.</p>
          
          <div className="space-y-4">
             <select 
               className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm font-medium outline-none"
               value={selectedBankId}
               onChange={(e) => setSelectedBankId(e.target.value)}
             >
               <option value="" disabled>Pilih Rekening Tujuan</option>
               {bankAccounts.map(b => (
                 <option key={b.id} value={b.id}>{b.bank_name} - {b.account_number}</option>
               ))}
             </select>

             <div className="relative">
               <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-muted-foreground">Rp</span>
               <input 
                 type="number" 
                 placeholder="0" 
                 value={amount || ""} 
                 onChange={(e) => setAmount(Number(e.target.value))}
                 className="w-full bg-background border border-border rounded-xl pl-12 pr-4 py-3 text-lg font-bold outline-none focus:ring-2 focus:ring-foreground/20" 
               />
             </div>
             <button 
               onClick={handleWithdraw}
               disabled={!selectedBankId} 
               className="w-full h-12 bg-foreground text-background font-bold rounded-xl shadow-md hover:bg-foreground/90 transition-transform active:scale-[0.98] flex justify-center items-center gap-2 disabled:opacity-50"
             >
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
              <th className="px-6 py-4">ID Transaksi</th>
              <th className="px-6 py-4">Jumlah</th>
              <th className="px-6 py-4">Bank</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {withdrawals.length === 0 ? (
              <tr><td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">Belum ada riwayat penarikan</td></tr>
            ) : (
              withdrawals.map((w) => (
                <tr key={w.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 font-mono font-bold text-xs"><Receipt className="w-4 h-4 inline mr-2 text-muted-foreground" />WD-{w.id.slice(-6)}</td>
                  <td className="px-6 py-4 font-bold">{formatRupiah(w.amount)}</td>
                  <td className="px-6 py-4">{w.bank_name} - {w.account_number}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 font-bold rounded-md text-xs ${
                      w.status === 'completed' ? 'bg-green-500/10 text-green-500' : 
                      w.status === 'rejected' ? 'bg-red-500/10 text-red-500' : 'bg-orange-500/10 text-orange-500'
                    }`}>
                      {w.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
