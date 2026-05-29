import type { Timestamps } from "./common";

export interface User extends Timestamps {
  id: string;
  name: string;
  email: string;
  username: string;
  avatar_url: string | null;
  bio: string | null;
  phone: string | null;
  role: UserRole;
  is_verified: boolean;
  seller_rating: number;
  buyer_rating: number;
  total_sales: number;
  
  total_purchases: number;
}

export type UserRole = "buyer" | "seller" | "admin";

export interface UserProfile {
  id: string;
  name: string;
  username: string;
  avatar_url: string | null;
  bio: string | null;
  seller_rating: number;
  total_sales: number;
  is_verified: boolean;
  joined_at: string;
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
  username: string;
  password: string;
  password_confirmation: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
