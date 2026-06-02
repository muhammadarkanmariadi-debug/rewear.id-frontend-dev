"use client";
import { useState, useEffect } from "react";

import { useProductFiltering } from "@/shared/hooks/use-product-filtering";
import { ProductFilterSidebar } from "@/widgets/marketplace/product-filter-sidebar";
import { ProductGrid } from "@/widgets/marketplace/product-grid";
import { SearchBar } from "@/widgets/marketplace/search-bar";
import { SortDropdown } from "@/widgets/marketplace/sort-dropdown";
import { DataPagination } from "@/widgets/data-pagination";

export function ProductsClient({ initialProducts }: { initialProducts: any[] }) {
  const {
    searchQuery, setSearchQuery,
    condition, setCondition,
    minPrice, setMinPrice,
    maxPrice, setMaxPrice,
    sortBy, setSortBy,
    filteredProducts
  } = useProductFiltering(initialProducts);

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(15);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, condition, minPrice, maxPrice, sortBy]);

  const lastPage = Math.ceil(filteredProducts.length / perPage);
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * perPage, currentPage * perPage);

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-border/40">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Semua Koleksi</h1>
          <p className="text-muted-foreground text-sm">Menampilkan {filteredProducts.length} barang preloved siap pakai.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Sidebar */}
        <div className="hidden md:block sticky top-24">
          <ProductFilterSidebar 
            condition={condition} 
            setCondition={setCondition} 
            minPrice={minPrice} 
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
          />
        </div>

        {/* Product Grid Area */}
        <div className="flex-1 w-full min-w-0">
          <ProductGrid products={paginatedProducts} />
          
          {filteredProducts.length > 0 && (
            <div className="mt-12 flex justify-center">
              <DataPagination 
                currentPage={currentPage}
                lastPage={lastPage}
                onPageChange={setCurrentPage}
                perPage={perPage}
                onPerPageChange={setPerPage}
              />
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
