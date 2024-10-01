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
  loading: boolean;
  error: string | null;
  fetchChatsByUserId: (userId: number) => Promise<void>;
}

export const useChatStore = create<ChatState>((set) => ({
  chats: [],
  loading: false,
  error: null,

  // Method to fetch chats by user ID
  fetchChatsByUserId: async (userId: number) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get(
        `/chats/getMyChats/${userId}`
      );
      const chats = response.data.chats;
      set({ chats, loading: false });
    } catch (error) {
      set({ error: "Error fetching chats", loading: false });
    }
  },
}));
