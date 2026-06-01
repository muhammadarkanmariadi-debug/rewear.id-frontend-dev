import { httpGet, httpPost } from "@/lib/http-client";
import { encryptClientPayload } from "@/lib/auth-token";
import { API_ENDPOINTS } from "@/configs/api";

export const reviewService = {
  async getForOrder(orderId: string, params?: Record<string, string>) {
    return httpGet(API_ENDPOINTS.REVIEWS(orderId), "token", undefined, params);
  },
  async create(orderId: string, data: Record<string, unknown>) {
    const payload = await encryptClientPayload(JSON.stringify(data));
    return httpPost(API_ENDPOINTS.REVIEWS(orderId), payload, "token");
  },
  async reply(reviewId: string, reply: string) {
    const payload = await encryptClientPayload(JSON.stringify({ reply }));
    return httpPost(API_ENDPOINTS.REVIEW_REPLY(reviewId), payload, "token");
  },
};
