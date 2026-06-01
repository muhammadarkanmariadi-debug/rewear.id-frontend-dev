import { httpGet, httpPost } from "@/lib/http-client";
import { encryptClientPayload } from "@/lib/auth-token";
import { API_ENDPOINTS } from "@/configs/api";

export const withdrawalService = {
  async getAll(params?: Record<string, string>) {
    return httpGet(API_ENDPOINTS.WITHDRAWALS, "token", undefined, params);
  },
  async request(data: Record<string, unknown>) {
    const payload = await encryptClientPayload(JSON.stringify(data));
    return httpPost(API_ENDPOINTS.WITHDRAWALS, payload, "token");
  },
};
