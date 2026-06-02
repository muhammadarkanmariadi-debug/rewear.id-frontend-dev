"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, ShoppingBag, AlertTriangle, CreditCard, ShieldCheck, LogOut, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { authService } from "@/services";
import { cn } from "@/shared/utils/cn";
import { useState } from "react";

export function AdminSidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = async () => {
    try {
      await authService.logout();
      window.location.href = "/";
    } catch {
      window.location.href = "/";
    }
  };

  const navs = [
    { name: "Overview", href: "/admin", icon: LayoutDashboard },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Products", href: "/admin/products", icon: ShoppingBag },
    { name: "Disputes", href: "/admin/disputes", icon: AlertTriangle },
    { name: "Withdrawals", href: "/admin/withdrawals", icon: CreditCard },
    { name: "Verifications", href: "/admin/seller-verifications", icon: ShieldCheck },
  ];

  return (
    <aside className={cn(
      "relative border-r border-border/50 h-screen bg-card sticky top-0 transition-all duration-300 flex flex-col z-20",
      isCollapsed ? "w-20" : "w-64"
    )}>
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-6 bg-foreground text-background rounded-full p-1 shadow-md z-30 hover:scale-110 transition-transform"
      >
        {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>

      <div className="flex flex-col h-full py-6 px-3 overflow-x-hidden overflow-y-auto">
        
        <div className={cn("mb-8 flex items-center", isCollapsed ? "justify-center" : "px-2")}>
          <Link href="/admin" className="font-bold text-2xl tracking-tight text-primary whitespace-nowrap">
            {isCollapsed ? "R." : <>rewear<span className="text-foreground">.admin</span></>}
          </Link>
        </div>
        
        <div className={cn("mb-4 flex flex-col", isCollapsed ? "items-center" : "px-2")}>
          <Link href="/" title="Kembali ke Beranda" className={cn(
            "inline-flex items-center text-sm font-semibold text-muted-foreground hover:text-foreground mb-6 transition-colors",
            isCollapsed ? "justify-center" : "gap-2"
          )}>
            <ArrowLeft className="w-4 h-4 flex-shrink-0" />
            {!isCollapsed && <span className="whitespace-nowrap">Kembali ke Beranda</span>}
          </Link>
          {!isCollapsed && <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Admin Menu</h2>}
        </div>

        <nav className="flex flex-col gap-1.5 flex-1">
          {navs.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                title={isCollapsed ? item.name : undefined}
                className={cn(
                  "flex items-center rounded-xl text-sm font-semibold transition-all duration-200",
                  isCollapsed ? "justify-center py-3 px-0" : "gap-3 px-4 py-3",
                  isActive
                    ? "bg-foreground text-background shadow-md"
                    : "text-muted-foreground hover:text-foreground hover:bg-surface-container"
                )}
              >
                <Icon className={cn("w-5 h-5 flex-shrink-0", isActive ? "text-background" : "text-muted-foreground")} />
                {!isCollapsed && <span className="whitespace-nowrap">{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-4 border-t border-border/50">
           <button 
             onClick={handleLogout} 
             title={isCollapsed ? "Keluar Panel" : undefined}
             className={cn(
               "flex w-full items-center rounded-xl transition-all duration-200 font-semibold text-red-500 hover:bg-red-500/10 text-sm",
               isCollapsed ? "justify-center py-3 px-0" : "gap-3 px-4 py-3"
             )}
           >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span className="whitespace-nowrap">Keluar Panel</span>}
           </button>
        </div>

      </div>
    </aside>
  );
}
