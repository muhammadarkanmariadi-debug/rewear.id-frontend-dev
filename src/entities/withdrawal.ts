import type { Timestamps } from "./common";

export type WithdrawalStatus =
  | "pending"
  | "processing"
  | "completed"
  | "rejected";

export interface Withdrawal extends Timestamps {
  id: string;
  user_id: string;
  amount: number;
  bank_name: string;
  account_number: string;
  account_holder: string;
  status: WithdrawalStatus;
  processed_at: string | null;
  rejection_reason: string | null;
}

export interface CreateWithdrawalRequest {
  amount: number;
  bank_name: string;
  account_number: string;
  account_holder: string;
}
