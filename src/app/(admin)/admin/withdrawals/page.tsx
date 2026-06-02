/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { formatRupiah } from "@/shared/utils/format";
import { format } from "date-fns";
import { CheckCircle2, XCircle, Search } from "lucide-react";
import { DataPagination } from "@/widgets/data-pagination";
import { useAdminWithdrawals, useApproveWithdrawal, useRejectWithdrawal } from "@/hooks/api/use-admin";
import { toast } from "sonner";

export default function AdminWithdrawalsPage() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(15);

  const { data: res, isLoading: loading } = useAdminWithdrawals({ search, page: currentPage, per_page: perPage });
  const withdrawals = res?.data || [];
  const lastPage = res?.meta?.last_page || 1;

  const { mutate: approveWithdrawal, isPending: approveLoading } = useApproveWithdrawal();
  const { mutate: rejectWithdrawal, isPending: rejectLoading } = useRejectWithdrawal();
  const actionLoading = approveLoading || rejectLoading;

  const handleApprove = (id: string) => {
    if (!window.confirm("Setujui penarikan dana ini? Pastikan Anda telah mentransfer dana ke rekening penjual.")) return;
    approveWithdrawal(id);
  };

  const handleReject = (id: string) => {
    const reason = window.prompt("Alasan penolakan (dana akan dikembalikan ke saldo penjual):");
    if (reason === null) return;
    if (!reason.trim()) return toast.error("Alasan penolakan harus diisi.");
    rejectWithdrawal({ id, reason });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Persetujuan Penarikan</h2>
          <p className="text-muted-foreground mt-1">Kelola permintaan penarikan dana dari saldo penjual ke rekening bank mereka.</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-border bg-surface-container/50">
          <div className="relative max-w-sm w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Cari nama penjual atau bank..." 
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-4 h-9 bg-background border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-surface-container text-muted-foreground text-xs uppercase font-bold border-b border-border">
              <tr>
                <th className="px-6 py-4">Informasi Penjual</th>
                <th className="px-6 py-4">Rekening Tujuan</th>
                <th className="px-6 py-4">Nominal</th>
                <th className="px-6 py-4">Tanggal Pengajuan</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading && withdrawals.length === 0 ? (
                <tr>
                   <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">Memuat data...</td>
                </tr>
              ) : withdrawals.length === 0 ? (
                <tr>
                   <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">Tidak ada permintaan penarikan yang tertunda.</td>
                </tr>
              ) : withdrawals.map((w: any) => (
                <tr key={w.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-semibold">{w.user?.name || "Unknown"}</p>
                    <p className="text-xs text-muted-foreground">{w.user?.email}</p>
                  </td>
                  <td className="px-6 py-4">
                    {w.bank_account ? (
                      <>
                        <p className="font-semibold">{w.bank_account.bank_name}</p>
                        <p className="text-xs text-muted-foreground">{w.bank_account.account_number} a.n {w.bank_account.account_name}</p>
                      </>
                    ) : (
                      <span className="text-muted-foreground italic text-xs">Rekening dihapus</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-base">{formatRupiah(Number(w.amount))}</p>
                    <p className="text-xs text-muted-foreground">Biaya: {formatRupiah(Number(w.fee))} (Net: {formatRupiah(Number(w.net_amount))})</p>
                  </td>
                  <td className="px-6 py-4 text-xs text-muted-foreground">
                    {w.created_at ? format(new Date(w.created_at), "dd MMM yyyy HH:mm") : "-"}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        disabled={actionLoading}
                        onClick={() => handleReject(w.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors disabled:opacity-50 bg-red-500/10 text-red-600 hover:bg-red-500/20"
                      >
                        {actionLoading ? "..." : <><XCircle className="w-3.5 h-3.5" /> Tolak</>}
                      </button>
                      <button
                        disabled={actionLoading}
                        onClick={() => handleApprove(w.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors disabled:opacity-50 bg-green-500/10 text-green-600 hover:bg-green-500/20"
                      >
                        {actionLoading ? "Memproses..." : <><CheckCircle2 className="w-3.5 h-3.5" /> Setujui</>}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {lastPage > 1 && (
          <div className="p-4 border-t border-border bg-surface-container/30">
            <DataPagination 
              currentPage={currentPage}
              lastPage={lastPage}
              onPageChange={setCurrentPage}
              perPage={perPage}
              onPerPageChange={(val) => {
                setPerPage(val);
                setCurrentPage(1);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
