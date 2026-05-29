import type { Timestamps } from "./common";

export type Courier = "jne" | "jnt" | "sicepat" | "anteraja";

export type ShipmentStatus =
  | "pending"
  | "picked_up"
  | "in_transit"
  | "delivered";

export interface Shipment extends Timestamps {
  id: string;
  order_id: string;
  courier: Courier;
  service: string;
  tracking_number: string | null;
  status: ShipmentStatus;
  weight: number; // in grams
  origin_city_id: string;
  destination_city_id: string;
  shipping_cost: number;
  estimated_delivery: string | null;
  delivered_at: string | null;
}

// ── Binderbyte Region & Courier Types ──────────────────────

export interface BinderbyteProvince {
  id: string;
  name: string;
}

export interface BinderbyteCity {
  id: string;
  name: string;
}

export interface BinderbyteCourier {
  code: string;
  description: string;
}

// ── Backend-facing Types (used by shipment.service.ts) ─────

export interface ShippingCostRequest {
  origin: string;
  destination: string;
  weight: number;
  courier: Courier;
}

export interface ShippingCostOption {
  service: string;
  description: string;
  cost: number;
  etd: string;
}

export interface TrackingEvent {
  date: string;
  desc: string;
  location: string;
}
