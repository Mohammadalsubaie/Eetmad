import type { QueryParams } from '@/lib/types/common.types';
import type {
  CreateReviewInput,
  Review,
  ReviewStats,
  UpdateReviewInput,
} from '@/lib/types/review.types';
import { mockReviews } from '@/mocks/data/reviews';
import apiClient from './client';

const USE_MOCKS =
  process.env.NEXT_PUBLIC_USE_MOCKS === 'true' || process.env.NODE_ENV === 'development';

export const reviewsApi = {
  // Get all reviews
  getAll: async (params?: QueryParams): Promise<Review[]> => {
    if (USE_MOCKS) {
      console.log('📦 Using mock reviews data');
      // Return a copy to avoid mutations
      return mockReviews.map((r) => ({ ...r }));
    }
    try {
      const { data } = await apiClient.get('/v1/reviews', { params });
      return data;
    } catch (error) {
      console.warn('API call failed, using mock data:', error);
      // Return a copy to avoid mutations
      return mockReviews.map((r) => ({ ...r }));
    }
  },

  // Get review by ID
  getById: async (id: string): Promise<Review> => {
    if (USE_MOCKS) {
      console.log('📦 Using mock review data');
      // Try to find by exact ID
      let review = mockReviews.find((r) => r.id === id);
      // If not found, try to find by partial match (e.g., "1" matches "review-1")
      if (!review) {
        review = mockReviews.find((r) => r.id.includes(id) || id.includes(r.id));
      }
      // If still not found, return first review as fallback
      if (!review) {
        console.warn(`Review with ID "${id}" not found, using first review as fallback`);
        review = mockReviews[0];
      }
      return { ...review };
    }
    try {
      const { data } = await apiClient.get<Review>(`/v1/reviews/${id}`);
      return data;
    } catch (error) {
      console.warn('API call failed, using mock data:', error);
      // Try to find by exact ID
      let review = mockReviews.find((r) => r.id === id);
      // If not found, try to find by partial match
      if (!review) {
        review = mockReviews.find((r) => r.id.includes(id) || id.includes(r.id));
      }
      // If still not found, return first review as fallback
      if (!review) {
        review = mockReviews[0];
      }
      return { ...review };
    }
  },

  // Create review
  create: async (reviewData: CreateReviewInput): Promise<Review> => {
    const { data } = await apiClient.post<Review>('/v1/reviews', reviewData);
    return data;
  },

  // Update review
  update: async (id: string, reviewData: UpdateReviewInput): Promise<Review> => {
    const { data } = await apiClient.put<Review>(`/v1/reviews/${id}`, reviewData);
    return data;
  },

  // Delete review
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/v1/reviews/${id}`);
  },

  // Respond to review
  respond: async (id: string, response: string): Promise<Review> => {
    const { data } = await apiClient.post<Review>(`/v1/reviews/${id}/respond`, { response });
    return data;
  },

  // Mark as helpful
  markHelpful: async (id: string): Promise<Review> => {
    const { data } = await apiClient.patch<Review>(`/v1/reviews/${id}/helpful`);
    return data;
  },

  // Mark as not helpful
  markNotHelpful: async (id: string): Promise<Review> => {
    const { data } = await apiClient.patch<Review>(`/v1/reviews/${id}/not-helpful`);
    return data;
  },

  // Report review
  report: async (id: string, reason: string): Promise<void> => {
    await apiClient.post(`/v1/reviews/${id}/report`, { reason });
  },

  // Admin: Verify review
  verify: async (id: string): Promise<Review> => {
    const { data } = await apiClient.patch<Review>(`/v1/reviews/${id}/verify`);
    return data;
  },

  // Admin: Hide review
  hide: async (id: string): Promise<Review> => {
    const { data } = await apiClient.patch<Review>(`/v1/reviews/${id}/hide`);
    return data;
  },

  // Query
  getByProject: async (projectId: string, params?: QueryParams): Promise<Review[]> => {
    const { data } = await apiClient.get(`/v1/reviews/project/${projectId}`, { params });
    return data;
  },

  getByUser: async (userId: string, params?: QueryParams): Promise<Review[]> => {
    const { data } = await apiClient.get(`/v1/reviews/user/${userId}`, { params });
    return data;
  },

  getBySupplier: async (supplierId: string, params?: QueryParams): Promise<Review[]> => {
    if (USE_MOCKS) {
      console.log('📦 Using mock reviews by supplier data');
      // Filter reviews by supplier ID (supplier-1, supplier-2, supplier-3, or 1, 2, 3)
      const supplierReviews = mockReviews.filter(
        (r) =>
          r.reviewedId === supplierId ||
          r.reviewedId === `supplier-${supplierId}` ||
          r.reviewerId === supplierId ||
          r.reviewerId === `supplier-${supplierId}`
      );
      return supplierReviews.length > 0 ? supplierReviews : mockReviews.slice(0, 3); // Return default reviews if no match
    }
    try {
      const { data } = await apiClient.get(`/v1/reviews/supplier/${supplierId}`, { params });
      return data;
    } catch (error) {
      console.warn('API call failed, using mock data:', error);
      return mockReviews.filter(
        (r) => r.reviewedId === supplierId || r.reviewedId === `supplier-${supplierId}`
      );
    }
  },

  getSupplierAverage: async (supplierId: string): Promise<{ average: number }> => {
    if (USE_MOCKS) {
      console.log('📦 Using mock supplier average data');
      const supplierReviews = mockReviews.filter(
        (r) => r.reviewedId === supplierId || r.reviewedId === `supplier-${supplierId}`
      );
      if (supplierReviews.length === 0) {
        return { average: 4.7 };
      }
      const avg = supplierReviews.reduce((sum, r) => sum + r.rating, 0) / supplierReviews.length;
      return { average: Math.round(avg * 10) / 10 };
    }
    try {
      const { data } = await apiClient.get<{ average: number }>(
        `/v1/reviews/supplier/${supplierId}/average`
      );
      return data;
    } catch (error) {
      console.warn('API call failed, using mock data:', error);
      return { average: 4.7 };
    }
  },

  getSupplierStatistics: async (supplierId: string): Promise<ReviewStats> => {
    if (USE_MOCKS) {
      console.log('📦 Using mock supplier statistics data');
      const supplierReviews = mockReviews.filter(
        (r) => r.reviewedId === supplierId || r.reviewedId === `supplier-${supplierId}`
      );
      const reviews = supplierReviews.length > 0 ? supplierReviews : mockReviews;
      const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
      const stats: ReviewStats = {
        averageRating: Math.round(avg * 10) / 10,
        totalReviews: reviews.length,
        ratingDistribution: {
          five: reviews.filter((r) => r.rating === 5).length,
          four: reviews.filter((r) => r.rating === 4).length,
          three: reviews.filter((r) => r.rating === 3).length,
          two: reviews.filter((r) => r.rating === 2).length,
          one: reviews.filter((r) => r.rating === 1).length,
        },
        averageQualityRating:
          reviews.reduce((sum, r) => sum + (r.qualityRating || 0), 0) / reviews.length,
        averageCommunicationRating:
          reviews.reduce((sum, r) => sum + (r.communicationRating || 0), 0) / reviews.length,
        averageTimelinessRating:
          reviews.reduce((sum, r) => sum + (r.timelinessRating || 0), 0) / reviews.length,
        averageProfessionalismRating:
          reviews.reduce((sum, r) => sum + (r.professionalismRating || 0), 0) / reviews.length,
      };
      return stats;
    }
    try {
      const { data } = await apiClient.get<ReviewStats>(
        `/v1/reviews/supplier/${supplierId}/statistics`
      );
      return data;
    } catch (error) {
      console.warn('API call failed, using mock data:', error);
      return {
        averageRating: 4.7,
        totalReviews: 25,
        ratingDistribution: { five: 15, four: 7, three: 2, two: 1, one: 0 },
        averageQualityRating: 4.6,
        averageCommunicationRating: 4.8,
        averageTimelinessRating: 4.5,
        averageProfessionalismRating: 4.7,
      };
    }
  },

  getTopRated: async (params?: QueryParams): Promise<Review[]> => {
    const { data } = await apiClient.get('/v1/reviews/top-rated', { params });
    return data;
  },
};
