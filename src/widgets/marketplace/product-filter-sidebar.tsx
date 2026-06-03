"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface ProductFilterSidebarProps {
  condition: string;
  setCondition: (val: string) => void;
  minPrice: string;
  setMinPrice: (val: string) => void;
  maxPrice: string;
  setMaxPrice: (val: string) => void;
}

export function ProductFilterSidebar({
  condition,
  setCondition,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
}: ProductFilterSidebarProps) {
  return (
    <aside className="w-full md:w-64 flex flex-col gap-8 shrink-0">
      
      {/* Kondisi */}
      <div className="space-y-3">
        <h3 className="font-semibold text-lg">Kondisi</h3>
        <div className="space-y-2">
          {[
            { value: "new_with_tag", label: "Baru dengan Tag" },
            { value: "like_new", label: "Bekas Seperti Baru" },
            { value: "good", label: "Bekas Baik" },
            { value: "fair", label: "Bekas Layak" },
          ].map((c) => (
            <label key={c.value} className="flex items-center gap-2 cursor-pointer group">
              <input 
                type="radio" 
                name="condition"
                className="w-4 h-4 text-primary bg-background border-border accent-primary" 
                checked={condition === c.value}
                onChange={() => setCondition(c.value)}
              />
              <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors capitalize">
                {c.label}
              </span>
            </label>
          ))}
          <label className="flex items-center gap-2 cursor-pointer group">
            <input 
              type="radio" 
              name="condition"
              className="w-4 h-4 text-primary bg-background border-border accent-primary" 
              checked={condition === ""}
              onChange={() => setCondition("")}
            />
            <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
              Semua Kondisi
            </span>
          </label>
        </div>
      </div>

      <hr className="border-border" />

      {/* Rentang Harga */}
      <div className="space-y-3">
        <h3 className="font-semibold text-lg">Harga</h3>
        <div className="flex items-center gap-2">
          <input 
            type="text" 
            placeholder="Min" 
            value={minPrice ? new Intl.NumberFormat("id-ID").format(Number(minPrice)) : ""}
            onChange={(e) => setMinPrice(e.target.value.replace(/\D/g, ""))}
            className="w-full p-2 text-sm border border-border rounded-md bg-transparent" 
          />
          <span className="text-muted-foreground">-</span>
          <input 
            type="text" 
            placeholder="Max" 
            value={maxPrice ? new Intl.NumberFormat("id-ID").format(Number(maxPrice)) : ""}
            onChange={(e) => setMaxPrice(e.target.value.replace(/\D/g, ""))}
            className="w-full p-2 text-sm border border-border rounded-md bg-transparent" 
          />
        </div>
      </div>

    </aside>
  );
}

