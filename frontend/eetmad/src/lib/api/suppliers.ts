import type { QueryParams } from '@/lib/types/common.types';
import type {
  Certification,
  PortfolioItem,
  SupplierProfile,
  WorkingHours,
} from '@/lib/types/supplier.types';
import { mockSuppliers } from '@/mocks/data/suppliers';
import apiClient from './client';
import { USE_MOCKS } from './_mockHelper';

// Re-export types for convenience
export type {
  Certification,
  PortfolioItem,
  SupplierProfile,
  WorkingHours,
} from '@/lib/types/supplier.types';

export interface CreateSupplierProfileData {
  serviceDescription: string;
  categories?: Array<{ categoryId: string; isPrimary: boolean }>;
  workingHours?: WorkingHours;
}

export interface UpdateSupplierProfileData {
  serviceDescription?: string;
  responseTime?: number;
  acceptanceRate?: number;
  onTimeDelivery?: number;
  workingHours?: WorkingHours;
  categories?: Array<{ categoryId: string; isPrimary: boolean }>;
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

export interface CertificationData {
  name: string;
  issuer: string;
  issuedAt: string;
  expiryDate: string | null;
  fileUrl: string;
  certificateNumber?: string;
}

export const suppliersApi = {
  // Supplier Management
  createProfile: async (profileData: CreateSupplierProfileData): Promise<SupplierProfile> => {
    const { data } = await apiClient.post<SupplierProfile>('/v1/suppliers/profile', profileData);
    return data;
  },

  getMyProfile: async (): Promise<SupplierProfile> => {
    if (USE_MOCKS) {
      console.log('📦 Using mock supplier data');
      return mockSuppliers[0];
    }
    try {
      const { data } = await apiClient.get<SupplierProfile>('/v1/suppliers/me');
      return data;
    } catch (error) {
      console.warn('API call failed, using mock data:', error);
      return mockSuppliers[0];
    }
  },

  updateProfile: async (profileData: UpdateSupplierProfileData): Promise<SupplierProfile> => {
    const { data } = await apiClient.put<SupplierProfile>('/v1/suppliers/me', profileData);
    return data;
  },

  deleteProfile: async (): Promise<void> => {
    await apiClient.delete('/v1/suppliers/me');
  },

  // Portfolio
  addPortfolioItem: async (itemData: PortfolioItemData): Promise<PortfolioItem> => {
    const { data } = await apiClient.post<PortfolioItem>('/v1/suppliers/me/portfolio', itemData);
    return data;
  },

  updatePortfolioItem: async (
    id: string,
    itemData: Partial<PortfolioItemData>
  ): Promise<PortfolioItem> => {
    const { data } = await apiClient.put<PortfolioItem>(
      `/v1/suppliers/me/portfolio/${id}`,
      itemData
    );
    return data;
  },

  deletePortfolioItem: async (id: string): Promise<void> => {
    await apiClient.delete(`/v1/suppliers/me/portfolio/${id}`);
  },

  // Certifications
  addCertification: async (certData: CertificationData): Promise<Certification> => {
    const { data } = await apiClient.post<Certification>(
      '/v1/suppliers/me/certifications',
      certData
    );
    return data;
  },

  deleteCertification: async (id: string): Promise<void> => {
    await apiClient.delete(`/v1/suppliers/me/certifications/${id}`);
  },

  // Working Hours
  updateWorkingHours: async (workingHours: WorkingHours): Promise<SupplierProfile> => {
    const { data } = await apiClient.put<SupplierProfile>(
      '/v1/suppliers/me/working-hours',
      workingHours
    );
    return data;
  },

  // Verification
  requestVerification: async (): Promise<void> => {
    await apiClient.post('/v1/suppliers/me/verification/request');
  },

  cancelVerification: async (): Promise<void> => {
    await apiClient.delete('/v1/suppliers/me/verification/cancel');
  },

  // Statistics
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

  getEarnings: async (
    params?: QueryParams
  ): Promise<{ total: number; byPeriod: Array<{ period: string; amount: number }> }> => {
    const { data } = await apiClient.get('/v1/suppliers/me/earnings', { params });
    return data;
  },

  getPerformance: async (): Promise<{
    responseTime: number;
    acceptanceRate: number;
    onTimeDelivery: number;
  }> => {
    const { data } = await apiClient.get('/v1/suppliers/me/performance');
    return data;
  },

  // Public Search & View
  getAll: async (params?: QueryParams): Promise<SupplierProfile[]> => {
    if (USE_MOCKS) {
      console.log('📦 Using mock suppliers data');
      return mockSuppliers;
    }
    try {
      const { data } = await apiClient.get<SupplierProfile[]>('/v1/suppliers', { params });
      return data;
    } catch (error) {
      console.warn('API call failed, using mock data:', error);
      return mockSuppliers;
    }
  },

  getById: async (id: string): Promise<SupplierProfile> => {
    if (USE_MOCKS) {
      console.log('📦 Using mock supplier data');
      const supplier = mockSuppliers.find((sup) => sup.id === id);
      if (!supplier) {
        throw new Error('Supplier not found');
      }
      return supplier;
    }
    try {
      const { data } = await apiClient.get<SupplierProfile>(`/v1/suppliers/${id}`);
      return data;
    } catch (error) {
      console.warn('API call failed, using mock data:', error);
      const supplier = mockSuppliers.find((sup) => sup.id === id);
      if (!supplier) {
        throw new Error('Supplier not found');
      }
      return supplier;
    }
  },

  getReviews: async (id: string, params?: QueryParams) => {
    const { data } = await apiClient.get(`/v1/suppliers/${id}/reviews`, { params });
    return data;
  },

  getTopRated: async (params?: QueryParams): Promise<SupplierProfile[]> => {
    const { data } = await apiClient.get<SupplierProfile[]>('/v1/suppliers/top-rated', { params });
    return data;
  },

  getByCategory: async (categoryId: string, params?: QueryParams): Promise<SupplierProfile[]> => {
    const { data } = await apiClient.get<SupplierProfile[]>(
      `/v1/suppliers/category/${categoryId}`,
      { params }
    );
    return data;
  },
};
