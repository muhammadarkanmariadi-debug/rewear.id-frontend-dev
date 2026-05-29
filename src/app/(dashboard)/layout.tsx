import { DashboardLayout } from "@/templates/dashboard-layout";
import type { ReactNode } from "react";

export default function AppDashboardLayout({ children }: { children: ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
