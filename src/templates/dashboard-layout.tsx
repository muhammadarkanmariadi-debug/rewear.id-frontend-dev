import type { ReactNode } from "react";
import { Sidebar } from "@/widgets/sidebar";
import { Navbar } from "@/widgets/navbar";

export function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
     
      <div className="flex flex-1 overflow-hidden">
        <div className="hidden md:block">
        <Sidebar/>
        </div>
        <main className="flex-1 p-6 overflow-y-auto pb-24 md:pb-6">
          {children}
        </main>
      </div>
    </div>
  );
}
