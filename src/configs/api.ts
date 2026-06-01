export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";

export const BINDERBYTE_API_BASE_URL = "https://api.binderbyte.com";

export const API_ENDPOINTS = {
  // Auth
  AUTH_LOGIN: "/auth/login",
  AUTH_REGISTER: "/auth/register",
  AUTH_LOGOUT: "/auth/logout",
  AUTH_ME: "/auth/me",
  AUTH_PROFILE_UPDATE: "/auth/me",
  AUTH_GOOGLE: "/auth/google",

  // Users
  USERS: "/users",
  USER_PROFILE: (id: string) => `/users/${id}`,
  USER_KTP_UPLOAD: "/users/verify-ktp",

  // Products
  PRODUCTS: "/products",
  SELLER_PRODUCTS: "/seller/products",
  PRODUCT_DETAIL: (id: string) => `/products/${id}`,
  SELLER_PRODUCT_DETAIL: (id: string) => `/seller/products/${id}`,
  PRODUCT_IMAGES: (id: string) => `/products/${id}/images`,
  SELLER_PRODUCT_IMAGES: (id: string) => `/seller/products/${id}/images`,

  // Orders
  ORDERS: "/orders",
  SELLER_ORDERS: "/seller/orders",
  ORDER_DETAIL: (id: string) => `/orders/${id}`,
  ORDER_CONFIRM_RECEIVED: (id: string) => `/orders/${id}/confirm-received`,
  SELLER_ORDER_SHIP: (id: string) => `/orders/${id}/ship`,

  // Escrow
  ESCROW_STATUS: (orderId: string) => `/escrow/${orderId}`,
  ESCROW_CONFIRM_RECEIPT: (orderId: string) => `/escrow/${orderId}/confirm`,
  ESCROW_DISPUTE: (orderId: string) => `/escrow/${orderId}/dispute`,

  // Payments
  PAYMENTS: "/payments",
  PAYMENT_STATUS: (id: string) => `/payments/${id}/status`,

  // Shipments
  SHIPMENTS: "/shipments",
  SHIPPING_COST: "/shipments/cost",
  SHIPMENT_TRACK: (id: string) => `/shipments/${id}/track`,

  // Chat
  CONVERSATIONS: "/conversations",
  MESSAGES: (conversationId: string) =>
    `/conversations/${conversationId}/messages`,

  // Reviews
  REVIEWS: "/reviews",
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
