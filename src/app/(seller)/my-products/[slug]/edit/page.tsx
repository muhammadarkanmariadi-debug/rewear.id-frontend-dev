/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, UploadCloud, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { CldUploadWidget } from "next-cloudinary";
import { useCategories, useProductDetail, useUpdateProduct } from "@/hooks/api/use-product";

export default function EditProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const router = useRouter();
  const { slug } = use(params);

  const { data: resDetail, isLoading: loadingDetail } = useProductDetail(slug);
  const product = resDetail?.data;

  const [formData, setFormData] = useState({
    title: "",
    category_id: "",
    condition: "",
    brand: "",
    size: "",
    description: "",
    price: "",
    weight: 1000, 
    stock: 1
  });
  const { data: resCat } = useCategories();
  const categories = resCat?.data || [];

  const { mutate: updateProduct, isPending: loading } = useUpdateProduct();

  const [imageUrls, setImageUrls] = useState<string[]>([]);

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title || "",
        category_id: product.category_id || "",
        condition: product.condition || "",
        brand: product.brand || "",
        size: product.size || "",
        description: product.description || "",
        price: product.price?.toString() || "",
        weight: product.weight_grams || 1000,
        stock: product.stock || 1
      });
      if (product.images && product.images.length > 0) {
        setImageUrls(product.images.map((img: any) => img.image_url || img));
      }
    }
  }, [product]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (imageUrls.length === 0) {
      toast.error("Silakan unggah foto produk terlebih dahulu.");
      return;
    }

    const payload: Record<string, any> = {
      title: formData.title,
      brand: formData.brand || null,
      category_id: formData.category_id,
      condition: formData.condition,
      size: formData.size,
      description: formData.description,
      price: Number(formData.price),
      weight_grams: Number(formData.weight),
      stock: Number(formData.stock),
      images: imageUrls
    };

    updateProduct({ id: product.id, data: payload }, {
      onSuccess: () => {
        router.push("/my-products");
        router.refresh();
      }
    });
  };

  if (loadingDetail) {
    return <div className="p-8 text-center text-muted-foreground">Memuat detail produk...</div>;
  }

  if (!product) {
    return <div className="p-8 text-center text-red-500 font-bold">Produk tidak ditemukan</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
      <div>
        <Link href="/my-products" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Katalog
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Edit Produk</h1>
        <p className="text-muted-foreground mt-1">Ubah detail barang yang Anda jual.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Foto Produk */}
        <div className="md:col-span-1 space-y-4">
          <CldUploadWidget 
             uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "rewear_unsigned"}
             onSuccess={(result: any) => {
                if (result.info?.secure_url) {
                  setImageUrls(prev => {
                     if (prev.length >= 5) {
                        toast.warning("Maksimal 5 foto produk.");
                        return prev;
                     }
                     return [...prev, result.info.secure_url];
                  });
                }
             }}
             options={{ maxFiles: 5, multiple: true }}
          >
             {({ open }) => (
                <div 
                   onClick={() => {
                      if (imageUrls.length < 5) open();
                   }}
                   className={`bg-surface-container border-2 border-dashed border-border/60 rounded-2xl aspect-square flex flex-col items-center justify-center transition-colors text-muted-foreground relative overflow-hidden ${imageUrls.length >= 5 ? 'cursor-not-allowed opacity-50' : 'hover:border-foreground/50 hover:text-foreground cursor-pointer group'}`}
                >
                   <UploadCloud className={`w-10 h-10 mb-3 ${imageUrls.length < 5 ? 'group-hover:scale-110' : ''} transition-transform`} />
                   <p className="font-semibold text-sm">Unggah Foto Produk</p>
                   <p className="text-xs text-center mt-1 px-4">Maks 5 Foto. Format: JPG, PNG.</p>
                </div>
             )}
          </CldUploadWidget>
          
          {imageUrls.length > 0 && (
             <div className="grid grid-cols-3 gap-2">
                {imageUrls.map((url, i) => (
                   <div key={i} className="relative aspect-square border border-border rounded-lg overflow-hidden">
                      <Image src={url} alt={`Preview ${i}`} fill className="object-cover" sizes="(max-width: 150px) 100vw, 150px" />
                      <button type="button" onClick={() => setImageUrls(prev => prev.filter((_, idx) => idx !== i))} className="absolute top-1 right-1 bg-black/50 hover:bg-red-500 text-white rounded-full p-1 transition-colors">
                         <X className="w-3 h-3" />
                      </button>
                   </div>
                ))}
             </div>
          )}
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
                        value={formData.category_id} onChange={e => setFormData({...formData, category_id: e.target.value})}
                        className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-foreground/20">
                  <option value="">Pilih Kategori</option>
                  {categories.map((cat: any) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold mb-1.5">Kondisi</label>
                <select required 
                        value={formData.condition} onChange={e => setFormData({...formData, condition: e.target.value})}
                        className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-foreground/20">
                  <option value="">Pilih Kondisi</option>
                  <option value="new_with_tag">Baru dengan Tag</option>
                  <option value="like_new">Seperti Baru</option>
                  <option value="good">Bagus</option>
                  <option value="fair">Cukup Baik</option>
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
                <input required type="text" placeholder="Cth: 150.000" 
                       value={formData.price ? new Intl.NumberFormat("id-ID").format(Number(formData.price)) : ""} 
                       onChange={e => setFormData({...formData, price: e.target.value.replace(/\D/g, "")})}
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
               {loading ? "Menyimpan Perubahan..." : "Simpan Perubahan"}
             </button>
          </div>
        </div>
      </div>
    </form>
  );
}
