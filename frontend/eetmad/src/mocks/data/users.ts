/**
 * Mock user data
 */

import type { User } from '@/lib/types/user.types';

export const mockUser: User = {
  id: '1',
  userType: 'client',
  email: 'user@example.com',
  phone: '+966501234567',
  isEmailVerified: true,
  isPhoneVerified: true,
  status: 'active',
  fullName: 'أحمد محمد',
  avatar: '',
  dateOfBirth: '1990-01-15',
  nationalId: '1234567890',
  companyName: null,
  commercialRegister: null,
  taxNumber: null,
  averageRating: 4.8,
  totalReviews: 24,
  completedProjects: 8,
  walletBalance: 5000,
  address: {
    street: 'شارع الملك فهد',
    city: 'الرياض',
    state: 'الرياض',
    country: 'السعودية',
    postalCode: '12345',
  },
  notificationPreferences: {
    email: {
      requests: true,
      offers: true,
      messages: true,
      reviews: true,
      system: true,
    },
    push: {
      requests: true,
      offers: true,
      messages: true,
      reviews: false,
      system: true,
    },
    sms: {
      important: true,
      security: true,
    },
  },
  createdAt: '2023-01-15T10:00:00Z',
  updatedAt: '2024-12-01T10:00:00Z',
  lastLoginAt: new Date().toISOString(),
};

export const mockUsers: User[] = [mockUser];
