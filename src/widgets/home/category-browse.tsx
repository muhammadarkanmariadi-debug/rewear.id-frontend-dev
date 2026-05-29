import Link from "next/link";
import { Shirt, Tag, Sparkles } from "lucide-react";

export function CategoryBrowse() {
  const categories = [
    { name: "Baju Preloved", icon: <Shirt className="w-6 h-6" />, count: "4.2k+", href: "/products?category=baju" },
    { name: "Celana Preloved", icon: <Shirt className="w-6 h-6 rotate-180" />, count: "2.1k+", href: "/products?category=celana" },
    { name: "Brand Populer", icon: <Tag className="w-6 h-6" />, count: "Uniqlo, Zara...", href: "/products?sort=brand" },
    { name: "Masih Baru (NWT)", icon: <Sparkles className="w-6 h-6" />, count: "800+ item", href: "/products?condition=baru" },
  ];

  return (
    <section className="py-16 bg-surface-container">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat, idx) => (
            <Link 
              key={idx} 
              href={cat.href}
              className="flex flex-col items-center justify-center p-6 bg-card border border-border rounded-xl hover:border-primary hover:shadow-md transition-all group text-center"
            >
              <div className="mb-4 text-primary group-hover:scale-110 transition-transform">
                {cat.icon}
              </div>
              <h3 className="font-semibold">{cat.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">{cat.count}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
