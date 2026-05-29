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
  etd: string; // estimated time of delivery, e.g. "2-3"
}

export interface TrackingEvent {
  date: string;
  description: string;
  location: string;
}
