import type { Timestamps } from "./common";

export interface Chat extends Timestamps {
  id: string;
  participant_ids: string[];
  participants: {
    id: string;
    name: string;
    username: string;
    avatar_url: string | null;
  }[];
  last_message: Message | null;
  unread_count: number;
}

export interface Message extends Timestamps {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  type: MessageType;
  is_read: boolean;
  read_at: string | null;
}

export type MessageType = "text" | "image" | "product_link";

export interface SendMessageRequest {
  content: string;
  type?: MessageType;
}
