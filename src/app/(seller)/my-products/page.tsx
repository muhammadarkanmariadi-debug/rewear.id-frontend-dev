import { MyProductsClient } from "./my-products-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Katalog Produk | Seller Dashboard",
  description: "Kelola produk yang Anda jual di rewear.id.",
};

export default function SellerProductsPage() {
  return <MyProductsClient />;
}
