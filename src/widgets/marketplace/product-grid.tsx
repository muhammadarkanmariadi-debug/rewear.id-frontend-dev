"use client";

import { Product } from "@/entities/product.entity";
import { formatRupiah } from "@/shared/utils/format";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShieldCheck } from "lucide-react";
import { ProductCard } from "./product-card";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center border border-dashed border-border rounded-xl bg-surface-container-low h-[400px]">
        <div className="w-16 h-16 bg-muted rounded-full flex flex-col items-center justify-center mb-4 text-muted-foreground">
          <Search className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold mb-2">Tidak ditemukan produk</h3>
        <p className="text-muted-foreground max-w-sm">
          Coba sesuaikan filter kategori, kondisi, atau kata kunci pencarian Anda untuk melihat ketersediaan barang.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 w-full">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

// Helper to make icon available since I used it inside ProductGrid without import 
function Search({ className }: { className?: string }){
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>;
}
