import { Product } from "./product";
import { User } from "./user";

export type OrderStatus =
  | "pending_payment"
  | "paid"
  | "processing"
  | "shipped"
  | "delivered"
  | "completed"
  | "cancelled"
  | "disputed"
  | "refunded";

export interface Order {
  id: string;
  order_number: string;
  buyer: User;
  seller: User;
  product: Product;
  product_price: number;
  shipping_cost: number;
  service_fee: number;
  total_amount: number;
  status: OrderStatus;
  notes: string | null;
  payment?: import("./payment").Payment;
  shipment?: import("./shipment").Shipment;
  address?: import("./shipment").Shipment; // Sometimes returned as address in resource
  created_at: string;
}

export interface CreateOrderRequest {
  product_id: string;
  shipping_address_id: string;
  courier: string;
  service: string;
  shipping_cost: number;
  notes?: string;
}
