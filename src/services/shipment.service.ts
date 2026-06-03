import { httpGet, httpPost, httpPut } from "@/lib/http-client";
import { encryptClientPayload } from "@/lib/auth-token";
import { API_ENDPOINTS } from "@/configs/api";

export const shipmentService = {
  async addTracking(orderId: string, courier: string, service: string, trackingNumber: string, estimatedDeliveryAt?: string) {
    const payload = await encryptClientPayload(JSON.stringify({ 
      courier, 
      service, 
      tracking_number: trackingNumber,
      estimated_delivery_at: estimatedDeliveryAt
    }));
    return httpPost(API_ENDPOINTS.SELLER_ORDER_SHIP(orderId), payload, "token");
  },
  async getShippingCost(data: Record<string, unknown>) {
    const payload = await encryptClientPayload(JSON.stringify(data));
    return httpPost(API_ENDPOINTS.SHIPPING_COST, payload, "token");
  },
  async track(shipmentId: string) {
    return httpGet(API_ENDPOINTS.SHIPMENT_TRACK(shipmentId), "token");
  },
  async updateTracking(shipmentId: string, trackingNumber: string, estimatedDeliveryAt?: string) {
    const payload = await encryptClientPayload(JSON.stringify({ 
       tracking_number: trackingNumber,
       estimated_delivery_at: estimatedDeliveryAt
    }));
    return httpPut(API_ENDPOINTS.SHIPMENT_UPDATE_TRACKING(shipmentId), payload, "token");
  }
};
