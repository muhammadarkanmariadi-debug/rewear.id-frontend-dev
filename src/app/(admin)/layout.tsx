"use client";

import { usePathname } from "next/navigation";
import { AdminSidebar } from "@/widgets/admin-sidebar";

export default function DashboardAdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-surface-container overflow-hidden text-sm">
      <AdminSidebar />

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
