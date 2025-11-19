import apiClient from './client';
import type { UpdateUserProfileData, User } from '@/lib/types/user.types';
import { mockUser } from '@/mocks/data/users';

const USE_MOCKS = process.env.NEXT_PUBLIC_USE_MOCKS === 'true';

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

export const usersApi = {
  getProfile: async (): Promise<User> => {
    try {
      const { data } = await apiClient.get<User>('/users/me');
      return data;
    } catch (error) {
      if (USE_MOCKS || process.env.NODE_ENV === 'development') {
        console.warn('Using mock user profile data');
        return mockUser;
      }
      throw error;
    }
  },

  updateProfile: async (profileData: UpdateUserProfileData) => {
    const { data: response } = await apiClient.put<User>('/users/me', profileData);
    return response;
  },

  changePassword: async (passwordData: ChangePasswordData) => {
    const { data } = await apiClient.put('/users/me/password', passwordData);
    return data;
  },
};
