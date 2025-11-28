import apiClient from './client';
import type { Notification, NotificationType } from '@/lib/types/notification.types';
import type { QueryParams } from '@/lib/types/common.types';
import { mockNotifications } from '@/mocks/data/notifications';
import { USE_MOCKS } from './_mockHelper';

export const notificationsApi = {
  // Get all notifications
  getAll: async (params?: QueryParams): Promise<Notification[]> => {
    if (USE_MOCKS) {
      console.log('📦 Using mock notifications data');
      return mockNotifications;
    }
    try {
      const { data } = await apiClient.get('/v1/notifications', { params });
      return data;
    } catch (error) {
      console.warn('API call failed, using mock data:', error);
      return mockNotifications;
    }
  },

  // Get notification by ID
  getById: async (id: string): Promise<Notification> => {
    if (USE_MOCKS) {
      console.log('📦 Using mock notification data');
      // Try to find by exact ID
      let notification = mockNotifications.find((n) => n.id === id);
      // If not found, try to find by partial match (e.g., "1" matches "notif-1")
      if (!notification) {
        notification = mockNotifications.find((n) => n.id.includes(id) || id.includes(n.id));
      }
      // If still not found, return first notification as fallback
      if (!notification) {
        console.warn(
          `Notification with ID "${id}" not found, using first notification as fallback`
        );
        notification = mockNotifications[0];
      }
      return { ...notification };
    }
    try {
      const { data } = await apiClient.get(`/v1/notifications/${id}`);
      return data;
    } catch (error) {
      console.warn('API call failed, using mock data:', error);
      // Try to find by exact ID
      let notification = mockNotifications.find((n) => n.id === id);
      // If not found, try to find by partial match
      if (!notification) {
        notification = mockNotifications.find((n) => n.id.includes(id) || id.includes(n.id));
      }
      // If still not found, return first notification as fallback
      if (!notification) {
        notification = mockNotifications[0];
      }
      return { ...notification };
    }
  },

  // Mark as read
  markAsRead: async (id: string): Promise<Notification> => {
    const { data } = await apiClient.patch<Notification>(`/v1/notifications/${id}/read`);
    return data;
  },

  // Mark all as read
  markAllAsRead: async (): Promise<void> => {
    await apiClient.patch('/v1/notifications/read-all');
  },

  // Delete notification
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/v1/notifications/${id}`);
  },

  // Clear all notifications
  clearAll: async (): Promise<void> => {
    await apiClient.delete('/v1/notifications/clear-all');
  },

  // Get unread notifications
  getUnread: async (params?: QueryParams): Promise<Notification[]> => {
    const { data } = await apiClient.get('/v1/notifications/unread', { params });
    return data;
  },

  // Get unread count
  getUnreadCount: async (): Promise<{ count: number }> => {
    const { data } = await apiClient.get<{ count: number }>('/v1/notifications/unread/count');
    return data;
  },

  // Get notifications by type
  getByType: async (type: NotificationType, params?: QueryParams): Promise<Notification[]> => {
    const { data } = await apiClient.get(`/v1/notifications/type/${type}`, { params });
    return data;
  },
};
