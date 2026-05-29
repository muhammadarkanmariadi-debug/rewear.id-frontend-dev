import { httpClient } from "./http-client";
import { API_ENDPOINTS } from "@/configs/api";
import type {
  ApiResponse,
  PaginatedResponse,
  Review,
  CreateReviewRequest,
} from "@/entities";

export const reviewService = {
  async getForSeller(sellerId: string, page?: number) {
    const res = await httpClient.get<PaginatedResponse<Review>>(
      API_ENDPOINTS.REVIEWS,
      { params: { seller_id: sellerId, page } },
    );
    return res.data;
  },

  async create(data: CreateReviewRequest) {
    const res = await httpClient.post<ApiResponse<Review>>(
      API_ENDPOINTS.REVIEWS,
      data,
    );
    return res.data.data;
  },

  async reply(reviewId: string, reply: string) {
    const res = await httpClient.post<ApiResponse<Review>>(
      API_ENDPOINTS.REVIEW_REPLY(reviewId),
      { reply },
    );
    return res.data.data;
  },
};
