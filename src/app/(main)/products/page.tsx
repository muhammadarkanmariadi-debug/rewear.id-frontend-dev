import { ProductFilterSidebar } from "@/widgets/marketplace/product-filter-sidebar";
import { ProductGrid } from "@/widgets/marketplace/product-grid";
import { SearchBar } from "@/widgets/marketplace/search-bar";
import { SortDropdown } from "@/widgets/marketplace/sort-dropdown";
import { productService } from "@/services";

export const metadata = {
  title: "Pakaian Preloved - Belanja Aman | rewear.id",
  description: "Temukan baju dan celana preloved bermerek. Transaksi 100% aman berkat sistem escrow.",
};

export default async function ProductsPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const rawParams = await searchParams;
  const params: Record<string, string> = {};
  for (const k in rawParams) {
    if (typeof rawParams[k] === "string") {
      params[k] = rawParams[k] as string;
    }
  }

  const res = await productService.getAll(params);
  const products = res.data || [];

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-border/40">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Semua Koleksi</h1>
          <p className="text-muted-foreground text-sm">Menampilkan {products.length} barang preloved siap pakai.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <SearchBar />
          <SortDropdown />
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Sidebar */}
        <div className="hidden md:block sticky top-24">
          <ProductFilterSidebar />
        </div>

        {/* Product Grid Area */}
        <div className="flex-1 w-full min-w-0">
          <ProductGrid products={products} />
          
          {/* Pagination Placeholder */}
          {products.length > 0 && (
            <div className="mt-12 flex justify-center">
              <div className="flex items-center gap-1 shadow-sm rounded-lg border border-border p-1 bg-surface-container-low">
                <button className="px-3 py-1 text-sm font-medium text-muted-foreground hover:bg-background hover:text-foreground rounded-md transition-colors" disabled>Seblm</button>
                <button className="w-8 h-8 flex items-center justify-center text-sm font-bold bg-foreground text-background rounded-md">1</button>
                <button className="px-3 py-1 text-sm font-medium hover:bg-background hover:text-foreground rounded-md transition-colors">Selanjutnya</button>
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}

