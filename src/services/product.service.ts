import { httpClient } from "./http-client";
import { API_ENDPOINTS } from "@/configs/api";
import type {
  ApiResponse,
  PaginatedResponse,
  Product,
  ProductFilterParams,
  CreateProductRequest,
  PaginationParams,
} from "@/entities";

export const productService = {
  async getAll(params?: ProductFilterParams & PaginationParams) {
    const res = await httpClient.get<PaginatedResponse<Product>>(
      API_ENDPOINTS.PRODUCTS,
      { params },
    );
    return res.data;
  },

  async getById(id: string) {
    const res = await httpClient.get<ApiResponse<Product>>(
      API_ENDPOINTS.PRODUCT_DETAIL(id),
    );
    return res.data.data;
  },

  async create(data: CreateProductRequest) {
    const res = await httpClient.post<ApiResponse<Product>>(
      API_ENDPOINTS.PRODUCTS,
      data,
    );
    return res.data.data;
  },

  async update(id: string, data: Partial<CreateProductRequest>) {
    const res = await httpClient.put<ApiResponse<Product>>(
      API_ENDPOINTS.PRODUCT_DETAIL(id),
      data,
    );
    return res.data.data;
  },

  async delete(id: string) {
    await httpClient.delete(API_ENDPOINTS.PRODUCT_DETAIL(id));
  },

  async uploadImages(productId: string, images: File[]) {
    const formData = new FormData();
    images.forEach((image) => formData.append("images[]", image));
    const res = await httpClient.post<ApiResponse<Product>>(
      API_ENDPOINTS.PRODUCT_IMAGES(productId),
      formData,
      { headers: { "Content-Type": "multipart/form-data" } },
    );
    return res.data.data;
  },
};
