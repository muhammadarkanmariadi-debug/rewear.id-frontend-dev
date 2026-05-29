import type { Timestamps } from "./common";

export type PaymentMethod =
  | "bank_transfer"
  | "gopay"
  | "ovo"
  | "qris"
  | "shopeepay";

export type PaymentStatus =
  | "pending"
  | "success"
  | "failed"
  | "expired"
  | "refunded";

export interface Payment extends Timestamps {
  id: string;
  order_id: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  midtrans_transaction_id: string | null;
  snap_token: string | null;
  redirect_url: string | null;
  paid_at: string | null;
  expired_at: string | null;
}
