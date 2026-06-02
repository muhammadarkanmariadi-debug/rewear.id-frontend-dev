"use client";

import { useState } from "react";
import { Search, Trash2 } from "lucide-react";
import { formatRupiah } from "@/shared/utils/format";
import { DataPagination } from "@/widgets/data-pagination";
import { Product } from "@/entities";
import { useAdminProducts, useDeleteAdminProduct } from "@/hooks/api/use-admin";

export default function AdminProductsPage() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(15);

  const { data: res, isLoading: loading } = useAdminProducts({ search, page: currentPage, per_page: perPage });
  const products = res?.data || [];
  const lastPage = res?.meta?.last_page || 1;

  const { mutate: deleteProduct, isPending: actionLoading } = useDeleteAdminProduct();

  const handleDelete = (id: string) => {
    const reason = window.prompt("Alasan penghapusan produk (melanggar aturan, dll):");
    if (reason === null) return;
    deleteProduct({ id, reason: reason || "Melanggar kebijakan platform" });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Moderasi Produk</h2>
          <p className="text-muted-foreground mt-1">Pantau dan kelola katalog produk dari seluruh penjual.</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-border bg-surface-container/50">
          <div className="relative max-w-sm w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Cari nama produk..." 
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
                <th className="px-6 py-4">Informasi Produk</th>
                <th className="px-6 py-4">Penjual</th>
                <th className="px-6 py-4">Harga</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading && products.length === 0 ? (
                <tr>
                   <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">Memuat data...</td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                   <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">Tidak ada produk ditemukan.</td>
                </tr>
              ) : products.map((product: Product) => (
                <tr key={product.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-surface-container border border-border overflow-hidden shrink-0">
                        <img src={product.images?.[0]?.image_url || ""} alt={product.title} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground line-clamp-1 max-w-[250px]">{product.title}</h4>
                        <p className="text-xs text-muted-foreground mt-0.5">{product.category?.name || "Uncategorized"} • {product.size}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-xs">{product.seller?.name || "Unknown"}</p>
                  </td>
                  <td className="px-6 py-4 font-bold">{formatRupiah(Number(product.price))}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 font-bold rounded-md text-xs ${product.status === 'active' ? 'bg-green-500/10 text-green-500' : 'bg-gray-500/10 text-gray-500'}`}>
                      {product.status || "Aktif"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        disabled={actionLoading}
                        onClick={() => handleDelete(product.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors disabled:opacity-50 bg-red-500/10 text-red-600 hover:bg-red-500/20"
                      >
                        {actionLoading ? "Memproses..." : <><Trash2 className="w-3.5 h-3.5" /> Hapus Paksa</>}
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
