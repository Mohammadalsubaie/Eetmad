import type { QueryParams } from '@/lib/types/common.types';
import type { CreateRequestInput, Request } from '@/lib/types/request.types';
import apiClient from './client';

export const requestsApi = {
  getAll: async (params?: QueryParams) => {
    const { data } = await apiClient.get('/requests', { params });
    return data;
  },

  getById: async (id: string) => {
    const { data } = await apiClient.get(`/requests/${id}`);
    return data;
  },

  create: async (requestData: CreateRequestInput) => {
    const { data: response } = await apiClient.post<Request>('/requests', requestData);
    return response;
  },
};
