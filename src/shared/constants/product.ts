import type { ProductCondition } from "@/entities";

export const PRODUCT_CATEGORIES: { value: any; label: string }[] = [
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
  { value: "new_with_tag", label: "Baru dengan Tag" },
  { value: "like_new", label: "Seperti Baru" },
  { value: "good", label: "Baik" },
  { value: "fair", label: "Wajar" },
];

export const PRODUCT_SIZES = [
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "XXL",
  "XXXL",
];
