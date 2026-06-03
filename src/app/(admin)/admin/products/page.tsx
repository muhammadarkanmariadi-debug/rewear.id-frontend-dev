import { AdminProductsClient } from "./admin-products-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Moderasi Produk | Admin Dashboard",
  description: "Pantau dan kelola katalog produk.",
};

export default function AdminProductsPage() {
  return <AdminProductsClient />;
}
