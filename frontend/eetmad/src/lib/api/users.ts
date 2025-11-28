import apiClient from './client';
import type {
  UpdateUserProfileData,
  User,
  UserAddress,
  NotificationPreferences,
} from '@/lib/types/user.types';
import { mockUser } from '@/mocks/data/users';
import { USE_MOCKS } from './_mockHelper';

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

export interface UserStatistics {
  totalProjects: number;
  completedProjects: number;
  activeProjects: number;
  cancelledProjects: number;
  totalSpent?: number;
  totalEarned?: number;
  averageRating: number;
  totalReviews: number;
}

export const usersApi = {
  // Profile Management
  getProfile: async (): Promise<User> => {
    if (USE_MOCKS) {
      console.log('📦 Using mock user profile data');
      // Return a copy to avoid mutations
      return { ...mockUser };
    }
    try {
      const { data } = await apiClient.get<User>('/v1/users/me');
      return data;
    } catch (error) {
      console.warn('API call failed, using mock data:', error);
      // Return a copy to avoid mutations
      return { ...mockUser };
    }
  },

  updateProfile: async (profileData: UpdateUserProfileData): Promise<User> => {
    const { data } = await apiClient.put<User>('/v1/users/me', profileData);
    return data;
  },

  deleteAccount: async (): Promise<void> => {
    await apiClient.delete('/v1/users/me');
  },

  deactivateAccount: async (): Promise<User> => {
    const { data } = await apiClient.patch<User>('/v1/users/me/deactivate');
    return data;
  },

  reactivateAccount: async (): Promise<User> => {
    const { data } = await apiClient.patch<User>('/v1/users/me/reactivate');
    return data;
  },

  // Avatar
  uploadAvatar: async (file: File): Promise<{ avatar: string }> => {
    const formData = new FormData();
    formData.append('avatar', file);
    const { data } = await apiClient.post('/v1/users/me/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  },

  deleteAvatar: async (): Promise<void> => {
    await apiClient.delete('/v1/users/me/avatar');
  },

  // Address & Preferences
  updateAddress: async (address: Partial<UserAddress>): Promise<User> => {
    const { data } = await apiClient.put<User>('/v1/users/me/address', address);
    return data;
  },

  updateNotificationPreferences: async (
    preferences: Partial<NotificationPreferences>
  ): Promise<User> => {
    const { data } = await apiClient.put<User>(
      '/v1/users/me/notification-preferences',
      preferences
    );
    return data;
  },

  // Password
  changePassword: async (passwordData: ChangePasswordData): Promise<void> => {
    await apiClient.put('/v1/users/me/password', passwordData);
  },

  // Statistics & Info
  getStatistics: async (): Promise<UserStatistics> => {
    const { data } = await apiClient.get<UserStatistics>('/v1/users/me/statistics');
    return data;
  },

  getWalletBalance: async (): Promise<{ balance: number }> => {
    const { data } = await apiClient.get<{ balance: number }>('/v1/users/me/wallet/balance');
    return data;
  },

  // Public Profile
  getUser: async (id: string): Promise<User> => {
    const { data } = await apiClient.get<User>(`/v1/users/${id}`);
    return data;
  },

  getPublicProfile: async (id: string): Promise<Partial<User>> => {
    const { data } = await apiClient.get<Partial<User>>(`/v1/users/${id}/public-profile`);
    return data;
  },

  // Admin Only
  getAllUsers: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<User[]> => {
    const { data } = await apiClient.get<User[]>('/v1/users', { params });
    return data;
  },

  getUserFull: async (id: string): Promise<User> => {
    const { data } = await apiClient.get<User>(`/v1/users/${id}/full`);
    return data;
  },

  suspendUser: async (id: string): Promise<User> => {
    const { data } = await apiClient.patch<User>(`/v1/users/${id}/suspend`);
    return data;
  },

  unsuspendUser: async (id: string): Promise<User> => {
    const { data } = await apiClient.patch<User>(`/v1/users/${id}/unsuspend`);
    return data;
  },

  banUser: async (id: string): Promise<User> => {
    const { data } = await apiClient.patch<User>(`/v1/users/${id}/ban`);
    return data;
  },

  unbanUser: async (id: string): Promise<User> => {
    const { data } = await apiClient.patch<User>(`/v1/users/${id}/unban`);
    return data;
  },
};
