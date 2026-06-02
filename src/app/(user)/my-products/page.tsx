import { formatRupiah } from "@/shared/utils/format";
import { Plus, Search, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { productService } from "@/services";

export default async function SellerProductsPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  
 
 
  const rawParams = await searchParams;
  const params: Record<string, string> = {};
  for (const k in rawParams) {
    if (typeof rawParams[k] === "string") {
      params[k] = rawParams[k] as string;
    }
  }

  const res = await productService.getSellerProducts(params);
  const products = res.data || [];


  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Katalog Produk</h1>
          <p className="text-muted-foreground mt-1">Kelola barang yang Anda jual di rewear.id.</p>
        </div>
        <Link href="/my-products/new" className="h-10 px-4 bg-foreground text-background font-bold text-sm flex items-center gap-2 rounded-xl hover:bg-foreground/90 transition-colors shadow-sm">
          <Plus className="w-4 h-4" /> Tambah Produk
        </Link>
      </div>

      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-4 justify-between bg-surface-container/50">
          <div className="relative max-w-sm w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Cari produk Anda..." 
              className="w-full pl-9 pr-4 h-9 bg-background border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="flex gap-2">
            <select className="h-9 px-3 bg-background border border-border rounded-lg text-sm outline-none">
               <option>Semua Kategori</option>
               <option>Baju</option>
               <option>Celana</option>
            </select>
            <select className="h-9 px-3 bg-background border border-border rounded-lg text-sm outline-none">
               <option>Status Aktif</option>
               <option>Habis / Terjual</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-surface-container text-muted-foreground text-xs uppercase font-bold border-b border-border">
              <tr>
                <th className="px-6 py-4">Info Produk</th>
                <th className="px-6 py-4">Harga</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {products.length === 0 ? (
                <tr>
                   <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">Belum ada produk.</td>
                </tr>
              ) : products.map((product: any) => (
                <tr key={product.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-surface-container border border-border overflow-hidden shrink-0">
                        <img src={product.images?.[0] || ""} alt={product.title} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground line-clamp-1 max-w-[250px]">{product.title}</h4>
                        <p className="text-xs text-muted-foreground mt-0.5">{product.category?.name || product.category_id} • {product.size}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold">{formatRupiah(Number(product.price))}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 bg-green-500/10 text-green-500 font-bold rounded-md text-xs">{product.status || "Aktif"}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end relative group cursor-pointer">
                      <MoreHorizontal className="w-5 h-5 text-muted-foreground hover:text-foreground" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

