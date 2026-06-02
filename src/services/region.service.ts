/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_ENDPOINTS } from "@/configs/api";
import { httpGet } from "@/lib/http-client";
import type {
  Province,
  City,
} from "@/entities/shipment";
export const RegionService = {

  /**
   * Get List of Provinces from Backend
   */
  async getProvinces(): Promise<Province[]> {
    const res = await httpGet<Province[]>(API_ENDPOINTS.PROVINCES);
    if (!res.status || !res.data) {
      throw new Error(res.message || "Failed to fetch provinces");
    }
    return res.data;
  },

  /**
   * Get List of Cities/Regencies from Backend
   */
  async getCities(): Promise<City[]> {
    const res = await httpGet<City[]>(API_ENDPOINTS.CITIES);
    if (!res.status || !res.data) {
      throw new Error(res.message || "Failed to fetch cities");
    }
    return res.data;
  },


};