import { User } from "./user";

export type ProductCondition = "baru" | "bekas_baik" | "bekas" | "baru_dengan_tag" | "seperti_baru" | "baik" | "wajar";
export type ProductCategory = "baju" | "celana" | "kaos" | "kemeja" | "jaket" | "hoodie" | "sweater" | "jeans" | "chino" | "jogger" | "celana_pendek" | "rok" | "dress" | "lainnya";
export type ProductSize = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";
export type ListingStatus = "aktif" | "terjual" | "diarsipkan";

export interface Product {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  condition: ProductCondition;
  category: ProductCategory;
  size: ProductSize;
  brand?: string;
  images: string[];
  seller: User;
  status: ListingStatus;
  createdAt: string;
  wishlistCount: number;
}

export interface ProductFilterParams {
  category?: ProductCategory;
  condition?: ProductCondition;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}

export interface CreateProductRequest {
  title: string;
  description: string;
  price: number;
  condition: ProductCondition;
  category: ProductCategory;
  size: ProductSize;
  brand?: string;
  images?: string[];
}
