"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { orderService, shipmentService, paymentService } from "@/services";
import { useAuthStore } from "@/stores";
import { Truck } from "lucide-react";
import { toast } from "sonner";

export function OrderActions({ order }: { order: any }) {
  const router = useRouter();
  const { user } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState("");
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const autoTriggerRef = useRef(false);

  const isSeller = order.seller_id === user?.id || order.seller?.id === user?.id;
  const isBuyer = order.buyer_id === user?.id || order.buyer?.id === user?.id;

  // Auto-trigger payment on mount
  useEffect(() => {
    if (order.status === "pending_payment" && isBuyer && !autoTriggerRef.current) {
      autoTriggerRef.current = true;
      
      // Wait for snap.js to load if not available yet
      const triggerWithRetry = (retries = 5) => {
        // @ts-ignore
        if (window.snap) {
          handlePay();
        } else if (retries > 0) {
          setTimeout(() => triggerWithRetry(retries - 1), 500);
        }
      };

      triggerWithRetry();
    }
  }, [order.status, isBuyer]);

  // Timer logic for pending_payment
  useEffect(() => {
    if (order.status !== "pending_payment" || !isBuyer) return;

    const expiryTime = order.payment?.expired_at 
      ? new Date(order.payment.expired_at).getTime()
      : new Date(order.created_at).getTime() + 24 * 60 * 60 * 1000;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = expiryTime - now;

      if (distance < 0) {
        setTimeLeft(0);
        clearInterval(interval);
      } else {
        setTimeLeft(distance);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [order, isBuyer]);

  const formatTimeLeft = (ms: number) => {
    const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const handlePay = async () => {
    setIsSubmitting(true);
    try {
      const payRes = await paymentService.initiate(order.id);
      
      if (!payRes.status || !payRes.data?.snap_token) {
        toast.error("Gagal memulai pembayaran. Silakan coba lagi.");
        return;
      }

      // @ts-ignore
      if (window.snap) {
        // @ts-ignore
        window.snap.pay(payRes.data.snap_token, {
          onSuccess: (result: any) => {
            toast.success("payment success", result);
            router.refresh();
          },
          onPending: (result: any) => {
            toast.info("payment pending", result);
            router.refresh();
          },
          onError: (result: any) => {
            toast.error("payment error", result);
            toast.error("Pembayaran gagal.");
          },
          onClose: () => {
            toast.warning("customer closed the popup without finishing the payment");
          },
        });
      } else {
        alert("Midtrans Snap tidak termuat.");
      }
    } catch (e: any) {
      alert("Terjadi kesalahan: " + e.message);
    } finally {
      setIsSubmitting(false);
    }
  };

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

  if (isBuyer && order.status === "pending_payment") {
    return (
      <div className="mt-8 pt-6 border-t border-border/50">
        <div className="bg-foreground/5 rounded-2xl p-6 mb-4">
          <p className="text-sm font-medium text-center mb-1">Batas Waktu Pembayaran</p>
          <p className="text-3xl font-mono font-bold text-center tracking-wider">
            {timeLeft !== null ? (timeLeft > 0 ? formatTimeLeft(timeLeft) : "EXPIRED") : "--:--:--"}
          </p>
        </div>
        
        <button 
           onClick={handlePay}
           disabled={isSubmitting || (timeLeft !== null && timeLeft <= 0)}
           className="w-full bg-foreground text-background font-bold h-12 rounded-xl transition-all shadow-md hover:bg-foreground/90 active:scale-95 disabled:opacity-50"
        >
          {isSubmitting ? "Memproses..." : "Perbarui & Bayar Sekarang"}
        </button>

        <p className="text-[10px] text-muted-foreground text-center mt-3 leading-relaxed">
          Selesaikan pembayaran sebelum waktu habis agar pesanan tidak dibatalkan otomatis oleh sistem.
        </p>
      </div>
    );
  }

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
