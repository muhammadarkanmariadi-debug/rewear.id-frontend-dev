export function SortDropdown() {
  return (
    <div className="flex items-center gap-2 w-full sm:w-auto">
      <label htmlFor="sort" className="text-sm font-semibold whitespace-nowrap text-muted-foreground">Urutkan:</label>
      <select 
        id="sort"
        className="w-full sm:w-auto bg-transparent border border-border text-foreground text-sm rounded-lg focus:ring-primary focus:border-primary block p-2 outline-none cursor-pointer"
      >
        <option value="relevan">Paling Relevan</option>
        <option value="terbaru">Terbaru</option>
        <option value="termurah">Termurah</option>
        <option value="termahal">Termahal</option>
        <option value="populer">Terpopuler</option>
      </select>
    </div>
  );
}
