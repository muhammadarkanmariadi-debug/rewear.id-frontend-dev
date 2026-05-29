import type { EscrowStatus } from "@/entities";

export const ESCROW_STATUS_COLOR: Record<EscrowStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  paid: "bg-blue-100 text-blue-800",
  in_delivery: "bg-indigo-100 text-indigo-800",
  delivered: "bg-purple-100 text-purple-800",
  completed: "bg-green-100 text-green-800",
  disputed: "bg-red-100 text-red-800",
  refunded: "bg-gray-100 text-gray-800",
  auto_completed: "bg-emerald-100 text-emerald-800",
};
