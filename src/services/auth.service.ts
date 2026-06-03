import { httpPost, httpGet, httpLogin } from "@/lib/http-client";
import { encryptClientPayload } from "@/lib/auth-token";
import { API_ENDPOINTS } from "@/configs/api";
import { clearAuthCookies } from "@/lib/cookies";

export const authService = {
  async login(email: string, password: string) {
    const payload = await encryptClientPayload(JSON.stringify({ email, password }));
    return httpLogin(API_ENDPOINTS.AUTH_LOGIN, payload);
  },
  async register(name: string, email: string, password: string, password_confirmation: string) {
    const payload = await encryptClientPayload(JSON.stringify({ name, email, password, password_confirmation }));
    return httpPost(API_ENDPOINTS.AUTH_REGISTER, payload);
  },
  async logout() {
    const res = await httpPost(API_ENDPOINTS.AUTH_LOGOUT, "{}", "token");
    await clearAuthCookies();
    return res;
  },
  async getMe() {
    return httpGet(API_ENDPOINTS.AUTH_ME, "token");
  },
  async googleOAuth(token: string) {
    const payload = await encryptClientPayload(JSON.stringify({ token }));
    return httpPost(API_ENDPOINTS.AUTH_GOOGLE, payload);
  },
  async forgotPassword(email: string) {
    const payload = await encryptClientPayload(JSON.stringify({ email }));
    return httpPost(API_ENDPOINTS.AUTH_FORGOT_PASSWORD, payload);
  },
  async resetPassword(data: Record<string, unknown>) {
    const payload = await encryptClientPayload(JSON.stringify(data));
    return httpPost(API_ENDPOINTS.AUTH_RESET_PASSWORD, payload);
  },
  async verifyEmail(id: string, hash: string, expires: string, signature: string) {
    return httpGet(API_ENDPOINTS.AUTH_VERIFY_EMAIL(id, hash, expires, signature));
  },
  async resendVerification() {
    return httpPost(API_ENDPOINTS.AUTH_RESEND_VERIFICATION, "{}", "token");
  },
};
