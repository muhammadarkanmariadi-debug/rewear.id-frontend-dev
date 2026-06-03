import { AdminWithdrawalsClient } from "./admin-withdrawals-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Persetujuan Penarikan | Admin Dashboard",
  description: "Kelola permintaan penarikan dana dari saldo penjual.",
};

export default function AdminWithdrawalsPage() {
  return <AdminWithdrawalsClient />;
}
