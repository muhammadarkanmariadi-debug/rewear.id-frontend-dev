"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, UploadCloud } from "lucide-react";
import Link from "next/link";
import { productService } from "@/services";
import { toast } from "sonner";

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category_id: 1, // Fallback dummy
    condition: "",
    brand: "",
    size: "",
    description: "",
    price: "",
    weight: 1000, // Dummy weight for shipping cost
    stock: 1
  });

  // Basic image mock for UI purposes (actual file upload requires handling File objects and FormData)
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // 1. Create product
      const res = await productService.create({
        ...formData,
        price: Number(formData.price),
        weight: Number(formData.weight),
        stock: Number(formData.stock)
      });
      
      const productId = res?.data?.id;

      if (!res.status || !productId) {
         throw new Error(res.message || "Gagal membuat produk");
      }

      // 2. Upload Image if exists
      if (imageFile) {
         const fileData = new FormData();
         fileData.append("images[]", imageFile);
         await productService.uploadImages(productId, fileData);
      }

      toast.success("Produk berhasil ditambahkan!");
      router.push("/my-products");
      router.refresh();
      
    } catch (err: any) {
      toast.success(err.message || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
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
          <label className="bg-surface-container border-2 border-dashed border-border/60 hover:border-foreground/50 rounded-2xl aspect-square flex flex-col items-center justify-center transition-colors cursor-pointer text-muted-foreground hover:text-foreground group overflow-hidden relative">
            {imageFile ? (
               <img src={URL.createObjectURL(imageFile)} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <>
                <UploadCloud className="w-10 h-10 mb-3 group-hover:scale-110 transition-transform" />
                <p className="font-semibold text-sm">Unggah Foto Utama</p>
                <p className="text-xs text-center mt-1 px-4">Format: JPG, PNG. Maks 5MB.</p>
              </>
            )}
            <input type="file" accept="image/*" className="hidden" onChange={(e) => { 
                if (e.target.files && e.target.files[0]) setImageFile(e.target.files[0]); 
            }} />
          </label>
        </div>

        {/* Form Details */}
        <div className="md:col-span-2 space-y-6 bg-card border border-border p-6 sm:p-8 rounded-2xl shadow-sm">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold mb-1.5">Nama Produk</label>
              <input required type="text" placeholder="Cth: Kemeja Flanel Uniqlo Merah" 
                     value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})}
                     className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-foreground/20" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold mb-1.5">Kategori</label>
                <select required 
                        value={formData.category_id} onChange={e => setFormData({...formData, category_id: Number(e.target.value)})}
                        className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-foreground/20">
                  <option value={1}>Top (Kemeja, Kaos, Jaket)</option>
                  <option value={2}>Bottom (Celana, Rok)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold mb-1.5">Kondisi</label>
                <select required 
                        value={formData.condition} onChange={e => setFormData({...formData, condition: e.target.value})}
                        className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-foreground/20">
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
                <input type="text" placeholder="Cth: Uniqlo, H&M, Zara" 
                       value={formData.brand} onChange={e => setFormData({...formData, brand: e.target.value})}
                       className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-foreground/20" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1.5">Ukuran</label>
                <input required type="text" placeholder="Cth: M, L, XL, 32" 
                       value={formData.size} onChange={e => setFormData({...formData, size: e.target.value})}
                       className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-foreground/20" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold mb-1.5">Deskripsi Produk</label>
              <textarea required rows={5} placeholder="Jelaskan kondisi baju, cacat jika ada, dll..." 
                        value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}
                        className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-foreground/20 resize-none"></textarea>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold mb-1.5">Harga Jual (Rp)</label>
                <input required type="number" placeholder="Cth: 150000" 
                       value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})}
                       className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-foreground/20 font-bold" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1.5">Berat (Gram)</label>
                <input required type="number" placeholder="Cth: 500" 
                       value={formData.weight} onChange={e => setFormData({...formData, weight: Number(e.target.value)})}
                       className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-foreground/20" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Pajak platform (escrow) sebesar Rp3.000/- dibebankan kepada pembeli, bukan Anda.</p>
          </div>

          <div className="pt-6 border-t border-border">
             <button disabled={loading} type="submit" className="w-full h-12 bg-foreground text-background font-bold rounded-xl shadow-md hover:bg-foreground/90 transition-transform active:scale-[0.98] disabled:opacity-50">
               {loading ? "Menyimpan..." : "Tayangkan Produk"}
             </button>
          </div>
        </div>
      </div>
    </form>
  );
}
