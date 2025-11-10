import apiClient from './client';
import type { UpdateUserProfileData, User } from '@/lib/types/user.types';

export const usersApi = {
  getProfile: async () => {
    const { data } = await apiClient.get<User>('/users/me');
    return data;
  },

  updateProfile: async (profileData: UpdateUserProfileData) => {
    const { data: response } = await apiClient.put<User>('/users/me', profileData);
    return response;
  },
};
