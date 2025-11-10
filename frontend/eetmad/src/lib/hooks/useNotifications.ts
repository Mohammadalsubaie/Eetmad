'use client';

import { useState, useEffect } from 'react';
import { notificationsApi } from '@/lib/api/notifications';
import type { QueryParams } from '@/lib/types/common.types';
import type { Notification } from '@/lib/types/notification.types';

export function useNotifications(params?: QueryParams) {
  const [data, setData] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    notificationsApi
      .getAll(params)
      .then(setData)
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, [params]);

  return { data, isLoading, error };
}

export function useUnreadCount() {
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCount = () => {
      notificationsApi
        .getUnreadCount()
        .then((data) => setCount(data.count || 0))
        .finally(() => setIsLoading(false));
    };

    fetchCount();
    const interval = setInterval(fetchCount, 30000); // Refetch every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return { count, isLoading };
}

export function useMarkNotificationAsRead() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await notificationsApi.markAsRead(id);
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
