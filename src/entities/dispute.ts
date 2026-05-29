import type { Timestamps } from "./common";

export type DisputeStatus =
  | "open"
  | "under_review"
  | "resolved_refund"
  | "resolved_release"
  | "closed";

export interface Dispute extends Timestamps {
  id: string;
  order_id: string;
  opened_by: string;
  reason: string;
  evidence_images: string[];
  status: DisputeStatus;
  admin_notes: string | null;
  resolved_at: string | null;
}

export interface CreateDisputeRequest {
  order_id: string;
  reason: string;
  evidence_images?: File[];
}
