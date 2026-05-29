import { Product } from "./product";
import { User } from "./user";

export type EscrowStatus =
  | "PENDING"
  | "PAID"
  | "IN_DELIVERY"
  | "DELIVERED"
  | "COMPLETED"
  | "DISPUTED"
  | "REFUNDED"
  | "AUTO_COMPLETED";

export interface Order {
  id: string;
  product: Product;
  buyer: User;
  seller: User;
  totalAmount: number;
  shippingCost: number;
  shippingCourier: string;
  trackingNumber?: string;
  escrowStatus: EscrowStatus;
  createdAt: string;
  deliveredAt?: string;
  completedAt?: string;
}

export interface CreateOrderRequest {
  productId: string;
  shippingCourier: string;
  shippingCost: number;
}
