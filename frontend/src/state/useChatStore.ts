import { Message } from "./../../../backend/src/domain/entity/Message";
import { create } from "zustand";
import axiosInstance from "../services/api";

interface Chat {
  id: number;
  name: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface ChatState {
  chats: Chat[];
  messages: Message[];
  loading: boolean;
  error: string | null;
  fetchChatsByUserId: (userId: number) => Promise<void>;
  fetchMessagesByChatId: (chatId: number) => Promise<void>;
}

export const useChatStore = create<ChatState>((set) => ({
  chats: [],
  loading: false,
  error: null,
  messages: [],

  // Method to fetch chats by user ID
  fetchChatsByUserId: async (userId: number) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get(`/chats/getMyChats/${userId}`);
      const chats = response.data.chats;
      set({ chats, loading: false });
    } catch (error) {
      set({ error: "Error fetching chats", loading: false });
    }
  },
  fetchMessagesByChatId: async (chatId: number) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get(
        `/chats/getAllMessages/${chatId}`
      );
      const dataMsgs = response.data.messages;
      set({ messages: dataMsgs, loading: false });
    } catch (error) {
      set({ error: "Error fetching messages", loading: false });
    }
  },
}));
