import { BASE_API_URL } from "@/global";

export const API_BASE_URL = BASE_API_URL;

export const BINDERBYTE_API_BASE_URL = process.env.NEXT_PUBLIC_BINDERBYTE_API_URL as string;

export const API_ENDPOINTS = {
  // Auth
  AUTH_LOGIN: "/auth/login",
  AUTH_REGISTER: "/auth/register",
  AUTH_LOGOUT: "/auth/logout",
  AUTH_ME: "/auth/me",
  AUTH_PROFILE_UPDATE: "/auth/me",
  AUTH_FORGOT_PASSWORD: "/auth/forgot-password",
  AUTH_RESET_PASSWORD: "/auth/reset-password",
  AUTH_VERIFY_EMAIL: (id: string, hash: string, expires: string, signature: string) => `/auth/email/verify/${id}/${hash}&signature=${signature}`,
  AUTH_GOOGLE: "/auth/google", // Not in swagger but keeps existing structure

  // Discovery (Provinces, Cities, Brands, Categories)
  PROVINCES: "/provinces",
  CITIES: "/cities",
  BRANDS: "/brands",
  CATEGORIES: "/categories",
  SEARCH: "/search",

  // Users (from Admin/Verification context)
  USERS: "/users",
  USER_PROFILE: (id: string) => `/users/${id}`,
  USER_KTP_UPLOAD: "/users/verify-ktp",

  // Addresses
  ADDRESSES: "/addresses",
  ADDRESS_DETAIL: (id: string) => `/addresses/${id}`,

  // Bank Accounts
  BANK_ACCOUNTS: "/bank-accounts",
  BANK_ACCOUNT_DETAIL: (id: string) => `/bank-accounts/${id}`,

  // Products
  PRODUCTS: "/products",
  SELLER_PRODUCTS: "/seller/products",
  PRODUCT_DETAIL: (slug: string) => `/products/${slug}`, // Detail by slug
  SELLER_PRODUCT_DETAIL: (id: string) => `/seller/products/${id}`,
  PRODUCT_IMAGES: (id: string) => `/seller/products/${id}/images`, // Matches Swagger "/seller/products/{product}/images"
  SELLER_PRODUCT_IMAGES: (id: string) => `/seller/products/${id}/images`,

  // Orders
  ORDERS: "/orders",
  SELLER_ORDERS: "/seller/orders",
  ORDER_DETAIL: (id: string) => `/orders/${id}`,
  ORDER_CONFIRM_RECEIVED: (id: string) => `/orders/${id}/confirm-received`,
  SELLER_ORDER_SHIP: (id: string) => `/orders/${id}/ship`,

  // Payments / Snap
  PAYMENTS: (orderId: string) => `/orders/${orderId}/pay`,
  PAYMENT_STATUS: (id: string) => `/payments/${id}/status`, // Left for backward compatibility if needed

  // Shipments
  SHIPPING_COST: "/shipping/cost",
  SHIPMENT_TRACK: (id: string) => `/shipments/${id}/track`,

  // Escrow Confirm
  ESCROW_CONFIRM_RECEIPT: (orderId: string) => `/orders/${orderId}/confirm-received`,

  // Chat
  CONVERSATIONS: "/conversations",
  MESSAGES: (conversationId: string) =>
    `/conversations/${conversationId}/messages`,

  // Reviews
  REVIEWS: (orderId: string) => `/orders/${orderId}/reviews`,
  REVIEW_REPLY: (id: string) => `/reviews/${id}/reply`,

  // Wishlist
  BOOKMARKS: "/bookmarks",
  BOOKMARK_TOGGLE: (id: string) => `/bookmarks/${id}/toggle`,

  // Withdrawals
  WITHDRAWALS: "/withdrawals",

  // Admin
  ADMIN_USERS: "/admin/users",
  ADMIN_PRODUCTS: "/admin/products",
  ADMIN_DISPUTES: "/admin/disputes",
  ADMIN_REPORTS: "/admin/reports",
} as const;
