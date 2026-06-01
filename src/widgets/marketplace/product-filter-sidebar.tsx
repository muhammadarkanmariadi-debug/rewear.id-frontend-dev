"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function ProductFilterSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateParam = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    // Reset to page 1 on filter change if pagination applies
    params.delete("page");
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const currentCondition = searchParams.get("condition") || "";
  const currentCategory = searchParams.get("category_id") || "";
  const minPrice = searchParams.get("min_price") || "";
  const maxPrice = searchParams.get("max_price") || "";

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
                checked={currentCondition === c.value}
                onChange={() => updateParam("condition", c.value)}
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
              checked={currentCondition === ""}
              onChange={() => updateParam("condition", null)}
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
            type="number" 
            placeholder="Min" 
            value={minPrice}
            onChange={(e) => updateParam("min_price", e.target.value)}
            className="w-full p-2 text-sm border border-border rounded-md bg-transparent" 
          />
          <span className="text-muted-foreground">-</span>
          <input 
            type="number" 
            placeholder="Max" 
            value={maxPrice}
            onChange={(e) => updateParam("max_price", e.target.value)}
            className="w-full p-2 text-sm border border-border rounded-md bg-transparent" 
          />
        </div>
      </div>

    </aside>
  );
}

