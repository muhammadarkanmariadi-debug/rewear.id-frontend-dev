import type { ProductCategory, ProductCondition, ProductSize } from "@/entities";

export const PRODUCT_CATEGORIES: { value: ProductCategory; label: string }[] = [
  { value: "kaos", label: "Kaos" },
  { value: "kemeja", label: "Kemeja" },
  { value: "jaket", label: "Jaket" },
  { value: "hoodie", label: "Hoodie" },
  { value: "sweater", label: "Sweater" },
  { value: "jeans", label: "Jeans" },
  { value: "chino", label: "Chino" },
  { value: "jogger", label: "Jogger" },
  { value: "celana_pendek", label: "Celana Pendek" },
  { value: "rok", label: "Rok" },
  { value: "dress", label: "Dress" },
  { value: "lainnya", label: "Lainnya" },
];

export const PRODUCT_CONDITIONS: { value: ProductCondition; label: string }[] = [
  { value: "baru_dengan_tag", label: "Baru dengan Tag" },
  { value: "seperti_baru", label: "Seperti Baru" },
  { value: "baik", label: "Baik" },
  { value: "wajar", label: "Wajar" },
];

export const PRODUCT_SIZES: ProductSize[] = [
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "XXL",
  "XXXL",
];
