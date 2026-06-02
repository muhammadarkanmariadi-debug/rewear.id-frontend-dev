import { OrdersClient } from "@/widgets/orders/order-client";
import { Suspense } from "react";


export default function OrdersPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Daftar Pesanan</h1>
        <p className="text-muted-foreground mt-1">
          Lacak pembelian Anda dan kelola pesanan masuk dari pembeli.
        </p>
      </div>
      <Suspense fallback={<p>Memuat Data...</p>}>   <OrdersClient /></Suspense>

    </div>
  );
}