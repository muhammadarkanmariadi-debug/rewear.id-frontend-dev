import { httpGet, httpPost } from "@/lib/http-client";
import { encryptClientPayload } from "@/lib/auth-token";
import { API_ENDPOINTS } from "@/configs/api";

export const orderService = {
  async getAll(params?: Record<string, string | number>) {
    return httpGet(API_ENDPOINTS.ORDERS, "token", undefined, params as any);
  },
  async getSellerOrders(params?: Record<string, string | number>) {
    return httpGet(API_ENDPOINTS.SELLER_ORDERS, "token", undefined, params as any);
  },
  async getById(id: string) {
    return httpGet(API_ENDPOINTS.ORDER_DETAIL(id), "token");
  },
  async create(data: Record<string, unknown>) {
    const payload = await encryptClientPayload(JSON.stringify(data));
    return httpPost<{ id: string; order_id?: string }>(API_ENDPOINTS.ORDERS, payload, "token");
  },
  async confirmDelivery(id: string) {
    const payload = await encryptClientPayload(JSON.stringify({}));
    return httpPost(API_ENDPOINTS.ORDER_CONFIRM_RECEIVED(id), payload, "token");
  },
};
