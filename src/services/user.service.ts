import { httpGet, httpPost, httpPut, httpDelete } from "@/lib/http-client";
import { encryptClientPayload } from "@/lib/auth-token";
import { API_ENDPOINTS } from "@/configs/api";

export const userService = {
  async getProfile(userId: string) {
    return httpGet(API_ENDPOINTS.USER_PROFILE(userId), "token");
  },
  async updateProfile(data: Record<string, unknown>) {
    const payload = await encryptClientPayload(JSON.stringify(data));
    return httpPut(API_ENDPOINTS.AUTH_PROFILE_UPDATE, payload, "token");
  },
  async uploadAvatar(formData: FormData) {
    return httpPost(`${API_ENDPOINTS.USERS}/avatar`, formData, "token");
  },
  async uploadKtp(formData: FormData) {
    return httpPost(API_ENDPOINTS.USER_KTP_UPLOAD, formData, "token");
  },
  async getWishlist(params?: Record<string, string>) {
    return httpGet(API_ENDPOINTS.BOOKMARKS, "token", undefined, params);
  },
  async toggleWishlist(productId: string) {
    const payload = await encryptClientPayload(JSON.stringify({}));
    return httpPost(API_ENDPOINTS.BOOKMARK_TOGGLE(productId), payload, "token");
  },
  async removeFromWishlist(productId: string) {
    return httpDelete(`${API_ENDPOINTS.BOOKMARKS}/${productId}`, "token");
  },
  async getWithdrawals(params?: Record<string, string>) {
    return httpGet(API_ENDPOINTS.WITHDRAWALS, "token", undefined, params);
  },
  async requestWithdrawal(data: Record<string, unknown>) {
    const payload = await encryptClientPayload(JSON.stringify(data));
    return httpPost(API_ENDPOINTS.WITHDRAWALS, payload, "token");
  },
};
