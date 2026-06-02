'use client'
import { formatRupiah } from "@/shared/utils/format";
import { useAuthStore } from "@/stores";

import Link from "next/link";
import { SearchBar } from "../marketplace/search-bar";
import { useState } from "react";

interface Order {
  id: string;
  total_price?: number | string;
  total_amount?: number | string;
  status: string;
}

interface OrdersTableProps {
  orders: Order[];
  role: string;
  loading?: boolean;
}


export function OrdersTable({ orders, role, loading }: OrdersTableProps) {
  const { user } = useAuthStore();
  const [ search, setSearch] = useState('')
  const filterOrder = orders.filter((order) => order.id.toLowerCase().includes(search.toLowerCase()))
  return (
    <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden flex flex-col">
      {/* Toolbar */}
      <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-4 justify-between bg-surface-container/50">
        <SearchBar value={search} onChange={setSearch} />
        <div className="flex gap-2">
          <Link
            href="?role=buyer"
            className={`h-9 px-4 flex items-center justify-center rounded-lg text-sm font-medium border ${role === "buyer"
              ? "bg-foreground text-background border-foreground"
              : "bg-background border-border text-foreground hover:bg-muted"
              }`}
          >
            Sebagai Pembeli
          </Link>
          {user?.is_seller_verified && (<Link
            href="?role=seller"
            className={`h-9 px-4 flex items-center justify-center rounded-lg text-sm font-medium border ${role === "seller"
              ? "bg-foreground text-background border-foreground"
              : "bg-background border-border text-foreground hover:bg-muted"
              }`}
          >
            Sebagai Penjual
          </Link>)}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-surface-container text-muted-foreground text-xs uppercase font-bold border-b border-border">
            <tr>
              <th className="px-6 py-4">ID Pesanan</th>
              <th className="px-6 py-4">Peran</th>
              <th className="px-6 py-4">Total Tagihan</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                  Memuat pesanan...
                </td>
              </tr>
            ) : filterOrder.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                  Tidak ada pesanan ditemukan.
                </td>
              </tr>
            ) : (
              filterOrder.map((order) => (
                <tr key={order.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 font-mono font-bold text-xs">
                    <Link href={`/orders/${order.id}`} className="hover:underline">
                      ORD-{order.id.slice(0, 8).toUpperCase()}
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 font-bold rounded-md text-xs ${role === "buyer"
                        ? "bg-foreground text-background"
                        : "bg-surface-container border border-border text-foreground"
                        }`}
                    >
                      {role === "buyer" ? "Pembeli" : "Penjual"}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold">
                    {formatRupiah(Number(order.total_amount || order.total_price || 0))}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 bg-amber-500/10 text-amber-500 font-bold rounded-md text-xs uppercase">
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex gap-2 justify-end">
                    {role === "buyer" && order.status === "pending_payment" && (
                      <Link
                        href={`/orders/${order.id}`}
                        className="text-xs font-bold text-background py-1.5 px-3 bg-foreground rounded-lg hover:bg-foreground/90 transition-colors"
                      >
                        Bayar Segera
                      </Link>
                    )}
                    <Link
                      href={`/orders/${order.id}`}
                      className="text-xs font-bold text-foreground py-1.5 px-3 bg-surface-container rounded-lg hover:bg-muted transition-colors flex items-center shrink-0"
                    >
                      Lihat Detail
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}