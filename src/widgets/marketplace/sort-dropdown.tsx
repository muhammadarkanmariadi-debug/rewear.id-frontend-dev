"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function SortDropdown() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Determine current val from query params
  const currentSortBy = searchParams.get("sort_by") || "created_at";
  const currentSortDir = searchParams.get("sort_dir") || "desc";
  
  let currentMappedVal = "terbaru";
  if (currentSortBy === "price" && currentSortDir === "asc") currentMappedVal = "termurah";
  if (currentSortBy === "price" && currentSortDir === "desc") currentMappedVal = "termahal";
  if (currentSortBy === "views_count") currentMappedVal = "populer";

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    
    let sortBy = "created_at";
    let sortDir = "desc";
    
    if (val === "termurah") { sortBy = "price"; sortDir = "asc"; }
    if (val === "termahal") { sortBy = "price"; sortDir = "desc"; }
    if (val === "populer") { sortBy = "views_count"; sortDir = "desc"; }
    // "relevan" / "terbaru" can just use default

    params.set("sort_by", sortBy);
    params.set("sort_dir", sortDir);
    params.delete("page");
    
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex items-center gap-2 w-full sm:w-auto">
      <label htmlFor="sort" className="text-sm font-semibold whitespace-nowrap text-muted-foreground">Urutkan:</label>
      <select 
        id="sort"
        value={currentMappedVal}
        onChange={handleChange}
        className="w-full sm:w-auto bg-transparent border border-border text-foreground text-sm rounded-lg focus:ring-1 focus:ring-primary focus:border-primary block p-2 outline-none cursor-pointer"
      >
        <option value="terbaru">Terbaru</option>
        <option value="termurah">Termurah</option>
        <option value="termahal">Termahal</option>
        <option value="populer">Terpopuler</option>
      </select>
    </div>
  );
}
