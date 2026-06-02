"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/shared/utils/cn";
import { LayoutDashboard, ShoppingBag, Wallet, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { label: "Ringkasan", href: "/dashboard", icon: LayoutDashboard },
    { label: "Katalog Produk", href: "/my-products", icon: ShoppingBag },
    { label: "Saldo Escrow", href: "/wallet", icon: Wallet },
  ].filter(Boolean) as { label: string; href: string; icon: React.ElementType }[];

  return (
    <aside className={cn(
      "relative border-r border-border/50 h-[calc(100vh-4rem)] bg-card sticky top-16 transition-all duration-300 flex flex-col z-20",
      isCollapsed ? "w-20" : "w-64"
    )}>
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-6 bg-foreground text-background rounded-full p-1 shadow-md z-30 hover:scale-110 transition-transform"
      >
        {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>

      <div className="flex flex-col h-full py-6 px-3 overflow-x-hidden overflow-y-auto">
        <div className={cn("mb-6 flex flex-col", isCollapsed ? "items-center" : "px-2")}>
          <Link href="/" title="Kembali ke Beranda" className={cn(
            "inline-flex items-center text-sm font-semibold text-muted-foreground hover:text-foreground mb-6 transition-colors",
            isCollapsed ? "justify-center" : "gap-2"
          )}>
            <ArrowLeft className="w-4 h-4 flex-shrink-0" />
            {!isCollapsed && <span className="whitespace-nowrap">Kembali ke Beranda</span>}
          </Link>
          {!isCollapsed && <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">User Menu</h2>}
        </div>

        <nav className="flex flex-col gap-1.5 flex-1">
          {menuItems.map((item) => {
            const isActive = pathname === item?.href || pathname.startsWith(`${item?.href}/`);
            const Icon = item?.icon;

            return (
              <Link
                key={item?.href}
                href={item?.href || '/'}
                title={isCollapsed ? item?.label : undefined}
                className={cn(
                  "flex items-center rounded-xl text-sm font-semibold transition-all duration-200",
                  isCollapsed ? "justify-center py-3 px-0" : "gap-3 px-4 py-3",
                  isActive
                    ? "bg-foreground text-background shadow-md"
                    : "text-muted-foreground hover:text-foreground hover:bg-surface-container"
                )}
              >
                <Icon className={cn("w-5 h-5 flex-shrink-0", isActive ? "text-background" : "text-muted-foreground")} />
                {!isCollapsed && <span className="whitespace-nowrap">{item?.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Verification toast */}
        <div className={cn(
          "border border-border rounded-xl mt-auto transition-all overflow-hidden",
          isCollapsed ? "p-3 flex justify-center bg-transparent border-none" : "bg-surface-container/50 p-4"
        )}>
          {!isCollapsed ? (
            <>
              <h4 className="font-bold text-xs mb-1 whitespace-nowrap">Status: Terverifikasi</h4>
              <p className="text-xs text-muted-foreground line-clamp-2">Anda dapat mencairkan dana escrow kapan saja.</p>
            </>
          ) : (
            <div title="Status: Terverifikasi" className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
          )}
        </div>

      </div>
    </aside>
  );
}
