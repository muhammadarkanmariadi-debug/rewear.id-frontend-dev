import { User } from "./user";

export type ProductCondition = "baru" | "bekas_baik" | "bekas";
export type ProductCategory = "baju" | "celana";
export type ProductSize = "XS" | "S" | "M" | "L" | "XL" | "XXL";
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
