import { DashboardLayout } from "@/templates/dashboard-layout";
import { MainLayout } from "@/templates/main-layout";
import type { ReactNode } from "react";

export default function AppMainLayout({ children }: { children: ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>
}
