'use client';

import { useState, useEffect } from 'react';
import { usersApi } from '@/lib/api/users';
import type {
  User,
  UpdateUserProfileData,
  UserAddress,
  NotificationPreferences,
  UserStatistics,
} from '@/lib/types/user.types';
import type { ChangePasswordData } from '@/lib/api/users';

export function useProfile() {
  const [data, setData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await usersApi.getProfile();
        setData(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return { data, isLoading, error };
}

export function useUser(id: string) {
  const [data, setData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      return;
    }

    const fetchUser = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await usersApi.getUser(id);
        setData(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  return { data, isLoading, error };
}

export function useUserStatistics() {
  const [data, setData] = useState<UserStatistics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await usersApi.getStatistics();
        setData(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  return { data, isLoading, error };
}

export function useUpdateProfile() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (data: UpdateUserProfileData) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await usersApi.updateProfile(data);
      setIsLoading(false);
      return result;
    } catch (err) {
      setError(err as Error);
      setIsLoading(false);
      throw err;
    }
  };

  return { mutate, isLoading, error };
}

export function useChangePassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (data: ChangePasswordData) => {
    setIsLoading(true);
    setError(null);
    try {
      await usersApi.changePassword(data);
      setIsLoading(false);
    } catch (err) {
      setError(err as Error);
      setIsLoading(false);
      throw err;
    }
  };

  return { mutate, isLoading, error };
}

export function useUploadAvatar() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (file: File) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await usersApi.uploadAvatar(file);
      setIsLoading(false);
      return result;
    } catch (err) {
      setError(err as Error);
      setIsLoading(false);
      throw err;
    }
  };

  return { mutate, isLoading, error };
}

export function useUpdateAddress() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (address: Partial<UserAddress>) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await usersApi.updateAddress(address);
      setIsLoading(false);
      return result;
    } catch (err) {
      setError(err as Error);
      setIsLoading(false);
      throw err;
    }
  };

  return { mutate, isLoading, error };
}

export function useUpdateNotificationPreferences() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (preferences: Partial<NotificationPreferences>) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await usersApi.updateNotificationPreferences(preferences);
      setIsLoading(false);
      return result;
    } catch (err) {
      setError(err as Error);
      setIsLoading(false);
      throw err;
    }
  };

  return { mutate, isLoading, error };
}

export function useDeleteAccount() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await usersApi.deleteAccount();
      setIsLoading(false);
    } catch (err) {
      setError(err as Error);
      setIsLoading(false);
      throw err;
    }
  };

  return { mutate, isLoading, error };
}
