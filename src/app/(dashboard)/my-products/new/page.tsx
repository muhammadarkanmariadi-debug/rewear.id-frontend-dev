import { ArrowLeft, UploadCloud } from "lucide-react";
import Link from "next/link";

export default function NewProductPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <Link href="/my-products" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Katalog
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Tambah Produk Baru</h1>
        <p className="text-muted-foreground mt-1">Unggah foto dan isi detail barang yang ingin Anda jual.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Foto Produk */}
        <div className="md:col-span-1 space-y-4">
          <div className="bg-surface-container border-2 border-dashed border-border/60 hover:border-foreground/50 rounded-2xl aspect-square flex flex-col items-center justify-center transition-colors cursor-pointer text-muted-foreground hover:text-foreground group">
            <UploadCloud className="w-10 h-10 mb-3 group-hover:scale-110 transition-transform" />
            <p className="font-semibold text-sm">Unggah Foto Utama</p>
            <p className="text-xs text-center mt-1 px-4">Format: JPG, PNG. Maks 5MB.</p>
          </div>
          <div className="grid grid-cols-3 gap-3">
             <div className="bg-surface-container border-2 border-dashed border-border/60 rounded-xl aspect-square flex items-center justify-center cursor-pointer transition-colors hover:border-foreground/50">
               <span className="text-xl text-border/60 font-bold">+</span>
             </div>
             <div className="bg-surface-container border-2 border-dashed border-border/60 rounded-xl aspect-square flex items-center justify-center cursor-pointer transition-colors hover:border-foreground/50">
               <span className="text-xl text-border/60 font-bold">+</span>
             </div>
             <div className="bg-surface-container border-2 border-dashed border-border/60 rounded-xl aspect-square flex items-center justify-center cursor-pointer transition-colors hover:border-foreground/50">
               <span className="text-xl text-border/60 font-bold">+</span>
             </div>
          </div>
        </div>

        {/* Form Details */}
        <div className="md:col-span-2 space-y-6 bg-card border border-border p-6 sm:p-8 rounded-2xl shadow-sm">
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold mb-1.5">Nama Produk</label>
              <input type="text" placeholder="Cth: Kemeja Flanel Uniqlo Merah" className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-foreground/20" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold mb-1.5">Kategori</label>
                <select className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-foreground/20">
                  <option value="">Pilih Kategori</option>
                  <option value="baju">Top (Kemeja, Kaos, Jaket)</option>
                  <option value="celana">Bottom (Celana, Rok)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold mb-1.5">Kondisi</label>
                <select className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-foreground/20">
                  <option value="">Pilih Kondisi</option>
                  <option value="baru">Baru dengan Tag (NWT)</option>
                  <option value="bekas_baik">Bekas Sangat Baik (90%+)</option>
                  <option value="bekas">Bekas Pemakaian Wajar</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div>
                <label className="block text-sm font-bold mb-1.5">Merek (Opsional)</label>
                <input type="text" placeholder="Cth: Uniqlo, H&M, Zara" className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-foreground/20" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1.5">Ukuran</label>
                <input type="text" placeholder="Cth: M, L, XL, 32" className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-foreground/20" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold mb-1.5">Deskripsi Produk</label>
              <textarea rows={5} placeholder="Jelaskan kondisi baju, cacat jika ada, dll..." className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-foreground/20 resize-none"></textarea>
            </div>

            <div>
              <label className="block text-sm font-bold mb-1.5">Harga Jual (Rp)</label>
              <input type="number" placeholder="Cth: 150000" className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-foreground/20 font-bold" />
              <p className="text-xs text-muted-foreground mt-2">Pajak platform (escrow) sebesar Rp3.000/- dibebankan kepada pembeli, bukan Anda.</p>
            </div>
          </div>

          <div className="pt-6 border-t border-border">
             <button className="w-full h-12 bg-foreground text-background font-bold rounded-xl shadow-md hover:bg-foreground/90 transition-transform active:scale-[0.98]">
               Tayangkan Produk
             </button>
          </div>

        </div>
      </div>
    </div>
  );
}
