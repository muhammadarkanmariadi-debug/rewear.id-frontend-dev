import { Search } from "lucide-react";

export function SearchBar() {
  return (
    <div className="relative w-full max-w-sm group">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground group-focus-within:text-foreground transition-colors">
        <Search className="w-4 h-4" />
      </div>
      <input 
        type="search" 
        className="block w-full p-2.5 pl-10 text-sm border border-border rounded-lg bg-surface-container-low focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-muted-foreground"
        placeholder="Cari tren, brand, atau warna..." 
      />
    </div>
  );
}
