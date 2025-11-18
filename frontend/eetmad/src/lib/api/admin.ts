import apiClient from './client';
import type { QueryParams } from '@/lib/types/common.types';
import { mockUsers } from '@/mocks/data/users';
import { mockDisputes } from '@/mocks/data/disputes';
import { mockReports } from '@/mocks/data/reports';
import { mockVerificationDocuments } from '@/mocks/data/verification';
import type { User } from '@/lib/types/user.types';
import type { Dispute } from '@/lib/types/dispute.types';
import type { Report } from '@/lib/types/report.types';
import type { VerificationDocument } from '@/lib/types/verification.types';

const USE_MOCKS = process.env.NEXT_PUBLIC_USE_MOCKS === 'true';

export const adminApi = {
  getUsers: async (params?: QueryParams) => {
    try {
      const { data } = await apiClient.get('/admin/users', { params });
      return data;
    } catch (error) {
      if (USE_MOCKS || process.env.NODE_ENV === 'development') {
        console.warn('Using mock users data');
        return mockUsers;
      }
      throw error;
    }
  },

  getUserById: async (id: string): Promise<User> => {
    try {
      const { data } = await apiClient.get(`/admin/users/${id}`);
      return data;
    } catch (error) {
      if (USE_MOCKS || process.env.NODE_ENV === 'development') {
        console.warn('Using mock user data');
        const user = mockUsers.find((u) => u.id === id);
        if (!user) {
          throw new Error('User not found');
        }
        return user;
      }
      throw error;
    }
  },

  getVerificationQueue: async (): Promise<VerificationDocument[]> => {
    try {
      const { data } = await apiClient.get('/admin/verification');
      return data;
    } catch (error) {
      if (USE_MOCKS || process.env.NODE_ENV === 'development') {
        console.warn('Using mock verification data');
        return mockVerificationDocuments;
      }
      throw error;
    }
  },

  approveVerification: async (id: string) => {
    const { data } = await apiClient.post(`/admin/verification/${id}/approve`);
    return data;
  },

  getDisputes: async (params?: QueryParams): Promise<Dispute[]> => {
    try {
      const { data } = await apiClient.get('/admin/disputes', { params });
      return data;
    } catch (error) {
      if (USE_MOCKS || process.env.NODE_ENV === 'development') {
        console.warn('Using mock disputes data');
        return mockDisputes;
      }
      throw error;
    }
  },

  getReports: async (params?: QueryParams): Promise<Report[]> => {
    try {
      const { data } = await apiClient.get('/admin/reports', { params });
      return data;
    } catch (error) {
      if (USE_MOCKS || process.env.NODE_ENV === 'development') {
        console.warn('Using mock reports data');
        return mockReports;
      }
      throw error;
    }
  },

  getAnalytics: async () => {
    try {
      const { data } = await apiClient.get('/admin/analytics');
      return data;
    } catch (error) {
      if (USE_MOCKS || process.env.NODE_ENV === 'development') {
        console.warn('Using mock analytics data');
        return {
          totalUsers: 150,
          totalRevenue: 500000,
          activeProjects: 25,
          growthRate: 12.5,
        };
      }
      throw error;
    }
  },
};
