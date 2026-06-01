"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Truck, ShieldCheck, CreditCard } from "lucide-react";
import { formatRupiah } from "@/shared/utils/format";
import { addressService, shipmentService, orderService } from "@/services";

// Mocks or simple list for options
const COURIER_OPTIONS = [
  { value: "jne", label: "JNE Express" },
  { value: "jnt", label: "J&T Express" },
  { value: "sicepat", label: "SiCepat Ekspres" },
  { value: "pos", label: "POS Indonesia" },
];

export function CheckoutClient({ product }: { product: any }) {
  const router = useRouter();
  
  const [addresses, setAddresses] = useState<any[]>([]);
  const [loadingAddresses, setLoadingAddresses] = useState(true);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  
  const [selectedCourier, setSelectedCourier] = useState<string>("");
  const [shippingServices, setShippingServices] = useState<any[]>([]);
  const [loadingShipping, setLoadingShipping] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function loadAddresses() {
      try {
        const res = await addressService.getAll();
        if (res.status && res.data) {
          setAddresses(res.data);
          const primary = res.data.find((a: any) => a.is_primary);
          if (primary) setSelectedAddressId(primary.id);
          else if (res.data.length > 0) setSelectedAddressId(res.data[0].id);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoadingAddresses(false);
      }
    }
    loadAddresses();
  }, []);

  const handleCourierChange = async (courier: string) => {
    setSelectedCourier(courier);
    setSelectedService(null);
    setShippingServices([]);
    
    if (!selectedAddressId) return alert("Pilih alamat terlebih dahulu");

    setLoadingShipping(true);
    try {
      // In a real scenario, the backend calculates cost based on product.id and address_id
      const res = await shipmentService.getShippingCost({
        address_id: selectedAddressId,
        product_id: product.id,
        courier: courier
      });
      // Mocking response structure if backend is not ready, ideally: res.data.services
      if (res.status && res.data) {
         // Some APIs return array directly or wrapped in data.costs
         const services = Array.isArray(res.data) ? res.data : (res.data.costs || []);
         setShippingServices(services.length > 0 ? services : [
           { service: "REG", description: "Layanan Reguler", cost: 25000, etd: "2-3 Hari" }
         ]);
      } else {
         // Fallback mock
         setShippingServices([{ service: "REG", description: "Layanan Reguler", cost: 20000, etd: "2-3 Hari" }]);
      }
    } catch (e) {
      console.error(e);
      setShippingServices([{ service: "REG", description: "Reguler (Fallback)", cost: 20000, etd: "1-3 Hari" }]);
    } finally {
      setLoadingShipping(false);
    }
  };

  const handleCreateOrder = async () => {
    if (!selectedAddressId || !selectedCourier || !selectedService) {
      return alert("Silakan lengkapi alamat dan kurir!");
    }

    setIsSubmitting(true);
    try {
      const payload = {
        product_id: product.id,
        address_id: selectedAddressId,
        courier: selectedCourier,
        courier_service: selectedService.service,
        notes: ""
      };
      const res = await orderService.create(payload);
      if (res.status && res.data) {
        // Assume API returns early order record, redirect to payment / dashboard
        router.push(`/orders/${res.data.id || res.data.order_id}`);
      } else {
        alert(res.message || "Gagal membuat pesanan");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan pada server");
    } finally {
      setIsSubmitting(false);
    }
  };

  const SHIPPING_COST = selectedService ? selectedService.cost : 0;
  const ESCROW_FEE = 3000;
  const TOTAL_PRICE = Number(product.price) + SHIPPING_COST + ESCROW_FEE;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
      {/* L E F T : Details */}
      <div className="lg:col-span-2 flex flex-col gap-6">
        
        {/* Alamat Pengiriman */}
        <div className="border border-border bg-card rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold mb-4 flex items-center gap-2"><MapPin className="w-5 h-5"/> Alamat Pengiriman</h3>
          {loadingAddresses ? (
            <p className="text-sm text-muted-foreground">Memuat alamat...</p>
          ) : addresses.length === 0 ? (
            <div className="text-sm">
              Kamu belum memiliki alamat. <Link href="/settings" className="text-primary font-bold underline">Tambah di Pengaturan</Link>
            </div>
          ) : (
            <div className="space-y-3">
              {addresses.map(a => (
                <label key={a.id} className={`flex items-start gap-4 p-4 border rounded-xl cursor-pointer transition-colors ${selectedAddressId === a.id ? 'border-foreground bg-foreground/5' : 'border-border'}`}>
                  <input type="radio" name="address" checked={selectedAddressId === a.id} onChange={() => setSelectedAddressId(a.id)} className="mt-1" />
                  <div>
                    <p className="font-bold flex items-center gap-2 text-sm">{a.title} {a.is_primary && <span className="bg-primary/10 text-primary text-xs px-2 rounded-full">Utama</span>}</p>
                    <p className="text-sm font-medium">{a.recipient_name} - {a.phone_number}</p>
                    <p className="text-sm text-muted-foreground line-clamp-2">{a.full_address}, {a.city?.name}, {a.province?.name}</p>
                  </div>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Produk yang Dibeli */}
        <div className="border border-border bg-card rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold mb-4">Detail Produk</h3>
          <div className="flex gap-4">
            <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-surface-container shrink-0 border border-border/50">
              <Image src={(product.images && product.images[0]) || ""} alt={product.title} fill sizes="80px" className="object-cover" />
            </div>
            <div>
              <h4 className="font-semibold text-sm line-clamp-2 mb-1">{product.title}</h4>
              <p className="text-sm text-muted-foreground mb-2">Penjual: {product.seller?.name}</p>
              <p className="font-bold">{formatRupiah(Number(product.price))}</p>
            </div>
          </div>
        </div>

        {/* Opsi Pengiriman */}
        <div className="border border-border bg-card rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold mb-4 flex items-center gap-2"><Truck className="w-5 h-5"/> Pilihan Pengiriman</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
             {COURIER_OPTIONS.map(c => (
               <label key={c.value} className={`border rounded-xl p-3 text-center cursor-pointer transition-colors ${selectedCourier === c.value ? 'bg-foreground text-background border-foreground font-bold' : 'bg-surface-container/50 border-border'}`}>
                 <input type="radio" className="hidden" checked={selectedCourier === c.value} onChange={() => handleCourierChange(c.value)} />
                 <span className="text-sm">{c.label}</span>
               </label>
             ))}
          </div>

          {loadingShipping && <p className="text-sm text-muted-foreground">Menghitung ongkos kirim...</p>}
          
          {shippingServices.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold mt-4 mb-2">Layanan yang Tersedia</h4>
              {shippingServices.map((s, idx) => (
                <label key={idx} className={`flex justify-between items-center p-4 border rounded-xl cursor-pointer ${selectedService?.service === s.service ? 'border-foreground bg-foreground/5' : 'border-border'}`}>
                  <div className="flex items-center gap-3">
                    <input type="radio" name="service" checked={selectedService?.service === s.service} onChange={() => setSelectedService(s)} />
                    <div>
                      <p className="font-bold text-sm">{s.service} <span className="text-muted-foreground font-normal">({s.description})</span></p>
                      <p className="text-xs text-muted-foreground mt-0.5">Estimasi: {s.etd}</p>
                    </div>
                  </div>
                  <p className="font-bold">{formatRupiah(s.cost)}</p>
                </label>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* R I G H T : Summary */}
      <div className="lg:col-span-1">
        <div className="sticky top-28 border border-border bg-card rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold mb-4 text-lg">Ringkasan Belanja</h3>
          
          <div className="flex flex-col gap-3 text-sm mb-6 border-b border-border/50 pb-6">
            <div className="flex justify-between text-muted-foreground">
              <span>Total Harga (1 Barang)</span>
              <span>{formatRupiah(Number(product.price))}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Total Ongkos Kirim</span>
              <span>{SHIPPING_COST > 0 ? formatRupiah(SHIPPING_COST) : "-"}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Biaya Escrow (Admin)</span>
              <span>{formatRupiah(ESCROW_FEE)}</span>
            </div>
          </div>

          <div className="flex justify-between font-bold text-lg mb-6">
            <span>Total Tagihan</span>
            <span>{formatRupiah(TOTAL_PRICE)}</span>
          </div>

          <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-3 mb-6 flex items-start gap-2">
            <ShieldCheck className="w-5 h-5 text-green-500 shrink-0" />
            <p className="text-xs text-green-700 dark:text-green-400 font-medium leading-relaxed">
              Pembayaran dikunci di sistem Rekber (Escrow). Dana diteruskan ke penjual hanya jika barang sesuai.
            </p>
          </div>

          <button 
            onClick={handleCreateOrder}
            disabled={isSubmitting || !selectedService}
            className="w-full flex items-center justify-center h-12 bg-foreground text-background font-bold rounded-xl hover:bg-foreground/90 transition-transform active:scale-95 shadow-md disabled:opacity-50"
          >
            {isSubmitting ? "Memproses..." : "Mulai Bayar & Escrow"}
          </button>
        </div>
      </div>

    </div>
  );
}
