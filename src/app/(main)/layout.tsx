import { MainLayout } from "@/templates/main-layout";
import type { ReactNode } from "react";

export default function AppMainLayout({ children }: { children: ReactNode }) {
  return <MainLayout>{children}</MainLayout>;
}
