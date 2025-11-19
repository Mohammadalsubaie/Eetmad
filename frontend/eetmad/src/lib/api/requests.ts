import type { QueryParams } from '@/lib/types/common.types';
import type { CreateRequestInput, Request } from '@/lib/types/request.types';
import { mockRequests } from '@/mocks/data/requests';
import apiClient from './client';

const USE_MOCKS = process.env.NEXT_PUBLIC_USE_MOCKS === 'true';

export const requestsApi = {
  getAll: async (params?: QueryParams): Promise<Request[]> => {
    try {
      const { data } = await apiClient.get('/v1/requests', { params });
      return data;
    } catch (error) {
      if (USE_MOCKS || process.env.NODE_ENV === 'development') {
        console.warn('Using mock requests data');
        return mockRequests;
      }
      throw error;
    }
  },

  getById: async (id: string): Promise<Request> => {
    try {
      const { data } = await apiClient.get(`/v1/requests/${id}`);
      return data;
    } catch (error) {
      if (USE_MOCKS || process.env.NODE_ENV === 'development') {
        console.warn('Using mock request data');
        const request = mockRequests.find((req) => req.id === id);
        if (!request) {
          throw new Error('Request not found');
        }
        return request;
      }
      throw error;
    }
  },

  create: async (requestData: CreateRequestInput): Promise<Request> => {
    try {
      const { data: response } = await apiClient.post<Request>('/v1/requests', requestData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  update: async (id: string, requestData: Partial<CreateRequestInput>): Promise<Request> => {
    const { data } = await apiClient.put(`/v1/requests/${id}`, requestData);
    return data;
  },

  publish: async (id: string): Promise<Request> => {
    const { data } = await apiClient.patch(`/v1/requests/${id}/publish`);
    return data;
  },

  close: async (id: string): Promise<Request> => {
    const { data } = await apiClient.patch(`/v1/requests/${id}/close`);
    return data;
  },

  cancel: async (id: string): Promise<Request> => {
    const { data } = await apiClient.patch(`/v1/requests/${id}/cancel`);
    return data;
  },

  getMyRequests: async (params?: QueryParams): Promise<Request[]> => {
    try {
      const { data } = await apiClient.get('/v1/requests/me', { params });
      return data;
    } catch (error) {
      if (USE_MOCKS || process.env.NODE_ENV === 'development') {
        console.warn('Using mock requests data');
        return mockRequests;
      }
      throw error;
    }
  },
};
