import apiClient from './client';
import type { QueryParams } from '@/lib/types/common.types';
import type { Review } from '@/lib/types/review.types';

export interface CreateReviewInput {
  projectId: string;
  reviewedId: string;
  rating: number;
  reviewType: 'client_to_supplier' | 'supplier_to_client';
  title: string;
  comment: string;
  qualityRating?: number;
  communicationRating?: number;
  timelinessRating?: number;
  professionalismRating?: number;
}

export interface UpdateReviewInput {
  rating?: number;
  title?: string;
  comment?: string;
  qualityRating?: number;
  communicationRating?: number;
  timelinessRating?: number;
  professionalismRating?: number;
  response?: string;
}

export const reviewsApi = {
  getAll: async (params?: QueryParams) => {
    const { data } = await apiClient.get('/reviews', { params });
    return data;
  },

  getById: async (id: string) => {
    const { data } = await apiClient.get<Review>(`/reviews/${id}`);
    return data;
  },

  create: async (reviewData: CreateReviewInput) => {
    const { data: response } = await apiClient.post<Review>('/reviews', reviewData);
    return response;
  },

  update: async (id: string, reviewData: UpdateReviewInput) => {
    const { data: response } = await apiClient.put<Review>(`/reviews/${id}`, reviewData);
    return response;
  },
};
