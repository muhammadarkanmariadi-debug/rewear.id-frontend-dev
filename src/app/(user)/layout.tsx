import { DashboardLayout } from "@/templates/dashboard-layout";
import { MainLayout } from "@/templates/main-layout";
import type { ReactNode } from "react";

export default function AppDashboardLayout({ children }: { children: ReactNode }) {
  return <MainLayout><div className="mx-8">{children}</div></MainLayout>;
}
