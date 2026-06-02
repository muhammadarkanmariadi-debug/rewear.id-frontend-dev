"use client";

import { useEffect, useState } from "react";
import { Users, ShoppingBag, CreditCard, DollarSign, Package, UserCheck } from "lucide-react";
import { adminService } from "@/services";
import { formatRupiah } from "@/shared/utils/format";

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Record<string, number> | null>(null);

  useEffect(() => {
    let mounted = true;
    async function fetchDashboardStats() {
      try {
        setLoading(true);
        const res = await adminService.getReportsOverview();
        if (mounted && res.status && res.data) {
          setStats(res.data);
        }
      } catch (error) {
        console.error("Failed to fetch admin stats", error);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchDashboardStats();
    return () => { mounted = false; };
  }, []);

  if (loading) return <div className="p-8 text-center text-muted-foreground">Memuat data dashboard...</div>;
  if (!stats) return <div className="p-8 text-center text-red-500">Gagal memuat data.</div>;

  const statCards = [
    { label: "Total Pengguna", value: stats.total_users, icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Seller Terverifikasi", value: stats.verified_sellers, icon: UserCheck, color: "text-green-500", bg: "bg-green-500/10" },
    { label: "Total Pendapatan", value: formatRupiah(stats.total_revenue), icon: DollarSign, color: "text-amber-500", bg: "bg-amber-500/10" },
    { label: "Total Biaya Layanan", value: formatRupiah(stats.total_service_fee), icon: CreditCard, color: "text-purple-500", bg: "bg-purple-500/10" },
    { label: "Produk Aktif", value: stats.active_products, icon: ShoppingBag, color: "text-rose-500", bg: "bg-rose-500/10" },
    { label: "Total Pesanan", value: stats.total_orders, icon: Package, color: "text-teal-500", bg: "bg-teal-500/10" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Ringkasan Platform</h2>
        <p className="text-muted-foreground mt-1">Pantau performa dan statistik keseluruhan platform rewear.id.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, idx) => {
           const Icon = stat.icon;
           return (
              <div key={idx} className="bg-card border border-border p-6 rounded-2xl shadow-sm flex items-center gap-6">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 ${stat.bg} ${stat.color}`}>
                   <Icon className="w-7 h-7" />
                </div>
                <div>
                   <p className="text-sm font-semibold text-muted-foreground mb-1">{stat.label}</p>
                   <h3 className="text-2xl font-bold">{stat.value}</h3>
                </div>
              </div>
           )
        })}
      </div>
      
      <div className="bg-card border border-border rounded-2xl shadow-sm p-6 mt-8">
        <h3 className="text-xl font-bold mb-4">Informasi Tambahan</h3>
        <ul className="space-y-3 text-sm">
           <li className="flex justify-between border-b border-border pb-2">
             <span className="text-muted-foreground">Total Penjual (Sellers)</span>
             <span className="font-bold">{stats.total_sellers}</span>
           </li>
           <li className="flex justify-between border-b border-border pb-2">
             <span className="text-muted-foreground">Total Semua Produk</span>
             <span className="font-bold">{stats.total_products}</span>
           </li>
           <li className="flex justify-between pb-2">
             <span className="text-muted-foreground">Pesanan Menunggu Pembayaran</span>
             <span className="font-bold">{stats.pending_orders}</span>
           </li>
        </ul>
      </div>
    </div>
  );
}
