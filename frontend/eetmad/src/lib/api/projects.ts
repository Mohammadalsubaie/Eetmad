import apiClient from './client';
import type { QueryParams } from '@/lib/types/common.types';

export const projectsApi = {
  getAll: async (params?: QueryParams) => {
    const { data } = await apiClient.get('/projects', { params });
    return data;
  },

  getById: async (id: string) => {
    const { data } = await apiClient.get(`/projects/${id}`);
    return data;
  },
};
