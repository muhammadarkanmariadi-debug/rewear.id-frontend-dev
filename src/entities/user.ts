import type { Timestamps } from "./common";

export interface User extends Timestamps {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  avatar_url: string | null;
  bio: string | null;
  is_seller: boolean;
  is_seller_verified: boolean;
  is_admin: boolean;
  rating_avg: number;
  rating_count: number;
}

export interface SellerVerification extends Timestamps {
  id: string;
  user_id: string;
  ktp_image_url: string;
  status: "pending" | "approved" | "rejected";
  rejection_reason: string | null;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  phone?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
