'use client';

import { useState } from 'react';
import { usersApi, type ChangePasswordData } from '@/lib/api/users';

export function useChangePassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [success, setSuccess] = useState(false);

  const changePassword = async (data: ChangePasswordData): Promise<void> => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await usersApi.changePassword(data);
      setSuccess(true);
    } catch (err) {
      const errorMessage =
        err && typeof err === 'object' && 'response' in err
          ? (err as { response?: { data?: { message?: string } } })?.response?.data?.message
          : undefined;
      const error = new Error(errorMessage || 'Failed to change password');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { changePassword, isLoading, error, success };
}

