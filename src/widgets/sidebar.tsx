"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/shared/utils/cn";
import { LayoutDashboard, Package, ShoppingBag, Heart, Wallet, Settings } from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { label: "Ringkasan", href: "/dashboard", icon: LayoutDashboard },
    { label: "Pesanan Masuk", href: "/orders", icon: Package },
    { label: "Katalog Produk", href: "/my-products", icon: ShoppingBag },
    { label: "Wishlist Saya", href: "/wishlist", icon: Heart },
    { label: "Saldo Escrow", href: "/wallet", icon: Wallet },
    { label: "Pengaturan Akun", href: "/settings", icon: Settings },
  ];

  return (
    <aside className="w-64 border-r border-border/50 h-[calc(100vh-4rem)] bg-card sticky top-16">
      <div className="flex flex-col h-full py-6 px-4">
        
        <div className="mb-6 px-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Seller Menu</h2>
        </div>

        <nav className="flex flex-col gap-1.5 flex-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            const Icon = item.icon;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200",
                  isActive 
                    ? "bg-foreground text-background shadow-md" 
                    : "text-muted-foreground hover:text-foreground hover:bg-surface-container"
                )}
              >
                <Icon className={cn("w-5 h-5", isActive ? "text-background" : "text-muted-foreground")} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        
        {/* Verification Alert */}
        <div className="bg-surface-container/50 border border-border rounded-xl p-4 mt-auto">
           <h4 className="font-bold text-xs mb-1">Status Toko: Terverifikasi</h4>
           <p className="text-xs text-muted-foreground">Anda dapat mencairkan dana escrow kapan saja.</p>
        </div>

      </div>
    </aside>
  );
}
