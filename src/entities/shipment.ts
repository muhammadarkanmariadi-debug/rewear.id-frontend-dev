import type { Timestamps } from "./common";

export type Courier = "jne" | "jnt" | "sicepat" | "anteraja" | "pos" | "tiki";

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
  origin_city_id: number;
  destination_city_id: number;
  shipping_cost: number;
  estimated_delivery: string | null;
  delivered_at: string | null;
}

// ──  Region & Courier Types ──────────────────────

export interface Province {
  id: number;
  name: string;
}

export interface City {
  id: number;
  province_id: number;
  name: string;
}



// ── Backend-facing Types (used by shipment.service.ts) ─────

export interface ShippingCostRequest {
  origin: number;
  destination: number;
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
