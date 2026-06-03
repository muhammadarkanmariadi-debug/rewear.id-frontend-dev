import { notFound } from "next/navigation";
import { formatRupiah, formatDate } from "@/shared/utils/format";
import { ShieldCheck, MapPin, Package, ArrowLeft, Truck } from "lucide-react";
import Link from "next/link";
import { orderService, authService } from "@/services";
import { OrderActions } from "./order-actions";
import { TrackingTimeline } from "./tracking-timeline";
import { OrderStatusBadge, getOrderStatusStyle } from "@/widgets/orders/order-status-badge";
import { ExportReceiptButton } from "@/widgets/orders/export-receipt-button";

interface OrderPageProps {
  params: Promise<{ id: string }>;
}

export default async function OrderDetailPage({ params }: OrderPageProps) {
  const { id } = await params;

  // Retrieve current user and order concurrently
  const [currentUserRes, orderRes] = await Promise.all([
    authService.getMe(),
    orderService.getById(id)
  ]);

  const order = orderRes.data;
 

  if (!order) {
    notFound(); 
  }


  const addr = order.shipping_address || order.address;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 md:px-0">
      
      <Link href="/orders" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Kembali ke Daftar Pesanan
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Status Pesanan: ORD-{order.order_number || order.id.slice(0, 8).toUpperCase()}</h1>
          <p className="text-sm text-muted-foreground mt-1">Dibeli pada {formatDate(order.created_at)}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <ExportReceiptButton order={order} role={currentUserRes?.data?.id === order.seller_id ? 'seller' : 'buyer'} />
          <div className={`flex items-center gap-2 px-4 py-2 font-bold text-sm rounded-full shrink-0 uppercase ${getOrderStatusStyle(order.status)}`}>
            <Truck className="w-4 h-4" />
            {order.status.replace(/_/g, " ")}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* L E F T : Escrow Actions Timeline */}
        <div className="md:col-span-7">
          <div className="border border-border bg-card rounded-2xl p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/20">
                <ShieldCheck className="w-4 h-4 text-green-500" />
              </div>
              <h2 className="text-xl font-bold">Pelacakan Escrow & Resi</h2>
            </div>
            
            <div className="space-y-4">
              <p className="text-sm flex items-center gap-2">Status saat ini: <OrderStatusBadge status={order.status} /></p>
              {order.shipment?.tracking_number && (
                 <div className="space-y-4">
                   <p className="text-sm text-muted-foreground">
                     Resi terdaftar: {order.shipment.tracking_number} ({order.shipment.courier?.toUpperCase()})
                   </p>
                   <TrackingTimeline shipmentId={order.shipment.id} />
                 </div>
              )}
            </div>

            <OrderActions order={order} />
          </div>
        </div>

        {/* R I G H T : Order Info */}
        <div className="md:col-span-5 flex flex-col gap-6">
          <div className="border border-border bg-card rounded-2xl p-6 shadow-sm flex flex-col items-center text-center">
            {order.product?.images?.[0] && (
               <div className="w-24 h-24 relative rounded-xl overflow-hidden mb-4 border border-border/50">
                 <img 
                    src={typeof order.product.images[0] === 'string' ? order.product.images[0] : order.product.images[0].image_url} 
                    alt="Product" 
                    className="object-cover w-full h-full" 
                  />
               </div>
            )}
            <h3 className="font-bold text-lg mb-1 leading-tight">{order.product?.title || "Produk"}</h3>
            <p className="text-sm font-semibold text-foreground bg-surface-container rounded-md px-2 py-1 mt-2">
              Total Pembayaran: {formatRupiah(Number(order.total_amount || order.total_price))}
            </p>
          </div>

          <div className="border border-border bg-card rounded-2xl p-6 shadow-sm">
             <h3 className="font-bold mb-4 flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4" /> Alamat Tujuan
            </h3>
            <div className="text-sm text-muted-foreground leading-relaxed">
              <p className="font-semibold text-foreground mb-1">{addr?.recipient_name || order.buyer?.name} ({addr?.phone_number || addr?.phone || order.buyer?.phone})</p>
              <p>{addr?.full_address || addr?.address}</p>
              <p>{addr?.district}, {addr?.city?.name || addr?.city}</p>
            </div>
          </div>
          
          <div className="border border-border bg-card rounded-2xl p-6 shadow-sm">
             <h3 className="font-bold mb-4 flex items-center gap-2 text-sm">
              <Package className="w-4 h-4" /> Informasi Pengiriman
            </h3>
            <div className="text-sm text-muted-foreground leading-relaxed flex flex-col gap-2">
              <div className="flex justify-between">
                <span>Kurir</span>
                <span className="font-bold text-foreground capitalize">{order.shipment?.courier || order.courier || "-"}</span>
              </div>
              <div className="flex justify-between">
                <span>Layanan</span>
                <span className="font-bold text-foreground uppercase">{order.shipment?.service || order.courier_service || "-"}</span>
              </div>
              <div className="flex justify-between mt-2 pt-2 border-t">
                <span>Nomor Resi</span>
                <span className="font-bold text-foreground">{order.shipment?.tracking_number || "Belum ada"}</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

