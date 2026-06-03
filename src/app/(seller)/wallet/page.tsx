import { WalletClient } from "./wallet-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Saldo & Penarikan | Seller Dashboard",
  description: "Kelola saldo dan tarik dana penjualan Anda.",
};

export default function WalletPage() {
  return <WalletClient />;
}
