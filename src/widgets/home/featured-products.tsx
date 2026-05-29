import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Heart } from "lucide-react";
import { MOCK_PRODUCTS } from "@/configs/mock-data";
import { formatRupiah } from "@/shared/utils/format";
import { ProductCard } from "../marketplace/product-card";

export function FeaturedProducts() {
  const featured = MOCK_PRODUCTS.slice(0, 8); // Display first 8 products

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col sm:flex-row justify-between items-end mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">Penemuan Baru Hari Ini</h2>
            <p className="text-muted-foreground">Koleksi baju dan celana preloved terkurasi, siap jadi milikmu.</p>
          </div>
          <Link href="/products" className="text-primary font-medium hover:underline inline-flex items-center">
            Lihat Semua Produk
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
