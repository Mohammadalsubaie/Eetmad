import type { QueryParams } from '@/lib/types/common.types';
import type { CreateRequestInput, Request, UpdateRequestInput } from '@/lib/types/request.types';
import { mockRequests } from '@/mocks/data/requests';
import { USE_MOCKS } from './_mockHelper';
import apiClient from './client';

export const requestsApi = {
  // Request Management
  getAll: async (params?: QueryParams): Promise<Request[]> => {
    if (USE_MOCKS) {
      console.log('📦 Using mock requests data');
      return mockRequests;
    }
    try {
      const { data } = await apiClient.get<Request[]>('/v1/requests', { params });
      return data;
    } catch (error) {
      console.warn('API call failed, using mock data:', error);
      return mockRequests;
    }
  },

  getById: async (id: string): Promise<Request> => {
    if (USE_MOCKS) {
      console.log('📦 Using mock request data');
      const request = mockRequests.find((req) => req.id === id);
      if (!request) {
        throw new Error('Request not found');
      }
      return request;
    }
    try {
      const { data } = await apiClient.get<Request>(`/v1/requests/${id}`);
      return data;
    } catch (error) {
      console.warn('API call failed, using mock data:', error);
      const request = mockRequests.find((req) => req.id === id);
      if (!request) {
        throw new Error('Request not found');
      }
      return request;
    }
  },

  create: async (requestData: CreateRequestInput): Promise<Request> => {
    const formData = new FormData();
    Object.entries(requestData).forEach(([key, value]) => {
      if (key === 'attachments' && Array.isArray(value)) {
        value.forEach((file) => {
          formData.append('attachments', file);
        });
      } else if (value !== null && value !== undefined) {
        if (typeof value === 'object' && !(value instanceof File)) {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, String(value));
        }
      }
    });

    const { data } = await apiClient.post<Request>('/v1/requests', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  },

  update: async (id: string, requestData: UpdateRequestInput): Promise<Request> => {
    const formData = new FormData();
    Object.entries(requestData).forEach(([key, value]) => {
      if (key === 'attachments' && Array.isArray(value)) {
        value.forEach((file) => {
          formData.append('attachments', file);
        });
      } else if (value !== null && value !== undefined) {
        if (typeof value === 'object' && !(value instanceof File)) {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, String(value));
        }
      }
    });

    const { data } = await apiClient.put<Request>(`/v1/requests/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/v1/requests/${id}`);
  },

  publish: async (id: string): Promise<Request> => {
    const { data } = await apiClient.patch<Request>(`/v1/requests/${id}/publish`);
    return data;
  },

  close: async (id: string): Promise<Request> => {
    const { data } = await apiClient.patch<Request>(`/v1/requests/${id}/close`);
    return data;
  },

  cancel: async (id: string): Promise<Request> => {
    const { data } = await apiClient.patch<Request>(`/v1/requests/${id}/cancel`);
    return data;
  },

  extendDeadline: async (id: string, newDeadline: string): Promise<Request> => {
    const { data } = await apiClient.patch<Request>(`/v1/requests/${id}/extend-deadline`, {
      deadline: newDeadline,
    });
    return data;
  },

  // Attachments
  addAttachment: async (id: string, file: File): Promise<{ id: string; filePath: string }> => {
    const formData = new FormData();
    formData.append('file', file);
    const { data } = await apiClient.post(`/v1/requests/${id}/attachments`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  },

  deleteAttachment: async (id: string, attachmentId: string): Promise<void> => {
    await apiClient.delete(`/v1/requests/${id}/attachments/${attachmentId}`);
  },

  // Offer Selection
  selectOffer: async (id: string, offerId: string): Promise<Request> => {
    const { data } = await apiClient.post<Request>(`/v1/requests/${id}/select-offer`, { offerId });
    return data;
  },

  unselectOffer: async (id: string): Promise<Request> => {
    const { data } = await apiClient.delete<Request>(`/v1/requests/${id}/unselect-offer`);
    return data;
  },

  // Public Search & Browse
  getActive: async (params?: QueryParams): Promise<Request[]> => {
    const { data } = await apiClient.get<Request[]>('/v1/requests/active', { params });
    return data;
  },

  getByCategory: async (categoryId: string, params?: QueryParams): Promise<Request[]> => {
    const { data } = await apiClient.get<Request[]>(`/v1/requests/category/${categoryId}`, {
      params,
    });
    return data;
  },

  getOffers: async (id: string, params?: QueryParams) => {
    const { data } = await apiClient.get(`/v1/requests/${id}/offers`, { params });
    return data;
  },

  incrementViews: async (id: string): Promise<void> => {
    await apiClient.patch(`/v1/requests/${id}/increment-views`);
  },

  // My Requests
  getMyRequests: async (params?: QueryParams): Promise<Request[]> => {
    if (USE_MOCKS) {
      console.log('📦 Using mock requests data');
      return mockRequests;
    }
    try {
      const { data } = await apiClient.get<Request[]>('/v1/requests/me', { params });
      return data;
    } catch (error) {
      console.warn('API call failed, using mock data:', error);
      return mockRequests;
    }
  },

  getMyStatistics: async () => {
    const { data } = await apiClient.get('/v1/requests/me/statistics');
    return data;
  },
};
