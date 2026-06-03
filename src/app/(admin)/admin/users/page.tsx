import { AdminUsersClient } from "./admin-users-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manajemen Pengguna | Admin Dashboard",
  description: "Kelola dan awasi aktivitas pengguna di platform.",
};

export default function AdminUsersPage() {
  return <AdminUsersClient />;
}
