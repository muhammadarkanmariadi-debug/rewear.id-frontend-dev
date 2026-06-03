import { AdminSellerVerificationsClient } from "./admin-seller-verifications-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verifikasi Penjual | Admin Dashboard",
  description: "Tinjau dokumen identitas pengguna yang ingin menjadi penjual.",
};

export default function AdminSellerVerificationsPage() {
  return <AdminSellerVerificationsClient />;
}
