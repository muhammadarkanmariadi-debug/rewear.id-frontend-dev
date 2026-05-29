import { httpClient } from "./http-client";
import { API_ENDPOINTS } from "@/configs/api";
import type {
  ApiResponse,
  PaginatedResponse,
  Chat,
  Message,
  SendMessageRequest,
} from "@/entities";

export const chatService = {
  async getConversations() {
    const res = await httpClient.get<PaginatedResponse<Chat>>(
      API_ENDPOINTS.CONVERSATIONS,
    );
    return res.data;
  },

  async getMessages(conversationId: string, page?: number) {
    const res = await httpClient.get<PaginatedResponse<Message>>(
      API_ENDPOINTS.MESSAGES(conversationId),
      { params: { page } },
    );
    return res.data;
  },

  async sendMessage(conversationId: string, data: SendMessageRequest) {
    const res = await httpClient.post<ApiResponse<Message>>(
      API_ENDPOINTS.MESSAGES(conversationId),
      data,
    );
    return res.data.data;
  },

  async startConversation(userId: string) {
    const res = await httpClient.post<ApiResponse<Chat>>(
      API_ENDPOINTS.CONVERSATIONS,
      { participant_id: userId },
    );
    return res.data.data;
  },
};
