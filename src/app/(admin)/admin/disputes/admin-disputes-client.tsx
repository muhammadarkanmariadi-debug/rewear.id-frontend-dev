"use client";

import { useState } from "react";
import { formatRupiah } from "@/shared/utils/format";
import { format } from "date-fns";
import { Search, Gavel, ArrowLeftRight, CheckCircle2 } from "lucide-react";
import { DataPagination } from "@/widgets/data-pagination";
import { useAdminDisputes, useResolveDispute } from "@/hooks/api/use-admin";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import { motion } from "framer-motion";

export function AdminDisputesClient() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(15);

  const { data: res, isLoading: loading } = useAdminDisputes({ per_page: 1000 });
  const allDisputes = res?.data || [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filteredDisputes = allDisputes.filter((d: any) => 
    d.order?.order_number?.toLowerCase().includes(search.toLowerCase()) ||
    d.complainant?.name?.toLowerCase().includes(search.toLowerCase())
  );

  const lastPage = Math.ceil(filteredDisputes.length / perPage) || 1;
  const startIndex = (currentPage - 1) * perPage;
  const paginatedDisputes = filteredDisputes.slice(startIndex, startIndex + perPage);

  const { mutate: resolveDispute, isPending: actionLoading } = useResolveDispute();

  const handleResolve = (id: string, type: "refund" | "release") => {
    const actionText = type === "refund" ? "mengembalikan dana ke pembeli" : "meneruskan dana ke penjual";
    const notes = window.prompt(`Catatan admin untuk aksi ${actionText}:`);
    if (notes === null) return;
    resolveDispute({ id, resolution_type: type, admin_notes: notes });
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
              {loading ? (
                <TableSkeleton columns={4} rows={5} />
              ) : filteredDisputes.length === 0 ? (
                <tr>
                   <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">Tidak ada sengketa ditemukan.</td>
                </tr>
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              ) : paginatedDisputes.map((d: any, i: number) => (
                <motion.tr 
                  key={d.id} 
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="hover:bg-muted/30 transition-colors"
                >
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
                    <div className="flex flex-col gap-1">
                      <span className={`w-max px-2.5 py-1 font-bold rounded-md text-[10px] uppercase tracking-wider ${
                        d.status === 'open' ? 'bg-yellow-500/10 text-yellow-600' :
                        d.status === 'resolved' ? 'bg-green-500/10 text-green-600' :
                        'bg-gray-500/10 text-gray-500'
                      }`}>
                        {d.status}
                      </span>
                      <p className="text-xs font-semibold mt-1 line-clamp-2 max-w-[200px]">{d.reason}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 align-top">
                    {d.status === 'open' ? (
                      <div className="flex flex-col items-end gap-2">
                        <button
                          disabled={actionLoading}
                          onClick={() => handleResolve(d.id, "refund")}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors disabled:opacity-50 bg-red-500/10 text-red-600 hover:bg-red-500/20 w-full sm:w-auto justify-center"
                        >
                          {actionLoading ? "..." : <><Gavel className="w-3.5 h-3.5" /> Refund ke Pembeli</>}
                        </button>
                        <button
                          disabled={actionLoading}
                          onClick={() => handleResolve(d.id, "release")}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors disabled:opacity-50 bg-green-500/10 text-green-600 hover:bg-green-500/20 w-full sm:w-auto justify-center"
                        >
                          {actionLoading ? "..." : <><ArrowLeftRight className="w-3.5 h-3.5" /> Teruskan ke Penjual</>}
                        </button>
                      </div>
                    ) : (
                      <div className="flex justify-end">
                        <span className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-lg">
                          <CheckCircle2 className="w-4 h-4" /> Selesai
                        </span>
                      </div>
                    )}
                  </td>
                </motion.tr>
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
