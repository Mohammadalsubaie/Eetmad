import apiClient from './client';
import type { QueryParams } from '@/lib/types/common.types';
import type { SupplierProfile } from '@/lib/types/supplier.types';
import { mockSuppliers } from '@/mocks/data/suppliers';

export interface UpdateSupplierProfileData {
  serviceDescription?: string;
  responseTime?: number;
  acceptanceRate?: number;
  onTimeDelivery?: number;
  workingHours?: SupplierProfile['workingHours'];
  [key: string]: unknown;
}

export interface PortfolioItemData {
  title: string;
  description: string;
  images: string[];
  category: string;
  completedAt: string;
  projectId?: string;
  clientName?: string;
}

const USE_MOCKS = process.env.NEXT_PUBLIC_USE_MOCKS === 'true';

export const suppliersApi = {
  getAll: async (params?: QueryParams) => {
    try {
      const { data } = await apiClient.get('/v1/suppliers', { params });
      return data;
    } catch (error) {
      // Fallback to mock data if API fails or in development
      if (USE_MOCKS || process.env.NODE_ENV === 'development') {
        console.warn('Using mock suppliers data');
        return mockSuppliers;
      }
      throw error;
    }
  },

  getById: async (id: string) => {
    try {
      const { data } = await apiClient.get(`/v1/suppliers/${id}`);
      return data;
    } catch (error) {
      // Fallback to mock data if API fails or in development
      if (USE_MOCKS || process.env.NODE_ENV === 'development') {
        console.warn('Using mock supplier data');
        const supplier = mockSuppliers.find((sup) => sup.id === id);
        if (!supplier) {
          throw new Error('Supplier not found');
        }
        return supplier;
      }
      throw error;
    }
  },

  getMyProfile: async () => {
    try {
      const { data } = await apiClient.get('/v1/suppliers/me');
      return data;
    } catch (error) {
      if (USE_MOCKS || process.env.NODE_ENV === 'development') {
        console.warn('Using mock supplier data');
        return mockSuppliers[0];
      }
      throw error;
    }
  },

  updateProfile: async (profileData: UpdateSupplierProfileData) => {
    const { data } = await apiClient.put('/v1/suppliers/me', profileData);
    return data;
  },

  getStatistics: async () => {
    try {
      const { data } = await apiClient.get('/v1/suppliers/me/statistics');
      return data;
    } catch (error) {
      if (USE_MOCKS || process.env.NODE_ENV === 'development') {
        console.warn('Using mock statistics data');
        return {
          totalOffers: 12,
          acceptedOffers: 8,
          totalProjects: 5,
          completedProjects: 3,
          totalEarnings: 450000,
          averageRating: 4.8,
        };
      }
      throw error;
    }
  },

  addPortfolioItem: async (itemData: PortfolioItemData) => {
    const { data } = await apiClient.post('/v1/suppliers/me/portfolio', itemData);
    return data;
  },

  updatePortfolioItem: async (id: string, itemData: Partial<PortfolioItemData>) => {
    const { data } = await apiClient.put(`/v1/suppliers/me/portfolio/${id}`, itemData);
    return data;
  },

  deletePortfolioItem: async (id: string) => {
    const { data } = await apiClient.delete(`/v1/suppliers/me/portfolio/${id}`);
    return data;
  },
};
