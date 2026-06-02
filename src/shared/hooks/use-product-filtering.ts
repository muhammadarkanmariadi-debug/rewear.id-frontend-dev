import { useState, useMemo } from 'react';

export function useProductFiltering(initialProducts: any[]) {
  const [searchQuery, setSearchQuery] = useState("");
  const [condition, setCondition] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("terbaru"); // terbaru, termurah, termahal, populer

  const filteredProducts = useMemo(() => {
    let result = [...initialProducts];

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.title?.toLowerCase().includes(q) || 
        p.seller?.name?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q)
      );
    }

    // Filter by condition
    if (condition) {
      result = result.filter(p => p.condition === condition);
    }

    // Filter by price
    if (minPrice) {
      result = result.filter(p => Number(p.price) >= Number(minPrice));
    }
    if (maxPrice) {
      result = result.filter(p => Number(p.price) <= Number(maxPrice));
    }

    // Sort by Selected Value
    if (sortBy === "terbaru") {
      result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    } else if (sortBy === "termurah") {
      result.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortBy === "termahal") {
      result.sort((a, b) => Number(b.price) - Number(a.price));
    } else if (sortBy === "populer") {
      result.sort((a, b) => (b.views_count || 0) - (a.views_count || 0));
    }

    return result;
  }, [initialProducts, searchQuery, condition, minPrice, maxPrice, sortBy]);

  return {
    searchQuery, setSearchQuery,
    condition, setCondition,
    minPrice, setMinPrice,
    maxPrice, setMaxPrice,
    sortBy, setSortBy,
    filteredProducts
  };
}
