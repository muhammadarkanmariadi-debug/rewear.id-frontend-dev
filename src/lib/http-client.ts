"use server";

import { BASE_API_URL } from "@/global";
import { resolveAuthHeader, decryptClientPayload } from "./auth-token";
import { setCookies } from "./cookies";
import { buildFetchMeta, FetchMeta } from "./http-meta";

// ── Types ─────────────────────────────────────────────────────

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type ApiResponse = {
  status: boolean;
  message?: string | null;
  data?: any | null;
  token?: string | null;
  meta?: any | null;
  code: number | 400 | 401 | 403 | 404 | 500 | 503;
};

type RequestOptions = {
  credential?: string;
  payload?: string | FormData;
  query?: Record<string, string>;
  meta?: FetchMeta;
};

// ── Internal helpers ──────────────────────────────────────────

const resolveBody = async (
  payload?: string | FormData
): Promise<BodyInit | null> => {
  if (!payload) return null;
  if (typeof payload === "string") return await decryptClientPayload(payload);
  return payload;
};

const resolveHeaders = async (
  credential?: string,
  payload?: string | FormData
): Promise<Record<string, string>> => {
  const headers: Record<string, string> = {
    Authorization: await resolveAuthHeader(credential),
  };
  if (typeof payload === "string") {
    headers["Content-Type"] = "application/json";
  }
  return headers;
};

const resolveQuery = (query?: Record<string, string>): string => {
  if (!query || Object.keys(query).length === 0) return "";
  return `?${new URLSearchParams(query).toString()}`;
};

// ── Core request ──────────────────────────────────────────────

export const httpRequest = async <T = Record<string, never>>(
  method: HttpMethod,
  endpoint: string,
  options: RequestOptions = {}
): Promise<ApiResponse> => {
  const { credential, payload, query, meta } = options;

  try {
    const url = `${BASE_API_URL}${endpoint}${resolveQuery(query)}`;
    const headers = await resolveHeaders(credential, payload);
    const fetchMeta = buildFetchMeta(meta);

    const response = await fetch(url, {
      method,
      headers,
      body: await resolveBody(payload),
      credentials: "include",
      ...fetchMeta,
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        status: false,
        message: data?.message ?? `Request failed: ${response.status}`,
        data,
        code: response.status,
      };
    }

    return {
      status: data?.success ?? true,
      message: data?.message ?? null,
      token: data?.token ?? null,
      data: data?.data ?? null,
      meta: data?.meta ?? null,
      code: data.status,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return { status: false, message, data: null, code: 500 };
  }
};

// ── Login khusus: simpan token ke cookie ──────────────────────

export const httpLogin = async <T extends { token: string | null }>(
  endpoint: string,
  payload: string | FormData,
  credential?: string
): Promise<ApiResponse> => {
  const result = await httpRequest<T>("POST", endpoint, {
    credential,
    payload,
    meta: { cache: "no-store" },
  });

  if (result.status && result.data.token) {
    await setCookies("token", result.data.token);

  }

  return result;
};

// ── Shorthand helpers ─────────────────────────────────────────

export const httpGet = async <T = Record<string, never>>(
  endpoint: string,
  credential?: string,
  meta?: FetchMeta,
  query?: Record<string, string>
) => httpRequest<T>("GET", endpoint, { credential, meta, query });


export const httpPost = async <T = Record<string, never>>(
  endpoint: string,
  payload: string | FormData,
  credential?: string,
  query?: Record<string, string>
) =>
  httpRequest<T>("POST", endpoint, {
    credential,
    payload,
    query,
    meta: { cache: "no-store" },
  });

export const httpPut = async <T = Record<string, never>>(
  endpoint: string,
  payload: string | FormData,
  credential?: string,
  query?: Record<string, string>
) =>
  httpRequest<T>("PUT", endpoint, {
    credential,
    payload,
    query,
    meta: { cache: "no-store" },
  });

export const httpDelete = async <T = Record<string, never>>(
  endpoint: string,
  credential?: string,
  query?: Record<string, string>
) =>
  httpRequest<T>("DELETE", endpoint, {
    credential,
    query,
    meta: { cache: "no-store" },
  });