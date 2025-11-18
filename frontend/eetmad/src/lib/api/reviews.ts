import apiClient from './client';
import type { QueryParams } from '@/lib/types/common.types';
import type { Review } from '@/lib/types/review.types';
import { mockReviews } from '@/mocks/data/reviews';

const USE_MOCKS = process.env.NEXT_PUBLIC_USE_MOCKS === 'true';

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
    try {
      const { data } = await apiClient.get('/reviews', { params });
      return data;
    } catch (error) {
      if (USE_MOCKS || process.env.NODE_ENV === 'development') {
        console.warn('Using mock reviews data');
        return mockReviews;
      }
      throw error;
    }
  },

  getById: async (id: string): Promise<Review> => {
    try {
      const { data } = await apiClient.get<Review>(`/reviews/${id}`);
      return data;
    } catch (error) {
      if (USE_MOCKS || process.env.NODE_ENV === 'development') {
        console.warn('Using mock review data');
        const review = mockReviews.find((r) => r.id === id);
        if (!review) {
          throw new Error('Review not found');
        }
        return review;
      }
      throw error;
    }
  },

  create: async (reviewData: CreateReviewInput) => {
    try {
      const { data: response } = await apiClient.post<Review>('/reviews', reviewData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  update: async (id: string, reviewData: UpdateReviewInput) => {
    try {
      const { data: response } = await apiClient.put<Review>(`/reviews/${id}`, reviewData);
      return response;
    } catch (error) {
      throw error;
    }
  },
};
