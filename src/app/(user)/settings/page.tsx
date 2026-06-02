"use client";

import { Camera, CheckCircle2, MapPin, Plus, Trash2, Edit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useProfileSettings } from "@/shared/hooks/use-profile-settings";
import { useAddressForm } from "@/shared/hooks/use-address-form";

export default function SettingsPage() {
  const {
    user, name, setName, phone, setPhone,
    savingSettings, handleSaveProfile,
    addresses, loading, fetchData, handleDeleteAddress
  } = useProfileSettings();

  const {
    showModal, form, provinces, availableCities, isSubmitting,
    handleOpen, handleClose, handleChange, handleSubmit
  } = useAddressForm(fetchData);

  if (loading) return <div className="p-8 text-center">Loading settings...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Pengaturan Akun</h1>
        <p className="text-muted-foreground mt-1">Sesuaikan profil publik dan detail pengiriman Anda.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* L E F T : Avatar & Verification */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-col items-center text-center">
            
            <div className="relative group cursor-pointer mb-4">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-surface-container bg-surface-container relative">
                <Image src={user?.avatar || `https://api.dicebear.com/7.x/notionists/svg?seed=${user?.name}`} alt="Avatar" fill className="object-cover" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center text-white transition-opacity">
                   <Camera className="w-6 h-6 mb-1" />
                   <span className="text-xs font-bold">Ubah Foto</span>
                </div>
              </div>
            </div>

            <h2 className="font-bold text-lg">{user?.name || "User"}</h2>
            <p className="text-muted-foreground text-sm font-medium mt-1">{user?.email}</p>
            
            {user?.is_seller_verified ? (
              <div className="mt-6 flex items-center justify-center gap-2 bg-green-500/10 border border-green-500/20 text-green-600 font-bold text-sm px-4 py-2 rounded-full w-full">
                 <CheckCircle2 className="w-4 h-4" />
                 Seller Terverifikasi
              </div>
            ) : (
              <div className="mt-6 w-full">
                 <Link href="/seller-verification" className="flex items-center justify-center gap-2 bg-foreground text-background font-bold text-sm px-4 py-2.5 rounded-full w-full hover:bg-foreground/90 transition-colors">
                   {user?.is_seller ? "Lihat Status Verifikasi" : "Verifikasi Akun Seller"}
                 </Link>
                 <p className="text-xs text-muted-foreground mt-3 text-center">Tingkatkan akun untuk mulai berjualan dan jangkau ribuan pembeli.</p>
              </div>
            )}
            {user?.is_seller_verified && (
               <p className="text-xs text-muted-foreground mt-3">Sistem Escrow kami melindungi setiap transaksi Anda.</p>
            )}
          </div>
        </div>

        {/* R I G H T : Profile Form & Address List */}
        <div className="md:col-span-2 space-y-8">
          
          <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-border bg-surface-container/30">
               <h3 className="font-bold">Detail Profil</h3>
            </div>
            
            <div className="p-6 space-y-6">
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold mb-1.5">Nama Lengkap</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-foreground/20 font-medium" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-1.5">Email</label>
                    <input type="text" value={user?.email || ""} className="w-full bg-muted/50 border border-border rounded-xl px-4 py-2.5 text-sm outline-none text-muted-foreground font-medium cursor-not-allowed" readOnly />
                  </div>
               </div>

               <div>
                 <label className="block text-sm font-bold mb-1.5">Nomor Handphone</label>
                 <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-foreground/20 font-medium" placeholder="08..." />
               </div>
            </div>

            <div className="p-6 border-t border-border bg-surface-container/30 flex justify-end gap-3">
               <button 
                 onClick={handleSaveProfile}
                 disabled={savingSettings}
                 className="px-6 py-2.5 rounded-xl font-bold bg-foreground text-background shadow-md hover:bg-foreground/90 transition-transform active:scale-95 disabled:opacity-50"
               >
                 {savingSettings ? "Menyimpan..." : "Simpan Perubahan"}
               </button>
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
             <div className="p-6 border-b border-border flex justify-between items-center">
                <h3 className="font-bold">Daftar Alamat</h3>
                <button 
                  onClick={() => handleOpen()}
                  className="px-4 py-2 bg-primary text-primary-foreground text-sm font-bold rounded-lg hover:bg-primary/90 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4"/> Tambah
                </button>
             </div>
             <div className="p-6 flex flex-col gap-4">
                {addresses.length === 0 ? (
                  <div className="text-center text-muted-foreground text-sm py-4">Belum ada alamat tersimpan.</div>
                ) : (
                  addresses.map(a => (
                    <div key={a.id} className="border border-border rounded-xl p-4 flex justify-between items-start">
                       <div className="space-y-1">
                          <p className="font-bold flex items-center gap-2">
                            {a.label} {a.is_default && <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full inline-block">Utama</span>}
                          </p>
                          <p className="text-sm font-medium">{a.recipient_name} - {a.phone}</p>
                          <p className="text-sm text-muted-foreground">{a.full_address}</p>
                          <p className="text-sm text-muted-foreground">{a.district}, {a.city?.name || a.city_id}, {a.province?.name || a.province_id} {a.postal_code}</p>
                       </div>
                       <div className="flex items-center gap-2">
                          <button 
                            className="p-2 bg-muted rounded-md hover:bg-muted/80 text-foreground"
                            onClick={() => handleOpen(a)}
                          >
                             <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            className="p-2 bg-red-500/10 rounded-md hover:bg-red-500/20 text-red-500"
                            onClick={() => handleDeleteAddress(a.id)}
                          >
                             <Trash2 className="w-4 h-4" />
                          </button>
                       </div>
                    </div>
                  ))
                )}
             </div>
          </div>

        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
           <div className="bg-background rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl relative max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-border sticky top-0 bg-background z-10">
                 <h3 className="font-bold text-lg">{form.label ? "Edit Alamat" : "Tambah Alamat Baru"}</h3>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium">Label Alamat</label>
                      <input required type="text" name="label" value={form.label} onChange={handleChange} placeholder="Rumah, Kantor..." className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium">Nama Penerima</label>
                      <input required type="text" name="recipient_name" value={form.recipient_name} onChange={handleChange} className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary" />
                    </div>
                 </div>

                 <div className="space-y-1.5">
                    <label className="text-sm font-medium">Nomor Handphone</label>
                    <input required type="text" name="phone" value={form.phone} onChange={handleChange} className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary" />
                 </div>

                 <div className="space-y-1.5">
                    <label className="text-sm font-medium">Alamat Lengkap</label>
                    <textarea required rows={3} name="full_address" value={form.full_address} onChange={handleChange} className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary" placeholder="Jalan, RT/RW, Patokan..." />
                 </div>
                 
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium">Provinsi</label>
                      <select required name="province_id" value={form.province_id} onChange={handleChange} className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary">
                        <option value="0" disabled>-- Pilih Provinsi --</option>
                        {provinces.map(p => (
                          <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium">Kota/Kabupaten</label>
                      <select required name="city_id" value={form.city_id} onChange={handleChange} disabled={!form.province_id} className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary disabled:opacity-50">
                        <option value="0" disabled>-- Pilih Kota --</option>
                        {availableCities.map(c => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium">Kecamatan</label>
                      <input required type="text" name="district" value={form.district} onChange={handleChange} className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium">Kode Pos</label>
                      <input required type="text" name="postal_code" value={form.postal_code} onChange={handleChange} className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary" />
                    </div>
                 </div>

                 <div className="flex items-center gap-2 pt-2">
                    <input type="checkbox" id="is_default" name="is_default" checked={form.is_default} onChange={handleChange} className="rounded text-primary w-4 h-4 cursor-pointer" />
                    <label htmlFor="is_default" className="text-sm font-medium cursor-pointer">Jadikan Alamat Utama</label>
                 </div>

                 <div className="flex justify-end gap-3 pt-4 border-t border-border mt-4">
                    <button type="button" onClick={handleClose} disabled={isSubmitting} className="px-4 py-2 rounded-lg font-bold bg-muted hover:bg-muted/80">Batal</button>
                    <button type="submit" disabled={isSubmitting || form.province_id === 0 || form.city_id === 0} className="px-4 py-2 rounded-lg font-bold bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50">
                      {isSubmitting ? "Menyimpan..." : "Simpan Alamat"}
                    </button>
                 </div>
              </form>
           </div>
        </div>
      )}

    </div>
  );
}
