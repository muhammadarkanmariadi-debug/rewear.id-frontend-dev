import { httpPost, httpGet } from "@/lib/http-client";
import { encryptClientPayload } from "@/lib/auth-token";
import { API_ENDPOINTS } from "@/configs/api";

export const paymentService = {
  async initiate(orderId: string) {
    const payload = await encryptClientPayload(JSON.stringify({}));
    return httpPost(API_ENDPOINTS.PAYMENTS(orderId), payload, "token");
  },
  async getStatus(paymentId: string) {
    return httpGet(API_ENDPOINTS.PAYMENT_STATUS(paymentId), "token");
  },
};
