/**
 * Mock dashboard data
 */

import type { DashboardOverview, DashboardStatistics, RecentActivity } from '@/lib/api/dashboard';

export const mockDashboardOverview: DashboardOverview = {
  totalRequests: 12,
  activeProjects: 5,
  completedProjects: 8,
  totalSpending: 125000,
  walletBalance: 5000,
  unreadNotifications: 3,
  unreadMessages: 2,
};

export const mockDashboardStatistics: DashboardStatistics = {
  requests: {
    total: 12,
    active: 4,
    closed: 6,
    pending: 2,
  },
  projects: {
    total: 13,
    active: 5,
    completed: 8,
    cancelled: 0,
  },
  offers: {
    total: 24,
    pending: 3,
    accepted: 15,
    rejected: 6,
  },
  spending: {
    total: 125000,
    thisMonth: 15000,
    lastMonth: 20000,
  },
};

export const mockRecentActivity: RecentActivity[] = [
  {
    id: '1',
    type: 'request',
    title: 'تم استلام عرض جديد',
    description: 'لقد استلمت عرضاً لطلب "معدات مكتبية"',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    link: '/requests/1',
  },
  {
    id: '2',
    type: 'project',
    title: 'تم إكمال مرحلة المشروع',
    description: 'تم إكمال المرحلة 2 من "تطوير الموقع الإلكتروني"',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    link: '/projects/1',
  },
  {
    id: '3',
    type: 'message',
    title: 'رسالة جديدة',
    description: 'لديك رسالة جديدة من المورد',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    link: '/messages',
  },
  {
    id: '4',
    type: 'notification',
    title: 'تم نشر الطلب',
    description: 'تم نشر طلبك "مستلزمات المطبخ"',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    link: '/requests/2',
  },
];
