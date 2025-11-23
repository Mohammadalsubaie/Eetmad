import apiClient from './client';
import type { QueryParams } from '@/lib/types/common.types';
import { mockUsers } from '@/mocks/data/users';
import { mockDisputes } from '@/mocks/data/disputes';
import { mockReports } from '@/mocks/data/reports';
import { mockVerificationDocuments } from '@/mocks/data/verification';
import { mockAnalyticsData } from '@/mocks/data/analytics';
import type { User } from '@/lib/types/user.types';
import type { Dispute } from '@/lib/types/dispute.types';
import type { Report } from '@/lib/types/report.types';
import type { VerificationDocument } from '@/lib/types/verification.types';
import type { AnalyticsData } from '@/mocks/data/analytics';
import { USE_MOCKS } from './_mockHelper';

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

  getAnalytics: async (): Promise<AnalyticsData> => {
    try {
      const { data } = await apiClient.get('/admin/analytics');
      return data;
    } catch (error) {
      if (USE_MOCKS || process.env.NODE_ENV === 'development') {
        console.warn('Using mock analytics data');
        return mockAnalyticsData;
      }
      throw error;
    }
  },
};
