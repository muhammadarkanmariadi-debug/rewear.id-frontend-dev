import { httpGet, httpPost, httpPut, httpDelete } from "@/lib/http-client";
import { encryptClientPayload } from "@/lib/auth-token";
import { API_ENDPOINTS } from "@/configs/api";

export const addressService = {
  async getAll(params?: Record<string, string>) {
    return httpGet(API_ENDPOINTS.ADDRESSES, "token", undefined, params);
  },
  async create(data: Record<string, unknown>) {
    const payload = await encryptClientPayload(JSON.stringify(data));
    return httpPost(API_ENDPOINTS.ADDRESSES, payload, "token");
  },
  async update(id: string, data: Record<string, unknown>) {
    const payload = await encryptClientPayload(JSON.stringify(data));
    return httpPut(API_ENDPOINTS.ADDRESS_DETAIL(id), payload, "token");
  },
  async remove(id: string) {
    return httpDelete(API_ENDPOINTS.ADDRESS_DETAIL(id), "token");
  },
};
