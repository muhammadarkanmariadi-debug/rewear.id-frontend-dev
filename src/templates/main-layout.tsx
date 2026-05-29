import type { ReactNode } from "react";
import { Navbar } from "@/widgets/navbar";
import { Footer } from "@/widgets/footer";

export function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col font-sans relative">
      {/* Premium Ambient Background */}
      <div className="fixed inset-0 -z-50 bg-background">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] opacity-70 translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] opacity-50 -translate-x-1/2 translate-y-1/3" />
      </div>

      <Navbar />
      <main className="flex-1 relative z-10">{children}</main>
      <Footer />
    </div>
  );
}
