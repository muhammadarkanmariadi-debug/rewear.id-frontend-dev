"use client";

import { useEffect, useState, useCallback } from "react";
import { adminService } from "@/services";
import { toast } from "sonner";
import { Search, Ban, Undo2, ShieldCheck, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";
import { DataPagination } from "@/widgets/data-pagination";

interface User {
  id: string;
  name: string;
  email: string;
  is_seller: boolean;
  is_seller_verified: boolean;
  is_banned: boolean;
  created_at: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [perPage, setPerPage] = useState(15);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const res = await adminService.getUsers({ search, page: currentPage, per_page: perPage });
      if (res.data) {
        setUsers(res.data);
        if (res.meta?.last_page) setLastPage(res.meta.last_page);
      }
    } catch {
      toast.error("Gagal memuat pengguna.");
    } finally {
      setLoading(false);
    }
  }, [search, currentPage, perPage]);

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchUsers();
    }, 500);
    return () => clearTimeout(delay);
  }, [fetchUsers]);

  const handleBan = async (id: string, isBanned: boolean) => {
    if (!window.confirm(`Yakin ingin ${isBanned ? 'membuka blokir' : 'memblokir'} pengguna ini?`)) return;
    try {
      setActionLoading(id);
      if (isBanned) {
        await adminService.unbanUser(id);
        toast.success("Pengguna berhasil dibuka blokirnya.");
      } else {
        await adminService.banUser(id);
        toast.success("Pengguna berhasil diblokir.");
      }
      fetchUsers();
    } catch {
      toast.error("Gagal mengubah status pengguna.");
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Manajemen Pengguna</h2>
          <p className="text-muted-foreground mt-1">Kelola dan awasi aktivitas pengguna di platform.</p>
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
                <th className="px-6 py-4">Peran</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Bergabung</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading && users.length === 0 ? (
                <tr>
                   <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">Memuat data...</td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                   <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">Tidak ada pengguna ditemukan.</td>
                </tr>
              ) : users.map((user) => (
                <tr key={user.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg shrink-0">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {user.is_seller ? (
                       <span className="flex items-center gap-1.5 text-blue-600 bg-blue-500/10 px-2 py-1 rounded font-bold text-xs w-max">
                         <ShieldCheck className="w-3 h-3" /> Seller {user.is_seller_verified && <CheckCircle2 className="w-3 h-3 text-green-500"/>}
                       </span>
                    ) : (
                       <span className="text-muted-foreground font-semibold text-xs">Buyer</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {user.is_banned ? (
                       <span className="text-red-500 bg-red-500/10 px-2 py-1 rounded font-bold text-xs">Banned</span>
                    ) : (
                       <span className="text-green-500 bg-green-500/10 px-2 py-1 rounded font-bold text-xs">Aktif</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-xs text-muted-foreground">
                    {user.created_at ? format(new Date(user.created_at), "dd MMM yyyy") : "-"}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end">
                      <button
                        disabled={actionLoading === user.id}
                        onClick={() => handleBan(user.id, user.is_banned)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors disabled:opacity-50 ${
                          user.is_banned 
                            ? "bg-green-500/10 text-green-600 hover:bg-green-500/20"
                            : "bg-red-500/10 text-red-600 hover:bg-red-500/20"
                        }`}
                      >
                        {actionLoading === user.id ? "Memproses..." : user.is_banned ? <><Undo2 className="w-3.5 h-3.5" /> Buka Blokir</> : <><Ban className="w-3.5 h-3.5" /> Blokir</>}
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
