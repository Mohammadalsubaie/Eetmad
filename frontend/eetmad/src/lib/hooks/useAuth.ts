'use client';

import { loginUser, logoutUser, registerUser } from '@/lib/api/auth';
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

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await loginUser({ email, password });
      const userData: User = {
        id: response.user.id,
        email: response.user.email,
        name: response.user.name,
        userType: response.user.userType,
        verified: response.user.verified ?? false,
        avatar: response.user.avatar ?? '',
        phone: response.user.phone ?? '',
        createdAt: response.user.createdAt || new Date().toISOString(),
        updatedAt: response.user.updatedAt || new Date().toISOString(),
      };
      setUser(userData);
      localStorage.setItem('token', response.token);
      return response;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: {
    name: string;
    email: string;
    password: string;
    userType: 'client' | 'supplier';
  }) => {
    setIsLoading(true);
    try {
      const response = await registerUser(data);
      const userData: User = {
        id: response.user.id,
        email: response.user.email,
        name: response.user.name,
        userType: response.user.userType,
        verified: response.user.verified ?? false,
        avatar: response.user.avatar ?? '',
        phone: response.user.phone ?? '',
        createdAt: response.user.createdAt || new Date().toISOString(),
        updatedAt: response.user.updatedAt || new Date().toISOString(),
      };
      setUser(userData);
      localStorage.setItem('token', response.token);
      return response;
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
