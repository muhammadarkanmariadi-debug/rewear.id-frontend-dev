/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Download } from "lucide-react";
import { formatRupiah, formatDate } from "@/shared/utils/format";
import { useRef, useState } from "react";

interface ExportReceiptButtonProps {
  order: any;
  role?: string;
}

export function ExportReceiptButton({ order, role = "buyer" }: ExportReceiptButtonProps) {
  const [isExporting, setIsExporting] = useState(false);
  const receiptRef = useRef<HTMLDivElement>(null);

  const handleExport = async () => {
    if (!receiptRef.current) return;
    setIsExporting(true);

    try {
      const element = receiptRef.current;
      const opt = {
        margin: 0.5,
        filename: `Resi_${role === "buyer" ? "Pembelian" : "Penjualan"}_ORD-${order.id.slice(0, 8).toUpperCase()}.pdf`,
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' as const }
      };

      const html2pdf = (await import('html2pdf.js')).default;
      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error("Gagal export PDF:", error);
    } finally {
      setIsExporting(false);
    }
  };

  const addr = order.shipping_address || order.address;

  return (
    <>
      <button 
        onClick={handleExport}
        disabled={isExporting}
        className="flex items-center gap-2 px-4 py-2 bg-foreground text-background font-bold text-sm rounded-lg hover:bg-foreground/90 transition-colors disabled:opacity-50"
      >
        <Download className="w-4 h-4" />
        {isExporting ? "Mengekspor..." : `Export Resi ${role === "buyer" ? "Pembelian" : "Penjualan"}`}
      </button>

      {/* Hidden layout for PDF generation */}
      <div className="hidden">
        <div ref={receiptRef} className="p-8 max-w-2xl bg-white text-black mx-auto font-sans" style={{ width: '800px' }}>
          <div className="flex justify-between items-center border-b pb-4 mb-6">
            <div>
              <h1 className="text-3xl font-black tracking-tighter">rewear<span className="text-blue-600">.id</span></h1>
              <p className="text-gray-500 text-sm mt-1">Platform Thrifting Terpercaya</p>
            </div>
            <div className="text-right">
              <h2 className="text-xl font-bold uppercase text-gray-800">Resi {role === "buyer" ? "Pembelian" : "Penjualan"}</h2>
              <p className="text-sm font-bold text-gray-600 mt-1">ORD-{order.order_number || order.id.slice(0, 8).toUpperCase()}</p>
            </div>
          </div>

          <div className="flex justify-between mb-8 text-sm">
            <div>
              <p className="text-gray-500 mb-1">Tanggal Pesanan</p>
              <p className="font-bold">{formatDate(order.created_at)}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-500 mb-1">Status</p>
              <p className="font-bold uppercase">{order.status.replace(/_/g, " ")}</p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="font-bold border-b pb-2 mb-4">Informasi Pengiriman</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Penerima</p>
                <p className="font-bold">{addr?.recipient_name || order.buyer?.name}</p>
                <p>{addr?.phone_number || addr?.phone || order.buyer?.phone}</p>
              </div>
              <div>
                <p className="text-gray-500">Alamat</p>
                <p>{addr?.full_address || addr?.address}</p>
                <p>{addr?.district}, {addr?.city?.name || addr?.city}</p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="font-bold border-b pb-2 mb-4">Detail Layanan Pengiriman</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Kurir</p>
                <p className="font-bold uppercase">{order.shipment?.courier || order.courier || "-"}</p>
              </div>
              <div>
                <p className="text-gray-500">Nomor Resi</p>
                <p className="font-bold tracking-wider">{order.shipment?.tracking_number || "Belum ada resi"}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold border-b pb-2 mb-4">Detail Produk</h3>
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="py-2 px-4 border">Produk</th>
                  <th className="py-2 px-4 border w-32 text-right">Harga</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-3 px-4 border font-medium">
                    {order.product?.title || "Produk"}
                  </td>
                  <td className="py-3 px-4 border text-right font-bold">
                    {formatRupiah(Number(order.total_amount || order.total_price))}
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="bg-gray-50">
                  <td className="py-3 px-4 border text-right font-bold text-gray-600">Total Pembayaran</td>
                  <td className="py-3 px-4 border text-right font-bold text-lg text-black">
                    {formatRupiah(Number(order.total_amount || order.total_price))}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          
          <div className="mt-12 pt-8 border-t text-center text-gray-500 text-xs">
            <p>Terima kasih telah berbelanja di rewear.id!</p>
            <p className="mt-1">Dokumen ini adalah bukti transaksi yang sah dan dicetak secara otomatis.</p>
          </div>
        </div>
      </div>
    </>
  );
}
