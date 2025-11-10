import apiClient from './client';
import type { QueryParams } from '@/lib/types/common.types';

export const suppliersApi = {
  getAll: async (params?: QueryParams) => {
    const { data } = await apiClient.get('/suppliers', { params });
    return data;
  },

  getById: async (id: string) => {
    const { data } = await apiClient.get(`/suppliers/${id}`);
    return data;
  },
};
