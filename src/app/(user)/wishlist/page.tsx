/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { ProductCard } from "@/widgets/marketplace/product-card";
import { HeartCrack, Search } from "lucide-react";
import { useWishlist } from "@/hooks/api/use-user";
import { DataPagination } from "@/widgets/data-pagination";
import { ProductSkeleton } from "@/components/ui/product-skeleton";
import { ZigZagReveal } from "@/components/ui/zig-zag-reveal";

export default function WishlistPage() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(8);

  // Fetch all wishlist items
  const { data: res, isLoading } = useWishlist();
  
  // Assuming API returns array of products directly, or wrapped in data
  const allItems = res?.data || [];

  // 1. Client-side Search Filtering
  const filteredItems = allItems.filter((item: any) => 
    item.product?.title?.toLowerCase().includes(search.toLowerCase()) || 
    item.product?.brand?.name?.toLowerCase().includes(search.toLowerCase())
  );

  // 2. Client-side Pagination Slicing
  const lastPage = Math.ceil(filteredItems.length / perPage) || 1;
  const startIndex = (currentPage - 1) * perPage;
  const paginatedItems = filteredItems.slice(startIndex, startIndex + perPage);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Wishlist Saya</h1>
          <p className="text-muted-foreground mt-1">Barang-barang yang ingin Anda amankan segera.</p>
        </div>
        
        {/* Search Input */}
        <div className="relative max-w-sm w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Cari barang di wishlist..." 
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1); // Reset to page 1 on search
            }}
            className="w-full pl-9 pr-4 h-10 bg-surface-container border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ProductSkeleton count={4} />
        </div>
      ) : filteredItems.length > 0 ? (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {paginatedItems.map((item: any, i: number) => (
              <ZigZagReveal key={item.product.id} index={i}>
                <ProductCard
                  product={{
                    ...item.product,
                    price: parseFloat(item.product.price),     
                    is_bookmarked: true,                         
                    brand: item.product.brand ?? null,          
                    seller: item.product.seller ?? null,         
                  }}
                />
              </ZigZagReveal>
            ))}
          </div>
          
          {/* Pagination */}
          {lastPage > 1 && (
            <DataPagination 
              currentPage={currentPage}
              lastPage={lastPage}
              onPageChange={setCurrentPage}
              perPage={perPage}
              onPerPageChange={(val) => {
                setPerPage(val);
                setCurrentPage(1);
              }}
            />
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 bg-surface-container rounded-full flex items-center justify-center mb-4">
            <HeartCrack className="w-8 h-8 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-bold">{search ? "Tidak Ditemukan" : "Wishlist Anda Kosong"}</h2>
          <p className="text-muted-foreground mt-2 max-w-sm">
            {search 
              ? `Tidak ada barang yang cocok dengan kata kunci "${search}".` 
              : "Jelajahi berbagai barang menarik di katalog kami dan simpan di sini."}
          </p>
        </div>
      )}
    </div>
  );
}

