"use client";

import { useState } from "react";
import { format } from "date-fns";
import { CheckCircle2, Search, Eye } from "lucide-react";
import { DataPagination } from "@/widgets/data-pagination";
import { useAdminSellerVerifications, useVerifySeller } from "@/hooks/api/use-admin";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import { motion } from "framer-motion";

export function AdminSellerVerificationsClient() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(15);

  const { data: res, isLoading: loading } = useAdminSellerVerifications({ per_page: 10 });
  const allVerifications = res?.data || [];



  const lastPage = Math.ceil(allVerifications.length / perPage) || 1;
  const startIndex = (currentPage - 1) * perPage;
  const paginatedVerifications = allVerifications.slice(startIndex, startIndex + perPage);

  const { mutate: verifySeller, isPending: actionLoading } = useVerifySeller();

  const handleApprove = (id: string) => {
    if (!window.confirm("Setujui verifikasi penjual ini?")) return;
    verifySeller(id);
  };

  const openDocument = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Verifikasi Penjual</h2>
          <p className="text-muted-foreground mt-1">Tinjau dokumen identitas pengguna yang ingin menjadi penjual.</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden flex flex-col">
       

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-surface-container text-muted-foreground text-xs uppercase font-bold border-b border-border">
              <tr>
                <th className="px-6 py-4">Informasi Pengguna</th>
                <th className="px-6 py-4">Dokumen Identitas (KTP)</th>
                <th className="px-6 py-4">Tanggal Pengajuan</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading ? (
                <TableSkeleton columns={5} rows={5} />
              ) : allVerifications.length === 0 ? (
                <tr>
                   <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">Tidak ada pengajuan verifikasi yang tertunda.</td>
                </tr>
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              ) : paginatedVerifications.map((v: any, i: number) => (
                <motion.tr 
                  key={v.id} 
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <p className="font-semibold">{v.name || "Unknown"}</p>
                    <p className="text-xs text-muted-foreground">{v.email}</p>
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => openDocument(v.ktp_image_url)}
                      className="flex items-center gap-2 px-3 py-1.5 bg-surface-container border border-border rounded-lg hover:bg-muted transition-colors text-xs font-semibold"
                    >
                      <Eye className="w-3.5 h-3.5" /> Lihat KTP
                    </button>
                  </td>
             
                  <td className="px-6 py-4 text-xs text-muted-foreground">
                    {v.created_at ? format(new Date(v.created_at), "dd MMM yyyy HH:mm") : "-"}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        disabled={actionLoading}
                        onClick={() => handleApprove(v.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors disabled:opacity-50 bg-green-500/10 text-green-600 hover:bg-green-500/20"
                      >
                        {actionLoading ? "Memproses..." : <><CheckCircle2 className="w-3.5 h-3.5" /> Setujui</>}
                      </button>
                    </div>
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
