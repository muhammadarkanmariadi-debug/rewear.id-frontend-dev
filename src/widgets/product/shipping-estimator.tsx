import { Truck, MapPin } from "lucide-react";

export function ShippingEstimator() {
  return (
    <div className="rounded-xl border border-border bg-card p-5 mt-6">
      <div className="flex items-center gap-2 mb-4">
        <Truck className="w-5 h-5 text-muted-foreground" />
        <h4 className="font-semibold text-sm">Estimasi Ongkos Kirim</h4>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
            <MapPin className="w-4 h-4" />
          </div>
          <input 
            type="text" 
            placeholder="Masukkan Kecamatan/Kota" 
            className="w-full text-sm h-10 pl-9 pr-3 rounded-md border border-border bg-background focus:ring-1 focus:ring-primary outline-none"
          />
        </div>
        <button className="h-10 px-4 flex items-center justify-center bg-muted text-foreground text-sm font-medium rounded-md hover:bg-muted/80 transition-colors whitespace-nowrap">
          Cek Ongkir
        </button>
      </div>

      <div className="mt-4 p-3 bg-surface-container-low rounded-md border border-border/50 text-xs text-muted-foreground flex gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
        <p>Pengiriman tersedia ke seluruh Indonesia. Diproses dengan GoSend, JNE, SiCepat, atau J&T sesuai preferensi checkout.</p>
      </div>
    </div>
  );
}
