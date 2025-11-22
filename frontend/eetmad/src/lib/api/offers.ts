import type { QueryParams } from '@/lib/types/common.types';
import type { CreateOfferInput, UpdateOfferInput, Offer } from '@/lib/types/offer.types';
import { mockOffers } from '@/mocks/data/offers';
import apiClient from './client';

const USE_MOCKS = process.env.NEXT_PUBLIC_USE_MOCKS === 'true' || process.env.NODE_ENV === 'development';

export const offersApi = {
  // Offer Management
  getAll: async (params?: QueryParams): Promise<Offer[]> => {
    if (USE_MOCKS) {
      console.log('📦 Using mock offers data');
      return mockOffers;
    }
    try {
      const { data } = await apiClient.get<Offer[]>('/v1/offers', { params });
      return data;
    } catch (error) {
      console.warn('API call failed, using mock data:', error);
      return mockOffers;
    }
  },

  getById: async (id: string): Promise<Offer> => {
    if (USE_MOCKS) {
      console.log('📦 Using mock offer data');
      const offer = mockOffers.find((off) => off.id === id);
      if (!offer) {
        throw new Error('Offer not found');
      }
      return offer;
    }
    try {
      const { data } = await apiClient.get<Offer>(`/v1/offers/${id}`);
      return data;
    } catch (error) {
      console.warn('API call failed, using mock data:', error);
      const offer = mockOffers.find((off) => off.id === id);
      if (!offer) {
        throw new Error('Offer not found');
      }
      return offer;
    }
  },

  create: async (offerData: CreateOfferInput): Promise<Offer> => {
    const formData = new FormData();
    Object.entries(offerData).forEach(([key, value]) => {
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

    const { data } = await apiClient.post<Offer>('/v1/offers', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  },

  update: async (id: string, offerData: UpdateOfferInput): Promise<Offer> => {
    const formData = new FormData();
    Object.entries(offerData).forEach(([key, value]) => {
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

    const { data } = await apiClient.put<Offer>(`/v1/offers/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/v1/offers/${id}`);
  },

  withdraw: async (id: string): Promise<Offer> => {
    const { data } = await apiClient.patch<Offer>(`/v1/offers/${id}/withdraw`);
    return data;
  },

  // Attachments
  addAttachment: async (id: string, file: File): Promise<{ id: string; filePath: string }> => {
    const formData = new FormData();
    formData.append('file', file);
    const { data } = await apiClient.post(`/v1/offers/${id}/attachments`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  },

  deleteAttachment: async (id: string, attachmentId: string): Promise<void> => {
    await apiClient.delete(`/v1/offers/${id}/attachments/${attachmentId}`);
  },

  // Client Actions
  accept: async (id: string): Promise<Offer> => {
    const { data } = await apiClient.patch<Offer>(`/v1/offers/${id}/accept`);
    return data;
  },

  reject: async (id: string): Promise<Offer> => {
    const { data } = await apiClient.patch<Offer>(`/v1/offers/${id}/reject`);
    return data;
  },

  updateClientNotes: async (id: string, notes: string): Promise<Offer> => {
    const { data } = await apiClient.put<Offer>(`/v1/offers/${id}/client-notes`, { notes });
    return data;
  },

  // Admin Actions
  updateAdminNotes: async (id: string, notes: string): Promise<Offer> => {
    const { data } = await apiClient.put<Offer>(`/v1/offers/${id}/admin-notes`, { notes });
    return data;
  },

  flag: async (id: string, reason: string): Promise<void> => {
    await apiClient.patch(`/v1/offers/${id}/flag`, { reason });
  },

  // Query & Compare
  getByRequestId: async (requestId: string, params?: QueryParams): Promise<Offer[]> => {
    try {
      const { data } = await apiClient.get<Offer[]>(`/v1/offers/request/${requestId}`, { params });
      return data;
    } catch (error) {
      if (USE_MOCKS || process.env.NODE_ENV === 'development') {
        console.warn('Using mock offers data');
        return mockOffers.filter((offer) => offer.requestId === requestId);
      }
      throw error;
    }
  },

  compare: async (offerIds: string[]): Promise<Offer[]> => {
    const { data } = await apiClient.post<Offer[]>('/v1/offers/compare', { offerIds });
    return data;
  },

  getStatistics: async (id: string) => {
    const { data } = await apiClient.get(`/v1/offers/${id}/statistics`);
    return data;
  },

  // My Offers
  getMyOffers: async (params?: QueryParams): Promise<Offer[]> => {
    try {
      const { data } = await apiClient.get<Offer[]>('/v1/offers/me', { params });
      return data;
    } catch (error) {
      if (USE_MOCKS || process.env.NODE_ENV === 'development') {
        console.warn('Using mock offers data');
        return mockOffers;
      }
      throw error;
    }
  },
};
