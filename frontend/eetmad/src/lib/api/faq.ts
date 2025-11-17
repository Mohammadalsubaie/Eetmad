// frontend/eetmad/src/lib/api/faq.ts
import apiClient from './client';
import type { QueryParams } from '@/lib/types/common.types';
import type { FAQ } from '@/lib/types/content.types';

export const faqApi = {
  getAll: async (params?: QueryParams) => {
    const { data } = await apiClient.get<FAQ[]>('/faqs', { params });
    return data;
  },

  getById: async (id: string) => {
    const { data } = await apiClient.get<FAQ>(`/faqs/${id}`);
    return data;
  },
};
