import { Camera, CheckCircle2 } from "lucide-react";
import Image from "next/image";

export default function SettingsPage() {
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
                <Image src="https://api.dicebear.com/7.x/notionists/svg?seed=Rizky" alt="Avatar" fill className="object-cover" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center text-white transition-opacity">
                   <Camera className="w-6 h-6 mb-1" />
                   <span className="text-xs font-bold">Ubah Foto</span>
                </div>
              </div>
            </div>

            <h2 className="font-bold text-lg">Rizky Firmansyah</h2>
            <p className="text-muted-foreground text-sm font-medium mt-1">@rizkyfir</p>
            
            <div className="mt-6 flex items-center justify-center gap-2 bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-500 font-bold text-sm px-4 py-2 rounded-full w-full">
               <CheckCircle2 className="w-4 h-4" />
               Akun Terverifikasi
            </div>
            <p className="text-xs text-muted-foreground mt-3">Identitas Anda sudah divalidasi dengan KTP, memastikan kepercayaan pembeli.</p>
          </div>
        </div>

        {/* R I G H T : Profile Form */}
        <div className="md:col-span-2">
          <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-border bg-surface-container/30">
               <h3 className="font-bold">Detail Profil</h3>
            </div>
            
            <div className="p-6 space-y-6">
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold mb-1.5">Nama Lengkap</label>
                    <input type="text" defaultValue="Rizky Firmansyah" className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-foreground/20 font-medium" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-1.5">Username</label>
                    <input type="text" defaultValue="rizkyfir" className="w-full bg-muted/50 border border-border rounded-xl px-4 py-2.5 text-sm outline-none text-muted-foreground font-medium cursor-not-allowed" readOnly />
                    <p className="text-xs text-muted-foreground mt-1.5">Username tidak dapat diubah.</p>
                  </div>
               </div>

               <div>
                 <label className="block text-sm font-bold mb-1.5">Nomor Handphone (WhatsApp)</label>
                 <input type="tel" defaultValue="08123456789" className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-foreground/20 font-medium" />
               </div>

               <div>
                 <label className="block text-sm font-bold mb-1.5">Alamat Pengiriman Utama</label>
                 <textarea rows={4} defaultValue="Jl. Mawar Merah No. 12, Kebayoran Baru, Jakarta Selatan, 12160, DKI Jakarta" className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-foreground/20 resize-none font-medium text-foreground leading-relaxed"></textarea>
               </div>
            </div>

            <div className="p-6 border-t border-border bg-surface-container/30 flex justify-end gap-3">
               <button className="px-6 py-2.5 rounded-xl font-bold bg-surface-container hover:bg-muted transition-colors">Batal</button>
               <button className="px-6 py-2.5 rounded-xl font-bold bg-foreground text-background shadow-md hover:bg-foreground/90 transition-transform active:scale-95">Simpan Perubahan</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
