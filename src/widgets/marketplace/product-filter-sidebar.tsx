export function ProductFilterSidebar() {
  return (
    <aside className="w-full md:w-64 flex flex-col gap-8 shrink-0">
      
      {/* Kategori */}
      <div className="space-y-3">
        <h3 className="font-semibold text-lg">Kategori</h3>
        <div className="space-y-2">
          {["Semua Kategori", "Baju", "Celana"].map((c, i) => (
            <label key={i} className="flex items-center gap-2 cursor-pointer group">
              <input type="radio" name="category" className="w-4 h-4 text-primary bg-background border-border accent-primary" defaultChecked={i === 0} />
              <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">{c}</span>
            </label>
          ))}
        </div>
      </div>

      <hr className="border-border" />

      {/* Kondisi */}
      <div className="space-y-3">
        <h3 className="font-semibold text-lg">Kondisi</h3>
        <div className="space-y-2">
          {["Baru dengan Tag", "Bekas Seperti Baru", "Bekas Pemakaian Wajar"].map((c, i) => (
            <label key={i} className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 rounded border-border text-primary accent-primary" />
              <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">{c}</span>
            </label>
          ))}
        </div>
      </div>

      <hr className="border-border" />

      {/* Rentang Harga */}
      <div className="space-y-3">
        <h3 className="font-semibold text-lg">Harga</h3>
        <div className="flex items-center gap-2">
          <input type="number" placeholder="Min" className="w-full p-2 text-sm border border-border rounded-md bg-transparent" />
          <span className="text-muted-foreground">-</span>
          <input type="number" placeholder="Max" className="w-full p-2 text-sm border border-border rounded-md bg-transparent" />
        </div>
      </div>

      <hr className="border-border" />

      {/* Ukuran */}
      <div className="space-y-3">
        <h3 className="font-semibold text-lg">Ukuran</h3>
        <div className="flex flex-wrap gap-2">
          {["XS", "S", "M", "L", "XL", "XXL"].map((s, i) => (
            <label key={i} className="cursor-pointer">
              <input type="checkbox" className="peer sr-only" />
              <span className="inline-flex w-10 h-10 items-center justify-center rounded-md border border-border bg-background text-sm font-medium transition-colors peer-checked:bg-primary peer-checked:text-primary-foreground peer-checked:border-primary hover:bg-accent">
                {s}
              </span>
            </label>
          ))}
        </div>
      </div>

    </aside>
  );
}
