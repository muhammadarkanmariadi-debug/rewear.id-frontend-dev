import { httpClient } from "./http-client";
import { API_ENDPOINTS } from "@/configs/api";
import type { ApiResponse, AuthResponse, LoginRequest, RegisterRequest, User } from "@/entities";

export const authService = {
  async login(data: LoginRequest) {
    const res = await httpClient.post<ApiResponse<AuthResponse>>(
      API_ENDPOINTS.AUTH_LOGIN,
      data,
    );
    return res.data.data;
  },

  async register(data: RegisterRequest) {
    const res = await httpClient.post<ApiResponse<AuthResponse>>(
      API_ENDPOINTS.AUTH_REGISTER,
      data,
    );
    return res.data.data;
  },

  async logout() {
    await httpClient.post(API_ENDPOINTS.AUTH_LOGOUT);
  },

  async getMe() {
    const res = await httpClient.get<ApiResponse<User>>(API_ENDPOINTS.AUTH_ME);
    return res.data.data;
  },

  async googleOAuth(token: string) {
    const res = await httpClient.post<ApiResponse<AuthResponse>>(
      API_ENDPOINTS.AUTH_GOOGLE,
      { token },
    );
    return res.data.data;
  },
};
