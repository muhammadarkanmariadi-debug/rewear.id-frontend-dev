import { httpClient } from "./http-client";
import { API_ENDPOINTS } from "@/configs/api";
import type {
  ApiResponse,
  User,
  UserProfile,
  Withdrawal,
  CreateWithdrawalRequest,
  PaginatedResponse,
} from "@/entities";

export const userService = {
  async getProfile(userId: string) {
    const res = await httpClient.get<ApiResponse<UserProfile>>(
      API_ENDPOINTS.USER_PROFILE(userId),
    );
    return res.data.data;
  },

  async updateProfile(data: Partial<Pick<User, "name" | "bio" | "phone">>) {
    const res = await httpClient.put<ApiResponse<User>>(
      API_ENDPOINTS.AUTH_PROFILE_UPDATE,
      data,
    );
    return res.data.data;
  },

  async uploadAvatar(file: File) {
    const formData = new FormData();
    formData.append("avatar", file);
    const res = await httpClient.post<ApiResponse<User>>(
      `${API_ENDPOINTS.USERS}/avatar`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } },
    );
    return res.data.data;
  },

  async uploadKtp(file: File) {
    const formData = new FormData();
    formData.append("ktp_image", file);
    const res = await httpClient.post<ApiResponse<{ status: string }>>(
      API_ENDPOINTS.USER_KTP_UPLOAD,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } },
    );
    return res.data.data;
  },

  // ── Wishlist ─────────────────────────────────────────────
  async getWishlist() {
    const res = await httpClient.get<PaginatedResponse<{ product_id: string }>>(
      API_ENDPOINTS.BOOKMARKS,
    );
    return res.data;
  },

  async addToWishlist(productId: string) {
    await httpClient.post(API_ENDPOINTS.BOOKMARK_TOGGLE(productId));
  },

  async removeFromWishlist(productId: string) {
    await httpClient.delete(`${API_ENDPOINTS.BOOKMARKS}/${productId}`);
  },

  // ── Withdrawals ──────────────────────────────────────────
  async getWithdrawals() {
    const res = await httpClient.get<PaginatedResponse<Withdrawal>>(
      API_ENDPOINTS.WITHDRAWALS,
    );
    return res.data;
  },

  async requestWithdrawal(data: CreateWithdrawalRequest) {
    const res = await httpClient.post<ApiResponse<Withdrawal>>(
      API_ENDPOINTS.WITHDRAWALS,
      data,
    );
    return res.data.data;
  },
};
