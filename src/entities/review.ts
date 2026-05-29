import type { Timestamps } from "./common";

export interface Review extends Timestamps {
  id: string;
  order_id: string;
  reviewer_id: string;
  seller_id: string;
  reviewer: {
    id: string;
    name: string;
    username: string;
    avatar_url: string | null;
  };
  rating: number; // 1 - 5
  comment: string;
  reply: string | null;
  replied_at: string | null;
}

export interface CreateReviewRequest {
  order_id: string;
  rating: number;
  comment: string;
}
