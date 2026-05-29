import { httpClient } from "./http-client";
import { API_ENDPOINTS } from "@/configs/api";
import type {
  ApiResponse,
  Shipment,
  ShippingCostRequest,
  ShippingCostOption,
  TrackingEvent,
} from "@/entities";

export const shipmentService = {
  async addTracking(orderId: string, trackingNumber: string) {
    const res = await httpClient.post<ApiResponse<Shipment>>(
      API_ENDPOINTS.SHIPMENTS,
      { order_id: orderId, tracking_number: trackingNumber },
    );
    return res.data.data;
  },

  async getShippingCost(data: ShippingCostRequest) {
    const res = await httpClient.post<ApiResponse<ShippingCostOption[]>>(
      API_ENDPOINTS.SHIPPING_COST,
      data,
    );
    return res.data.data;
  },

  async track(shipmentId: string) {
    const res = await httpClient.get<ApiResponse<TrackingEvent[]>>(
      API_ENDPOINTS.SHIPMENT_TRACK(shipmentId),
    );
    return res.data.data;
  },
};
