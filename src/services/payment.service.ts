import { httpClient } from "./http-client";
import { API_ENDPOINTS } from "@/configs/api";
import type { ApiResponse, Payment } from "@/entities";

export const paymentService = {
  async initiate(orderId: string) {
    const res = await httpClient.post<ApiResponse<Payment>>(
      API_ENDPOINTS.PAYMENTS,
      { order_id: orderId },
    );
    return res.data.data;
  },

  async getStatus(paymentId: string) {
    const res = await httpClient.get<ApiResponse<Payment>>(
      API_ENDPOINTS.PAYMENT_STATUS(paymentId),
    );
    return res.data.data;
  },
};
