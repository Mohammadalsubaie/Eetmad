import apiClient from './client';
import type { QueryParams } from '@/lib/types/common.types';
import type { CreateOfferInput, Offer } from '@/lib/types/offer.types';

export const offersApi = {
  getAll: async (params?: QueryParams) => {
    const { data } = await apiClient.get('/offers', { params });
    return data;
  },

  getById: async (id: string) => {
    const { data } = await apiClient.get<Offer>(`/offers/${id}`);
    return data;
  },

  create: async (offerData: CreateOfferInput) => {
    const { data: response } = await apiClient.post<Offer>('/offers', offerData);
    return response;
  },
};
