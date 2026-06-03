import { ProductSkeleton } from "@/components/ui/product-skeleton";
import { Filter } from "lucide-react";

export default function ProductsLoading() {
  return (
    <div className="max-w-7xl mx-auto space-y-8 px-4 md:px-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Katalog Produk</h1>
          <p className="text-muted-foreground mt-1 text-sm md:text-base">Temukan produk preloved berkualitas terbaik.</p>
        </div>
        <button disabled className="h-10 px-4 bg-surface-container border border-border text-foreground font-semibold text-sm flex items-center gap-2 rounded-xl opacity-50 cursor-not-allowed">
          <Filter className="w-4 h-4" /> Filter & Urutkan
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {[...Array(10)].map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
