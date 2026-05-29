/* eslint-disable @typescript-eslint/no-explicit-any */
import { env } from "@/env";
import { BINDERBYTE_API_BASE_URL } from "@/configs/api";
import type {
  BinderbyteCourier,
  BinderbyteProvince,
  BinderbyteCity,
} from "@/entities/shipment";

const API_KEY = env.BINDERBYTE_API_KEY;
const WILAYAH_BASE = "https://www.emsifa.com/api-wilayah-indonesia/api";

export const binderbyteService = {
  /**
   * Get List of Supported Couriers
   */
  async getCouriers(): Promise<BinderbyteCourier[]> {
    const url = new URL(`${BINDERBYTE_API_BASE_URL}/list_courier`);
    url.searchParams.append("api_key", API_KEY || "");

    const res = await fetch(url.toString(), {
      method: "GET",
      headers: { Accept: "application/json" },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch couriers from Binderbyte");
    }

    const json = await res.json();
    return json.data || [];
  },

  /**
   * Get List of Provinces
   * Source: emsifa (free, no API key required)
   */
  async getProvinces(): Promise<BinderbyteProvince[]> {
    const res = await fetch(`${WILAYAH_BASE}/provinces.json`);

    if (!res.ok) {
      throw new Error("Failed to fetch provinces");
    }

    return await res.json();
  },

  /**
   * Get List of Cities/Regencies based on Province ID
   * Source: emsifa (free, no API key required)
   */
  async getCities(provinceId: string): Promise<BinderbyteCity[]> {
    const res = await fetch(`${WILAYAH_BASE}/regencies/${provinceId}.json`);

    if (!res.ok) {
      throw new Error("Failed to fetch cities");
    }

    return await res.json();
  },

  /**
   * Get List of Districts based on City ID
   * Source: emsifa (free, no API key required)
   */
  async getDistricts(cityId: string): Promise<any[]> {
    const res = await fetch(`${WILAYAH_BASE}/districts/${cityId}.json`);

    if (!res.ok) {
      throw new Error("Failed to fetch districts");
    }

    return await res.json();
  },

  /**
   * Get List of Villages based on District ID
   * Source: emsifa (free, no API key required)
   */
  async getVillages(districtId: string): Promise<any[]> {
    const res = await fetch(`${WILAYAH_BASE}/villages/${districtId}.json`);

    if (!res.ok) {
      throw new Error("Failed to fetch villages");
    }

    return await res.json();
  },
};