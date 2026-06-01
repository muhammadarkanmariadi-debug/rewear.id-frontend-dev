import { httpGet, httpPost } from "@/lib/http-client";
import { encryptClientPayload } from "@/lib/auth-token";
import { API_ENDPOINTS } from "@/configs/api";

export const chatService = {
  async getConversations(params?: Record<string, string>) {
    return httpGet(API_ENDPOINTS.CONVERSATIONS, "token", undefined, params);
  },
  async getMessages(conversationId: string, params?: Record<string, string>) {
    return httpGet(API_ENDPOINTS.MESSAGES(conversationId), "token", undefined, params);
  },
  async sendMessage(conversationId: string, data: Record<string, unknown>) {
    const payload = await encryptClientPayload(JSON.stringify(data));
    return httpPost(API_ENDPOINTS.MESSAGES(conversationId), payload, "token");
  },
  async startConversation(participantId: string) {
    const payload = await encryptClientPayload(JSON.stringify({ participant_id: participantId }));
    return httpPost(API_ENDPOINTS.CONVERSATIONS, payload, "token");
  },
};
