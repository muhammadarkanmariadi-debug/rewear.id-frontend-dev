import { httpGet, httpPost, httpDelete } from "@/lib/http-client";
import { API_ENDPOINTS } from "@/configs/api";

export const bookmarkService = {
  async getAll(params?: Record<string, string>) {
    return httpGet(API_ENDPOINTS.BOOKMARKS, "token", undefined, params);
  },
  async toggle(productId: string) {
    return httpPost(API_ENDPOINTS.BOOKMARK_TOGGLE(productId), "{}", "token");
  },
  async remove(productId: string) {
    return httpDelete(API_ENDPOINTS.BOOKMARK_TOGGLE(productId), "token"); // Actually backend has a DEL route but toggling is more convenient
  },
};
