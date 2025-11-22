'use client';

import { useState, useEffect } from 'react';
import { adminApi } from '@/lib/api/admin';
import type { AnalyticsData } from '@/mocks/data/analytics';

export function useAnalytics() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const analyticsData = await adminApi.getAnalytics();
        setData(analyticsData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  return {
    data,
    isLoading,
    error,
  };
}

