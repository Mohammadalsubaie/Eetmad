'use client';

import { useState, useEffect } from 'react';
import type { DashboardStats, RecentActivity } from '@/lib/types';

export function useAdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // TODO: Replace with actual API call when backend is ready
    // const fetchDashboardData = async () => {
    //   setIsLoading(true);
    //   setError(null);
    //   try {
    //     const data = await adminApi.getDashboard();
    //     setStats(data.stats);
    //     setRecentActivity(data.recentActivity);
    //   } catch (err) {
    //     setError(err instanceof Error ? err : new Error(String(err)));
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };
    // fetchDashboardData();

    // Temporary mock data
    setStats({
      totalUsers: 1247,
      totalSuppliers: 389,
      activeRequests: 156,
      activeProjects: 94,
      totalRevenue: 2847500,
      pendingDisputes: 8,
      pendingVerifications: 23,
      completionRate: 94.5,
    });

    setRecentActivity([
      {
        id: '1',
        type: 'user_registered',
        description: '',
        user: 'أحمد محمد',
        timestamp: 'منذ 5 دقائق',
        status: 'success',
      },
      {
        id: '2',
        type: 'project_completed',
        description: '',
        user: 'شركة التقنية المتطورة',
        timestamp: 'منذ 15 دقيقة',
        status: 'success',
      },
      {
        id: '3',
        type: 'dispute_opened',
        description: '',
        user: 'سارة أحمد',
        timestamp: 'منذ 30 دقيقة',
        status: 'warning',
      },
      {
        id: '4',
        type: 'payment_received',
        description: '',
        user: 'محمد علي',
        timestamp: 'منذ ساعة',
        status: 'success',
      },
      {
        id: '5',
        type: 'verification_pending',
        description: '',
        user: 'شركة البناء الحديث',
        timestamp: 'منذ ساعتين',
        status: 'info',
      },
    ]);

    setIsLoading(false);
  }, []);

  return {
    stats,
    recentActivity,
    isLoading,
    error,
  };
}

