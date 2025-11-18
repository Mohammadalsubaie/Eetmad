import type { QueryParams } from '@/lib/types/common.types';
import type { CreateOfferInput, Offer } from '@/lib/types/offer.types';
import { mockOffers } from '@/mocks/data/offers';
import apiClient from './client';

const USE_MOCKS = process.env.NEXT_PUBLIC_USE_MOCKS === 'true';

export const offersApi = {
  getAll: async (params?: QueryParams): Promise<Offer[]> => {
    try {
      const { data } = await apiClient.get('/v1/offers', { params });
      return data;
    } catch (error) {
      if (USE_MOCKS || process.env.NODE_ENV === 'development') {
        console.warn('Using mock offers data');
        return mockOffers;
      }
      throw error;
    }
  },

  getById: async (id: string): Promise<Offer> => {
    try {
      const { data } = await apiClient.get<Offer>(`/v1/offers/${id}`);
      return data;
    } catch (error) {
      if (USE_MOCKS || process.env.NODE_ENV === 'development') {
        console.warn('Using mock offer data');
        const offer = mockOffers.find((off) => off.id === id);
        if (!offer) {
          throw new Error('Offer not found');
        }
        return offer;
      }
      throw error;
    }
  },

  getByRequestId: async (requestId: string): Promise<Offer[]> => {
    try {
      const { data } = await apiClient.get(`/v1/offers/request/${requestId}`);
      return data;
    } catch (error) {
      if (USE_MOCKS || process.env.NODE_ENV === 'development') {
        console.warn('Using mock offers data');
        return mockOffers.filter((offer) => offer.requestId === requestId);
      }
      throw error;
    }
  },

  create: async (offerData: CreateOfferInput): Promise<Offer> => {
    try {
      const { data: response } = await apiClient.post<Offer>('/v1/offers', offerData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  accept: async (id: string): Promise<Offer> => {
    const { data } = await apiClient.patch(`/v1/offers/${id}/accept`);
    return data;
  },

  reject: async (id: string): Promise<Offer> => {
    const { data } = await apiClient.patch(`/v1/offers/${id}/reject`);
    return data;
  },

  getMyOffers: async (params?: QueryParams): Promise<Offer[]> => {
    try {
      const { data } = await apiClient.get('/v1/offers/me', { params });
      return data;
    } catch (error) {
      if (USE_MOCKS || process.env.NODE_ENV === 'development') {
        console.warn('Using mock offers data');
        return mockOffers;
      }
      throw error;
    }
  },

  update: async (id: string, offerData: Partial<CreateOfferInput>): Promise<Offer> => {
    const { data } = await apiClient.put(`/v1/offers/${id}`, offerData);
    return data;
  },

  withdraw: async (id: string): Promise<Offer> => {
    const { data } = await apiClient.patch(`/v1/offers/${id}/withdraw`);
    return data;
  },
};
