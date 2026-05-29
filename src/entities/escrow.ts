import type { Timestamps } from "./common";

export type EscrowStatus =
  | "pending"
  | "paid"
  | "in_delivery"
  | "delivered"
  | "completed"
  | "disputed"
  | "refunded"
  | "auto_completed";

export interface EscrowTransaction extends Timestamps {
  id: string;
  order_id: string;
  amount: number;
  status: EscrowStatus;
  paid_at: string | null;
  released_at: string | null;
  auto_release_at: string | null;
  disputed_at: string | null;
  refunded_at: string | null;
}

export const ESCROW_STATUS_LABELS: Record<EscrowStatus, string> = {
  pending: "Menunggu Pembayaran",
  paid: "Dana Ditahan",
  in_delivery: "Dalam Pengiriman",
  delivered: "Menunggu Konfirmasi",
  completed: "Selesai",
  disputed: "Dalam Sengketa",
  refunded: "Dana Dikembalikan",
  auto_completed: "Otomatis Selesai",
};
