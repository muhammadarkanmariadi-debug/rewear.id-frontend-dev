"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { orderService, shipmentService } from "@/services";
import { Truck } from "lucide-react";

export function OrderActions({ order, currentUser }: { order: any, currentUser: any }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState("");

  const isSeller = order.seller_id === currentUser?.id;
  const isBuyer = order.buyer_id === currentUser?.id;

  const handleConfirmReceived = async () => {
    if (!confirm("Konfirmasi bahwa Anda telah menerima barang dengan baik. Dana akan diteruskan ke penjual. Lanjutkan?")) return;
    
    setIsSubmitting(true);
    try {
      const res = await orderService.confirmDelivery(order.id);
      if (res.status) {
         router.refresh();
      } else {
         alert("Gagal mengonfirmasi");
      }
    } catch (e: any) {
      alert("Error: " + e.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddTracking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber) return alert("Masukkan resi");

    setIsSubmitting(true);
    try {
      const res = await shipmentService.addTracking(order.id, order.courier || "jne", order.courier_service || "REG", trackingNumber);
      if (res.status) {
         router.refresh();
      } else {
         alert("Gagal menambah resi");
      }
    } catch (e: any) {
      alert("Error: " + e.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isBuyer && order.status === "shipped") {
     return (
        <div className="mt-8 pt-6 border-t border-border/50">
          <button 
             onClick={handleConfirmReceived}
             disabled={isSubmitting}
             className="w-full bg-foreground text-background font-bold h-12 rounded-xl transition-all shadow-md hover:bg-foreground/90 active:scale-95 disabled:opacity-50"
          >
            {isSubmitting ? "Memproses..." : "Konfirmasi Barang Diterima"}
          </button>
        </div>
     );
  }

  if (isSeller && order.status === "paid") {
     return (
        <div className="mt-8 pt-6 border-t border-border/50 space-y-4">
          <h4 className="font-bold text-sm">Update Resi Pengiriman</h4>
          <form onSubmit={handleAddTracking} className="flex gap-2">
            <input 
              required
              type="text" 
              value={trackingNumber}
              onChange={e => setTrackingNumber(e.target.value)}
              placeholder="Masukkan nomor resi..." 
              className="flex-1 bg-background border border-border rounded-lg text-sm px-3 outline-none focus:border-primary"
            />
            <button 
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-foreground text-background text-sm font-bold rounded-lg hover:bg-foreground/90 disabled:opacity-50 whitespace-nowrap"
            >
              Kirim Pesanan
            </button>
          </form>
        </div>
     );
  }

  return null;
}
