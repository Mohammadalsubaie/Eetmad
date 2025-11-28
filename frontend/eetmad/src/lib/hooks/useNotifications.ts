'use client';

import { useState, useEffect } from 'react';
import { notificationsApi } from '@/lib/api/notifications';
import type { Notification, NotificationType } from '@/lib/types/notification.types';
import type { QueryParams } from '@/lib/types/common.types';

export function useNotifications(params?: QueryParams) {
  const [data, setData] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await notificationsApi.getAll(params);
        setData(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, [params]);

  return { data, isLoading, error };
}

export function useNotification(id: string) {
  const [data, setData] = useState<Notification | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      return;
    }

    const fetchNotification = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await notificationsApi.getById(id);
        setData(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotification();
  }, [id]);

  return { data, isLoading, error };
}

export function useUnreadNotifications(params?: QueryParams) {
  const [data, setData] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUnread = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await notificationsApi.getUnread(params);
        setData(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    };

    fetchUnread();
  }, [params]);

  return { data, isLoading, error };
}

export function useUnreadCount() {
  const [data, setData] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUnreadCount = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await notificationsApi.getUnreadCount();
        setData(result.count);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    };

    fetchUnreadCount();
  }, []);

  return { data, isLoading, error };
}

export function useNotificationsByType(type: NotificationType, params?: QueryParams) {
  const [data, setData] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchByType = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await notificationsApi.getByType(type, params);
        setData(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    };

    fetchByType();
  }, [type, params]);

  return { data, isLoading, error };
}

export function useMarkAsRead() {
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

export function useMarkAllAsRead() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await notificationsApi.markAllAsRead();
      setIsLoading(false);
    } catch (err) {
      setError(err as Error);
      setIsLoading(false);
      throw err;
    }
  };

  return { mutate, isLoading, error };
}

export function useDeleteNotification() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await notificationsApi.delete(id);
      setIsLoading(false);
    } catch (err) {
      setError(err as Error);
      setIsLoading(false);
      throw err;
    }
  };

  return { mutate, isLoading, error };
}

export function useClearAllNotifications() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await notificationsApi.clearAll();
      setIsLoading(false);
    } catch (err) {
      setError(err as Error);
      setIsLoading(false);
      throw err;
    }
  };

  return { mutate, isLoading, error };
}
