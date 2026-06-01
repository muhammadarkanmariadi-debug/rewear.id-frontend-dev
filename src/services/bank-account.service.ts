import { httpGet, httpPost, httpDelete } from "@/lib/http-client";
import { encryptClientPayload } from "@/lib/auth-token";
import { API_ENDPOINTS } from "@/configs/api";

export const bankAccountService = {
  async getAll(params?: Record<string, string>) {
    return httpGet(API_ENDPOINTS.BANK_ACCOUNTS, "token", undefined, params);
  },
  async create(data: Record<string, unknown>) {
    const payload = await encryptClientPayload(JSON.stringify(data));
    return httpPost(API_ENDPOINTS.BANK_ACCOUNTS, payload, "token");
  },
  async remove(id: string) {
    return httpDelete(API_ENDPOINTS.BANK_ACCOUNT_DETAIL(id), "token");
  },
};
