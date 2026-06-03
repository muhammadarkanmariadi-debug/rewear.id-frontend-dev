import { productService } from "@/services";
import { ProductsClient } from "./products-client";

export const metadata = {
  title: "Pakaian Preloved - Belanja Aman | rewear.id",
  description: "Temukan baju dan celana preloved bermerek. Transaksi 100% aman berkat sistem escrow.",
};

export default async function ProductsPage() {
  const res = await productService.getAll();
  const products = res.data || [];
  console.log(products)

  return <ProductsClient initialProducts={products} />;
}

