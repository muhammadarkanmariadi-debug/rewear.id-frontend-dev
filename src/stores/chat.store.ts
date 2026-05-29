import { create } from "zustand";

interface ChatState {
  activeChatId: string | null;
  unreadTotal: number;

  setActiveChat: (chatId: string | null) => void;
  setUnreadTotal: (count: number) => void;
  incrementUnread: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  activeChatId: null,
  unreadTotal: 0,

  setActiveChat: (chatId) => set({ activeChatId: chatId }),
  setUnreadTotal: (count) => set({ unreadTotal: count }),
  incrementUnread: () =>
    set((state) => ({ unreadTotal: state.unreadTotal + 1 })),
}));
