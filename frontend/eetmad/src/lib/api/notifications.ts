import apiClient from './client';
import type { QueryParams } from '@/lib/types/common.types';

export const notificationsApi = {
  getAll: async (params?: QueryParams) => {
    const { data } = await apiClient.get('/notifications', { params });
    return data;
  },

  markAsRead: async (id: string) => {
    const { data } = await apiClient.patch(`/notifications/${id}/read`);
    return data;
  },

  markAllAsRead: async () => {
    const { data } = await apiClient.patch('/notifications/read-all');
    return data;
  },

  getUnreadCount: async () => {
    const { data } = await apiClient.get('/notifications/unread-count');
    return data;
  },
};
