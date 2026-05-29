// ─── Common / Shared Types ────────────────────────────────

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export type SortOrder = "asc" | "desc";

export interface PaginationParams {
  page?: number;
  per_page?: number;
  sort_by?: string;
  sort_order?: SortOrder;
}

export interface Timestamps {
  created_at: string;
  updated_at: string;
}
