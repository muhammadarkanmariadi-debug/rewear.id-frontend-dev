/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { Download } from "lucide-react";
import { formatRupiah, formatDate } from "@/shared/utils/format";
import { useState, useEffect } from "react";
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 40, fontFamily: "Helvetica", fontSize: 12, color: "#333" },
  header: { flexDirection: "row", justifyContent: "space-between", borderBottomWidth: 1, borderBottomColor: "#eee", paddingBottom: 15, marginBottom: 20 },
  brand: { fontSize: 24, fontWeight: "extrabold", color: "#000" },
  brandAccent: { color: "#2563eb" },
  brandSub: { fontSize: 10, color: "#666", marginTop: 4 },
  title: { fontSize: 16, fontWeight: "bold", textAlign: "right", textTransform: "uppercase" },
  orderNo: { fontSize: 12, fontWeight: "bold", color: "#444", textAlign: "right", marginTop: 4 },
  infoRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  label: { fontSize: 10, color: "#666", marginBottom: 4 },
  value: { fontSize: 12, fontWeight: "bold", textTransform: "uppercase" },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 12, fontWeight: "bold", borderBottomWidth: 1, borderBottomColor: "#eee", paddingBottom: 5, marginBottom: 10 },
  grid: { flexDirection: "row", justifyContent: "space-between" },
  col: { flex: 1, paddingRight: 10 },
  table: { width: "100%", marginTop: 10 },
  tableHeader: { flexDirection: "row", backgroundColor: "#f3f4f6", padding: 8, borderBottomWidth: 1, borderBottomColor: "#ddd" },
  tableRow: { flexDirection: "row", padding: 10, borderBottomWidth: 1, borderBottomColor: "#eee" },
  tableColLeft: { flex: 2 },
  tableColRight: { flex: 1, textAlign: "right" },
  footer: { marginTop: 40, borderTopWidth: 1, borderTopColor: "#eee", paddingTop: 10, textAlign: "center", fontSize: 10, color: "#888" },
});

interface ExportReceiptButtonProps {
  order: any;
  role?: string;
}

const ReceiptDocument = ({ order, role }: ExportReceiptButtonProps) => {
  const addr = order.shipping_address || order.address;
  const orderNumber = order.order_number || order.id.slice(0, 8).toUpperCase();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            <Text style={styles.brand}>rewear<Text style={styles.brandAccent}>.id</Text></Text>
            <Text style={styles.brandSub}>Platform Thrifting Terpercaya</Text>
          </View>
          <View>
            <Text style={styles.title}>Resi {role === "buyer" ? "Pembelian" : "Penjualan"}</Text>
            <Text style={styles.orderNo}>ORD-{orderNumber}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <View>
            <Text style={styles.label}>Tanggal Pesanan</Text>
            <Text style={styles.value}>{formatDate(order.created_at)}</Text>
          </View>
          <View style={{ textAlign: "right" }}>
            <Text style={styles.label}>Status</Text>
            <Text style={styles.value}>{order.status.replace(/_/g, " ")}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informasi Pengiriman</Text>
          <View style={styles.grid}>
            <View style={styles.col}>
              <Text style={styles.label}>Penerima</Text>
              <Text style={styles.value}>{addr?.recipient_name || order.buyer?.name}</Text>
              <Text style={{ fontSize: 10, marginTop: 4 }}>{addr?.phone_number || addr?.phone || order.buyer?.phone}</Text>
            </View>
            <View style={styles.col}>
              <Text style={styles.label}>Alamat</Text>
              <Text style={{ fontSize: 10, marginTop: 4 }}>{addr?.full_address || addr?.address}</Text>
              <Text style={{ fontSize: 10, marginTop: 2 }}>{addr?.district}, {addr?.city?.name || addr?.city}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Detail Layanan Pengiriman</Text>
          <View style={styles.grid}>
            <View style={styles.col}>
              <Text style={styles.label}>Kurir</Text>
              <Text style={styles.value}>{order.shipment?.courier || order.courier || "-"}</Text>
            </View>
            <View style={styles.col}>
              <Text style={styles.label}>Nomor Resi</Text>
              <Text style={styles.value}>{order.shipment?.tracking_number || "Belum ada resi"}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Detail Produk</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableColLeft, { fontWeight: "bold" }]}>Produk</Text>
              <Text style={[styles.tableColRight, { fontWeight: "bold" }]}>Harga</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableColLeft}>{order.product?.title || "Produk"}</Text>
              <Text style={styles.tableColRight}>{formatRupiah(Number(order.total_amount || order.total_price))}</Text>
            </View>
            <View style={[styles.tableRow, { backgroundColor: "#f9fafb", borderBottomWidth: 0 }]}>
              <Text style={[styles.tableColLeft, { textAlign: "right", color: "#666" }]}>Total Pembayaran</Text>
              <Text style={[styles.tableColRight, { fontWeight: "bold", fontSize: 14 }]}>
                {formatRupiah(Number(order.total_amount || order.total_price))}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <Text>Terima kasih telah berbelanja di rewear.id!</Text>
          <Text style={{ marginTop: 4 }}>Dokumen ini adalah bukti transaksi yang sah dan dicetak secara otomatis.</Text>
        </View>
      </Page>
    </Document>
  );
};

export function ExportReceiptButton({ order, role = "buyer" }: ExportReceiptButtonProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <PDFDownloadLink
      document={<ReceiptDocument order={order} role={role} />}
      fileName={`Resi_${role === "buyer" ? "Pembelian" : "Penjualan"}_ORD-${(order.order_number || order.id).slice(0, 8).toUpperCase()}.pdf`}
      className="flex items-center gap-2 px-4 py-2 bg-foreground text-background font-bold text-sm rounded-lg hover:bg-foreground/90 transition-colors"
    >
      {({ loading }) => (
        <>
          <Download className="w-4 h-4" />
          {loading ? "Menyiapkan PDF..." : `Export Resi ${role === "buyer" ? "Pembelian" : "Penjualan"}`}
        </>
      )}
    </PDFDownloadLink>
  );
}
