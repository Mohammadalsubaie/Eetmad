'use client';

import { useState, useEffect } from 'react';
import { adminApi } from '@/lib/api/admin';
import type { User } from '@/lib/types/user.types';

export function useAdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await adminApi.getUsers();
        setUsers(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return {
    users,
    isLoading,
    error,
  };
}
