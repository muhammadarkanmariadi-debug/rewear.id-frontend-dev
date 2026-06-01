import { httpGet, httpPost } from "@/lib/http-client";
import { encryptClientPayload } from "@/lib/auth-token";
import { API_ENDPOINTS } from "@/configs/api";

export const escrowService = {
  async getStatus(orderId: string) {
    return httpGet(API_ENDPOINTS.ESCROW_CONFIRM_RECEIPT(orderId), "token");
  },
  async confirmReceipt(orderId: string) {
    const payload = await encryptClientPayload(JSON.stringify({}));
    return httpPost(API_ENDPOINTS.ESCROW_CONFIRM_RECEIPT(orderId), payload, "token");
  },
  async openDispute(orderId: string, reason: string, evidence?: File[]) {
    const formData = new FormData();
    formData.append("reason", reason);
    evidence?.forEach((file) => formData.append("evidence[]", file));
    return httpPost(
      API_ENDPOINTS.ESCROW_CONFIRM_RECEIPT(orderId).replace("confirm-received", "dispute"),
      formData,
      "token"
    );
  },
};
