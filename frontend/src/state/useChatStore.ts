import { create } from "zustand";
import axiosInstance from "../services/api";

interface Chat {
  id: number;
  name: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id?: number;
  chatId: number;
  userId: number | null;
  content: string;
  sender?: { id: number; name: string };
}

interface ChatState {
  chats: Chat[];
  messages: Message[];
  loading: boolean;
  error: string | null;
  fetchChatsByUserId: (userId: number) => Promise<void>;
  fetchMessagesByChatId: (chatId: number) => Promise<void>;
  saveMessage: (message: Message) => Promise<void>;
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

      console.log(chats);
      
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
  saveMessage: async (message: Message) => {
    set({ loading: true, error: null });
    try {
      const lastMessage = await axiosInstance.post("/chats/saveMessage", message);

      set((state) => ({
        messages: [...state.messages, lastMessage.data.message],
        loading: false
      }));
      
      
      set({ loading: false });
    } catch (error) {
      set({ error: "Error saving message", loading: false });
    }
  },
}));
