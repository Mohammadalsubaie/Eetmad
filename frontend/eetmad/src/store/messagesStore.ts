import { create } from 'zustand';

interface MessagesState {
  unreadCount: number;
  setUnreadCount: (count: number) => void;
}

export const useMessagesStore = create<MessagesState>((set) => ({
  unreadCount: 0,
  setUnreadCount: (count) => set({ unreadCount: count }),
}));
