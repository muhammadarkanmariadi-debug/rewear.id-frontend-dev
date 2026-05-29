import { httpClient } from "./http-client";
import { API_ENDPOINTS } from "@/configs/api";
import type { ApiResponse, EscrowTransaction } from "@/entities";

export const escrowService = {
  async getStatus(orderId: string) {
    const res = await httpClient.get<ApiResponse<EscrowTransaction>>(
      API_ENDPOINTS.ESCROW_STATUS(orderId),
    );
    return res.data.data;
  },

  async confirmReceipt(orderId: string) {
    const res = await httpClient.post<ApiResponse<EscrowTransaction>>(
      API_ENDPOINTS.ESCROW_CONFIRM_RECEIPT(orderId),
    );
    return res.data.data;
  },

  async openDispute(orderId: string, reason: string, evidence?: File[]) {
    const formData = new FormData();
    formData.append("reason", reason);
    evidence?.forEach((file) => formData.append("evidence[]", file));
    const res = await httpClient.post<ApiResponse<EscrowTransaction>>(
      API_ENDPOINTS.ESCROW_DISPUTE(orderId),
      formData,
      { headers: { "Content-Type": "multipart/form-data" } },
    );
    return res.data.data;
  },
};
