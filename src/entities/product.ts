import { User } from "./user";

export type ProductCondition = "new_with_tag" | "like_new" | "good" | "fair";
export type ProductStatus = "active" | "sold" | "archived";

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon_url: string | null;
  sort_order: number;
  children?: Category[];
}


export interface ProductImage {
  id: string;
  image_url: string;
  position: number;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  description: string;
  size: string;
  condition: ProductCondition;
  color: string | null;
  price: number;
  weight_grams: number;
  status: ProductStatus;
  views_count: number;
  seller: User;
  category: Category;
  brand?: string | null;
  images: ProductImage[] ;
  created_at: string;
  is_bookmarked?: boolean;
}

export interface ProductFilterParams {
  category_id?: string;
  brand?: string;
  condition?: ProductCondition;
  min_price?: number;
  max_price?: number;
  q?: string;
}

export interface CreateProductRequest {
  category_id: string;
  brand?: string;
  title: string;
  description: string;
  size: string;
  condition: ProductCondition;
  color?: string;
  price: number;
  weight_grams: number;
  images?: File[];
}
