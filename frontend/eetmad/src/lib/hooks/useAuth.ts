'use client';

import { loginUser, logoutUser, registerUser } from '@/lib/api/auth';
import type { AuthResponse, LoginCredentials, RegisterData } from '@/lib/types/auth.types';
import type { User } from '@/lib/types/user.types';
import { useEffect, useState } from 'react';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // TODO: Verify token and get user data
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    setIsLoading(true);
    try {
      const response = await loginUser({
        email: credentials.email,
        password: credentials.password,
      });
      const now = new Date().toISOString();
      const userData: User = {
        id: response.user.id,
        email: response.user.email,
        fullName: response.user.name,
        userType: response.user.userType,
        phone: response.user.phone ?? '',
        isEmailVerified: response.user.verified ?? false,
        isPhoneVerified: false,
        status: 'active',
        avatar: response.user.avatar ?? '',
        dateOfBirth: null,
        nationalId: null,
        companyName: null,
        commercialRegister: null,
        taxNumber: null,
        averageRating: 0,
        totalReviews: 0,
        completedProjects: 0,
        walletBalance: 0,
        address: {},
        notificationPreferences: {},
        createdAt: response.user.createdAt || now,
        updatedAt: response.user.updatedAt || now,
        lastLoginAt: now,
      };
      setUser(userData);
      localStorage.setItem('token', response.token);
      return {
        user: userData,
        token: response.token,
        refreshToken: undefined,
      };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData): Promise<AuthResponse> => {
    setIsLoading(true);
    try {
      // Map RegisterData to API format (fullName -> name, and ensure userType is only 'client' | 'supplier')
      // RegisterData.userType can be 'client' | 'supplier' | 'admin', but API only accepts 'client' | 'supplier'
      const userType = data.userType === 'admin' ? 'client' : data.userType;
      const apiData = {
        name: data.fullName,
        email: data.email,
        password: data.password,
        userType: userType as 'client' | 'supplier',
      };
      const response = await registerUser(apiData);
      const now = new Date().toISOString();
      const userData: User = {
        id: response.user.id,
        email: response.user.email,
        fullName: response.user.name,
        userType: response.user.userType,
        phone: data.phoneNumber ?? response.user.phone ?? '',
        isEmailVerified: response.user.verified ?? false,
        isPhoneVerified: false,
        status: 'active',
        avatar: response.user.avatar ?? '',
        dateOfBirth: null,
        nationalId: null,
        companyName: data.companyName ?? null,
        commercialRegister: data.commercialReg ?? null,
        taxNumber: null,
        averageRating: 0,
        totalReviews: 0,
        completedProjects: 0,
        walletBalance: 0,
        address: {},
        notificationPreferences: {},
        createdAt: response.user.createdAt || now,
        updatedAt: response.user.updatedAt || now,
        lastLoginAt: now,
      };
      setUser(userData);
      localStorage.setItem('token', response.token);
      return {
        user: userData,
        token: response.token,
        refreshToken: undefined,
      };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
    localStorage.removeItem('token');
  };

  return { user, isLoading, login, register, logout };
}
