"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface SortDropdownProps {
  sortBy: string;
  setSortBy: (val: string) => void;
}

export function SortDropdown({ sortBy, setSortBy }: SortDropdownProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  return (
    <div className="flex items-center gap-2 w-full sm:w-auto">
      <label htmlFor="sort" className="text-sm font-semibold whitespace-nowrap text-muted-foreground">Urutkan:</label>
      <select 
        id="sort"
        value={sortBy}
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
