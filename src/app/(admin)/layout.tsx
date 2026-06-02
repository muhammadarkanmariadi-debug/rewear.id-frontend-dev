"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, ShoppingBag, AlertTriangle, CreditCard, ShieldCheck, LogOut } from "lucide-react";
import { authService } from "@/services";

export default function DashboardAdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

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
    <div className="flex h-screen bg-surface-container overflow-hidden text-sm">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-border">
          <Link href="/admin" className="font-bold text-xl tracking-tight text-primary">
            rewear<span className="text-foreground">.admin</span>
          </Link>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          {navs.map((n) => {
             const Icon = n.icon;
             const isActive = pathname === n.href || (n.href !== "/admin" && pathname.startsWith(n.href));
             return (
                <Link key={n.href} href={n.href} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors font-semibold ${isActive ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}>
                  <Icon className="w-5 h-5" />
                  {n.name}
                </Link>
             )
          })}
        </nav>

        <div className="p-4 border-t border-border">
           <button onClick={handleLogout} className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg transition-colors font-semibold text-red-500 hover:bg-red-500/10">
              <LogOut className="w-5 h-5" />
              Keluar Panel
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative z-0">
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-8">
           <h1 className="font-bold text-lg capitalize">{pathname.split('/').pop() === 'admin' ? 'Dashboard Overview' : pathname.split('/').pop()?.replace('-', ' ')}</h1>
           <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center font-bold text-xs">
                AD
              </div>
           </div>
        </header>
        <div className="flex-1 overflow-y-auto p-8">
           {children}
        </div>
      </main>
    </div>
  );
}
