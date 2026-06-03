import { AdminDisputesClient } from "./admin-disputes-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manajemen Sengketa | Admin Dashboard",
  description: "Kelola dan selesaikan sengketa transaksi.",
};

export default function AdminDisputesPage() {
  return <AdminDisputesClient />;
}
