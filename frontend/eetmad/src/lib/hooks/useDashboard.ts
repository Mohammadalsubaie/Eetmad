'use client';

import { useState, useEffect } from 'react';
import { dashboardApi } from '@/lib/api/dashboard';
import type { DashboardOverview, DashboardStatistics, RecentActivity } from '@/lib/api/dashboard';

export function useDashboard() {
  const [overview, setOverview] = useState<DashboardOverview | null>(null);
  const [statistics, setStatistics] = useState<DashboardStatistics | null>(null);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [overviewData, statisticsData, activityData] = await Promise.all([
          dashboardApi.getOverview(),
          dashboardApi.getStatistics(),
          dashboardApi.getRecentActivity(),
        ]);
        setOverview(overviewData);
        setStatistics(statisticsData);
        setRecentActivity(activityData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return {
    overview,
    statistics,
    recentActivity,
    isLoading,
    error,
  };
}
