import apiClient from './client';
import type { QueryParams } from '@/lib/types/common.types';

export const adminApi = {
  getUsers: async (params?: QueryParams) => {
    const { data } = await apiClient.get('/admin/users', { params });
    return data;
  },

  getUserById: async (id: string) => {
    const { data } = await apiClient.get(`/admin/users/${id}`);
    return data;
  },

  getVerificationQueue: async () => {
    const { data } = await apiClient.get('/admin/verification');
    return data;
  },

  approveVerification: async (id: string) => {
    const { data } = await apiClient.post(`/admin/verification/${id}/approve`);
    return data;
  },

  getDisputes: async (params?: QueryParams) => {
    const { data } = await apiClient.get('/admin/disputes', { params });
    return data;
  },

  getAnalytics: async () => {
    const { data } = await apiClient.get('/admin/analytics');
    return data;
  },
};
