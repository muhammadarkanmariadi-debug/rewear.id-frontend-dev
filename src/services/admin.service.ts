/* eslint-disable @typescript-eslint/no-explicit-any */
import { httpGet, httpPost, httpDelete } from "@/lib/http-client";
import { encryptClientPayload } from "@/lib/auth-token";
import { API_ENDPOINTS } from "@/configs/api";

export const adminService = {
  // Users
  async getUsers(params?: Record<string, string | number>) {
    return httpGet(API_ENDPOINTS.ADMIN_USERS, "token", undefined, params as any);
  },
  async banUser(id: string) {
    return httpPost(API_ENDPOINTS.ADMIN_USER_BAN(id), "{}", "token");
  },
  async unbanUser(id: string) {
    return httpPost(API_ENDPOINTS.ADMIN_USER_UNBAN(id), "{}", "token");
  },

  // Products
  async getProducts(params?: Record<string, string | number>) {
    return httpGet(API_ENDPOINTS.ADMIN_PRODUCTS, "token", undefined, params as any);
  },
  async deleteProduct(id: string, p0: string) {
    return httpDelete(API_ENDPOINTS.ADMIN_PRODUCT_DELETE(id), "token");
  },

  // Disputes
  async getDisputes(params?: Record<string, string | number>) {
    return httpGet(API_ENDPOINTS.ADMIN_DISPUTES, "token", undefined, params as any);
  },
  async getDisputeDetail(id: string) {
    return httpGet(API_ENDPOINTS.ADMIN_DISPUTE_DETAIL(id), "token");
  },
  async resolveDispute(id: string, resolution_type: "refund" | "release", admin_notes: string) {
    const payload = await encryptClientPayload(JSON.stringify({ resolution_type, admin_notes }));
    return httpPost(API_ENDPOINTS.ADMIN_DISPUTE_RESOLVE(id), payload, "token");
  },

  // Withdrawals
  async getWithdrawals(params?: Record<string, string | number>) {
    return httpGet(API_ENDPOINTS.ADMIN_WITHDRAWALS, "token", undefined, params as any);
  },
  async approveWithdrawal(id: string) {
    return httpPost(API_ENDPOINTS.ADMIN_WITHDRAWAL_APPROVE(id), "{}", "token");
  },
  async rejectWithdrawal(id: string, rejection_reason: string) {
    const payload = await encryptClientPayload(JSON.stringify({ rejection_reason }));
    return httpPost(API_ENDPOINTS.ADMIN_WITHDRAWAL_REJECT(id), payload, "token");
  },

  // Seller Verifications
  async getSellerVerifications(params?: Record<string, string | number>) {
    return httpGet(API_ENDPOINTS.ADMIN_SELLER_VERIFICATIONS, "token", undefined, params as any);
  },
  async verifySeller(id: string) {
    return httpPost(API_ENDPOINTS.ADMIN_SELLER_VERIFY(id), "{}", "token");
  },

  // Reports
  async getReportsTransactions(params?: Record<string, string | number>) {
    return httpGet(API_ENDPOINTS.ADMIN_REPORTS_TRANSACTIONS, "token", undefined, params as any);
  },
  async getReportsOverview(params?: Record<string, string | number>) {
    return httpGet(API_ENDPOINTS.ADMIN_REPORTS_OVERVIEW, "token", undefined, params as any);
  },
};
