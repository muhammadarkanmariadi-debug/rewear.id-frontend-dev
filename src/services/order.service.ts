import { httpClient } from "./http-client";
import { API_ENDPOINTS } from "@/configs/api";
import type {
  ApiResponse,
  PaginatedResponse,
  Order,
  CreateOrderRequest,
  PaginationParams,
} from "@/entities";

export const orderService = {
  async getAll(params?: PaginationParams) {
    const res = await httpClient.get<PaginatedResponse<Order>>(
      API_ENDPOINTS.ORDERS,
      { params },
    );
    return res.data;
  },

  async getById(id: string) {
    const res = await httpClient.get<ApiResponse<Order>>(
      API_ENDPOINTS.ORDER_DETAIL(id),
    );
    return res.data.data;
  },

  async create(data: CreateOrderRequest) {
    const res = await httpClient.post<ApiResponse<Order>>(
      API_ENDPOINTS.ORDERS,
      data,
    );
    return res.data.data;
  },

  async confirmDelivery(id: string) {
    const res = await httpClient.post<ApiResponse<Order>>(
      API_ENDPOINTS.ORDER_CONFIRM_RECEIVED(id),
    );
    return res.data.data;
  },
};
