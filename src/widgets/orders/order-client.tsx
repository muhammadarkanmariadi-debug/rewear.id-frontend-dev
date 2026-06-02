"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { orderService } from "@/services";
import { OrdersTable } from "./order-table";
import { DataPagination } from "@/widgets/data-pagination";

export function OrdersClient() {
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "buyer";

  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = role === "seller"
          ? await orderService.getSellerOrders({ page: currentPage, per_page: perPage })
          : await orderService.getAll({ page: currentPage, per_page: perPage });


          console.log(res)
        
        setOrders(res.data || []);
        // Assuming backend returns pagination meta in 'meta' or 'pagination'
        // If Laravel, it's usually res.meta.last_page
        if (res.meta) {
          setLastPage(res.meta.last_page);
        } else {
          setLastPage(1);
        }
      } catch {
        console.error("Failed to load orders");
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [role, currentPage, perPage]);

  // Reset page when role changes
  useEffect(() => {
    setCurrentPage(1);
  }, [role]);

  return (
    <div className="space-y-6">
      <OrdersTable orders={orders} role={role} loading={loading} />
      
      {!loading && orders.length > 0 && (
        <DataPagination
          currentPage={currentPage}
          lastPage={lastPage}
          perPage={perPage}
          onPageChange={setCurrentPage}
          onPerPageChange={(newLimit) => {
            setPerPage(newLimit);
            setCurrentPage(1); // Reset to first page
          }}
          className="mt-8"
        />
      )}
    </div>
  );
}