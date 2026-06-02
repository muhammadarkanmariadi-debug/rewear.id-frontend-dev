/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { adminService } from "@/services";
import { toast } from "sonner";
import { formatRupiah } from "@/shared/utils/format";
import { format } from "date-fns";
import { Search, Gavel, ArrowLeftRight, CheckCircle2 } from "lucide-react";
import { DataPagination } from "@/widgets/data-pagination";

export default function AdminDisputesPage() {
  const [disputes, setDisputes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [perPage, setPerPage] = useState(15);

  const fetchDisputes = async () => {
    try {
      setLoading(true);
      const res = await adminService.getDisputes({ search, page: currentPage, per_page: perPage });
      if (res.data) {
        setDisputes(res.data);
        if (res.meta?.last_page) setLastPage(res.meta.last_page);
      }
    } catch (err) {
      toast.error("Gagal memuat daftar sengketa.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchDisputes();
    }, 500);
    return () => clearTimeout(delay);
  }, [search, currentPage, perPage]);

  const handleResolve = async (id: string, type: "refund" | "release") => {
    const actionText = type === "refund" ? "mengembalikan dana ke pembeli" : "meneruskan dana ke penjual";
    const notes = window.prompt(`Catatan admin untuk aksi ${actionText}:`);
    if (notes === null) return;
    
    try {
      setActionLoading(id);
      await adminService.resolveDispute(id, type, notes);
      toast.success(`Sengketa diselesaikan. Dana ${type === "refund" ? "dikembalikan ke pembeli" : "diteruskan ke penjual"}.`);
      fetchDisputes();
    } catch (err: any) {
      toast.error(err.message || "Gagal menyelesaikan sengketa.");
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Manajemen Sengketa</h2>
          <p className="text-muted-foreground mt-1">Kelola dan selesaikan sengketa transaksi antara pembeli dan penjual.</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-border bg-surface-container/50">
          <div className="relative max-w-sm w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Cari sengketa..." 
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
                <th className="px-6 py-4">Pesanan & Produk</th>
                <th className="px-6 py-4">Pelapor (Pembeli)</th>
                <th className="px-6 py-4">Alasan & Status</th>
                <th className="px-6 py-4 text-right">Aksi Penengah (Admin)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading && disputes.length === 0 ? (
                <tr>
                   <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">Memuat data...</td>
                </tr>
              ) : disputes.length === 0 ? (
                <tr>
                   <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">Tidak ada sengketa ditemukan.</td>
                </tr>
              ) : disputes.map((d) => (
                <tr key={d.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 align-top">
                    <p className="font-semibold text-xs text-primary mb-1">#{d.order?.order_number}</p>
                    <p className="font-semibold line-clamp-1">{d.order?.product?.title}</p>
                    <p className="text-xs font-bold text-muted-foreground mt-1">{formatRupiah(Number(d.order?.total_amount))}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {d.created_at ? format(new Date(d.created_at), "dd MMM yyyy") : "-"}
                    </p>
                  </td>
                  <td className="px-6 py-4 align-top">
                    <p className="font-semibold">{d.complainant?.name}</p>
                    <p className="text-xs text-muted-foreground">{d.complainant?.email}</p>
                  </td>
                  <td className="px-6 py-4 align-top">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded font-bold text-xs mb-2 ${d.status === 'resolved' ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-600'}`}>
                      {d.status === 'resolved' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Gavel className="w-3.5 h-3.5" />}
                      {d.status === 'resolved' ? 'Selesai' : 'Perlu Tindakan'}
                    </span>
                    <p className="font-semibold text-xs mb-1">Alasan: {d.reason}</p>
                    <p className="text-xs text-muted-foreground line-clamp-2">{d.description}</p>
                    {d.status === 'resolved' && (
                       <p className="text-xs text-primary mt-2 font-semibold">Resolusi: {d.resolution}</p>
                    )}
                  </td>
                  <td className="px-6 py-4 align-top">
                    {d.status !== 'resolved' ? (
                      <div className="flex flex-col items-end gap-2">
                        <button
                          disabled={actionLoading === d.id}
                          onClick={() => handleResolve(d.id, 'refund')}
                          className="flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors disabled:opacity-50 bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 w-40"
                        >
                          {actionLoading === d.id ? "..." : <><ArrowLeftRight className="w-3.5 h-3.5" /> Refund Pembeli</>}
                        </button>
                        <button
                          disabled={actionLoading === d.id}
                          onClick={() => handleResolve(d.id, 'release')}
                          className="flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors disabled:opacity-50 bg-green-500/10 text-green-600 hover:bg-green-500/20 w-40"
                        >
                          {actionLoading === d.id ? "..." : <><CheckCircle2 className="w-3.5 h-3.5" /> Teruskan ke Penjual</>}
                        </button>
                      </div>
                    ) : (
                      <div className="text-right text-xs text-muted-foreground italic">
                        Diselesaikan pada {d.resolved_at ? format(new Date(d.resolved_at), "dd MMM yyyy") : "-"}
                      </div>
                    )}
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
