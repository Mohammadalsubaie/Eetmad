'use client';

import { useState, useEffect, useCallback } from 'react';
import { usersApi } from '@/lib/api/users';
import type { User, UpdateUserProfileData } from '@/lib/types/user.types';

export function useUser() {
  const [profile, setProfile] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadProfile = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await usersApi.getProfile();
      setProfile(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const updateProfile = async (data: UpdateUserProfileData) => {
    setIsLoading(true);
    setError(null);
    try {
      const updated = await usersApi.updateProfile(data);
      setProfile(updated);
      return updated;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    profile,
    isLoading,
    error,
    refetch: loadProfile,
    updateProfile,
  };
}
