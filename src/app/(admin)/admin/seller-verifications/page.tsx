/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { adminService } from "@/services";
import { toast } from "sonner";
import { CheckCircle2, Search, ExternalLink } from "lucide-react";
import { format } from "date-fns";
import { DataPagination } from "@/widgets/data-pagination";

export default function AdminSellerVerificationsPage() {
  const [verifications, setVerifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [perPage, setPerPage] = useState(15);

  const fetchVerifications = async () => {
    try {
      setLoading(true);
      const res = await adminService.getSellerVerifications({ search, page: currentPage, per_page: perPage });
      if (res.data) {
        setVerifications(res.data);
        if (res.meta?.last_page) setLastPage(res.meta.last_page);
      }
    } catch (err) {
      toast.error("Gagal memuat daftar verifikasi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchVerifications();
    }, 500);
    return () => clearTimeout(delay);
  }, [search, currentPage, perPage]);

  const handleVerify = async (id: string) => {
    if (!window.confirm("Setujui verifikasi KTP pengguna ini menjadi penjual?")) return;
    try {
      setActionLoading(id);
      await adminService.verifySeller(id);
      toast.success("Verifikasi penjual berhasil disetujui.");
      fetchVerifications();
    } catch (err: any) {
      toast.error(err.message || "Gagal menyetujui verifikasi.");
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Verifikasi Penjual</h2>
          <p className="text-muted-foreground mt-1">Tinjau KTP pengguna yang mendaftar menjadi penjual.</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-border bg-surface-container/50">
          <div className="relative max-w-sm w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Cari nama atau email..." 
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
                <th className="px-6 py-4">Informasi Pengguna</th>
                <th className="px-6 py-4">Foto KTP</th>
                <th className="px-6 py-4">Tanggal Daftar</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading && verifications.length === 0 ? (
                <tr>
                   <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">Memuat data...</td>
                </tr>
              ) : verifications.length === 0 ? (
                <tr>
                   <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">Tidak ada permintaan verifikasi yang tertunda.</td>
                </tr>
              ) : verifications.map((user) => (
                <tr key={user.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </td>
                  <td className="px-6 py-4">
                    {user.ktp_image_url ? (
                      <a href={user.ktp_image_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-primary hover:underline text-xs font-semibold">
                        Lihat KTP <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <span className="text-muted-foreground italic text-xs">KTP tidak tersedia</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-xs text-muted-foreground">
                    {user.created_at ? format(new Date(user.created_at), "dd MMM yyyy") : "-"}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end">
                      <button
                        disabled={actionLoading === user.id}
                        onClick={() => handleVerify(user.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors disabled:opacity-50 bg-green-500/10 text-green-600 hover:bg-green-500/20"
                      >
                        {actionLoading === user.id ? "Memproses..." : <><CheckCircle2 className="w-3.5 h-3.5" /> Setujui Verifikasi</>}
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
