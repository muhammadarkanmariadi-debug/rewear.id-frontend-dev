import { httpGet, httpPost, httpPut, httpDelete } from "@/lib/http-client";
import { encryptClientPayload } from "@/lib/auth-token";
import { API_ENDPOINTS } from "@/configs/api";

export const productService = {
  async getAll(params?: Record<string, string>) {
    return httpGet(API_ENDPOINTS.PRODUCTS, undefined, undefined, params);
  },
  async getSellerProducts(params?: Record<string, string>) {
    return httpGet(API_ENDPOINTS.SELLER_PRODUCTS, "token", undefined, params);
  },
  async getById(slug: string) {
    return httpGet(API_ENDPOINTS.PRODUCT_DETAIL(slug), "token");
  },
  async create(data: Record<string, unknown>) {
    const payload = await encryptClientPayload(JSON.stringify(data));
    return httpPost(API_ENDPOINTS.SELLER_PRODUCTS, payload, "token");
  },
  async update(id: string, data: Record<string, unknown>) {
    const payload = await encryptClientPayload(JSON.stringify(data));
    return httpPut(API_ENDPOINTS.SELLER_PRODUCT_DETAIL(id), payload, "token");
  },
  async remove(id: string) {
    return httpDelete(API_ENDPOINTS.SELLER_PRODUCT_DETAIL(id), "token");
  },
  async uploadImages(productId: string, formData: FormData) {
    return httpPost(API_ENDPOINTS.SELLER_PRODUCT_IMAGES(productId), formData, "token");
  },
};
