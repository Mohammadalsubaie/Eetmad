import apiClient from './client';
import { USE_MOCKS } from './_mockHelper';

export interface DashboardOverview {
  totalRequests: number;
  activeProjects: number;
  completedProjects: number;
  totalSpending: number;
  walletBalance: number;
  unreadNotifications: number;
  unreadMessages: number;
}

export interface DashboardStatistics {
  requests: {
    total: number;
    active: number;
    closed: number;
    pending: number;
  };
  projects: {
    total: number;
    active: number;
    completed: number;
    cancelled: number;
  };
  offers: {
    total: number;
    pending: number;
    accepted: number;
    rejected: number;
  };
  spending: {
    total: number;
    thisMonth: number;
    lastMonth: number;
  };
}

export interface RecentActivity {
  id: string;
  type: 'request' | 'offer' | 'project' | 'message' | 'notification';
  title: string;
  description: string;
  timestamp: string;
  link?: string;
}

// Mock data
const mockOverview: DashboardOverview = {
  totalRequests: 12,
  activeProjects: 5,
  completedProjects: 8,
  totalSpending: 125000,
  walletBalance: 5000,
  unreadNotifications: 3,
  unreadMessages: 2,
};

const mockStatistics: DashboardStatistics = {
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

const mockRecentActivity: RecentActivity[] = [
  {
    id: '1',
    type: 'request',
    title: 'New offer received',
    description: 'You received an offer for "Office Equipment Request"',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    link: '/requests/1',
  },
  {
    id: '2',
    type: 'project',
    title: 'Project milestone completed',
    description: 'Milestone 2 of "Website Development" has been completed',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    link: '/projects/1',
  },
  {
    id: '3',
    type: 'message',
    title: 'New message',
    description: 'You have a new message from supplier',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    link: '/messages',
  },
  {
    id: '4',
    type: 'notification',
    title: 'Request published',
    description: 'Your request "Kitchen Supplies" has been published',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    link: '/requests/2',
  },
];

export const dashboardApi = {
  getOverview: async (): Promise<DashboardOverview> => {
    try {
      const { data } = await apiClient.get<DashboardOverview>('/dashboard/overview');
      return data;
    } catch (error) {
      if (USE_MOCKS || process.env.NODE_ENV === 'development') {
        console.warn('Using mock dashboard overview data');
        return mockOverview;
      }
      throw error;
    }
  },

  getStatistics: async (): Promise<DashboardStatistics> => {
    try {
      const { data } = await apiClient.get<DashboardStatistics>('/dashboard/statistics');
      return data;
    } catch (error) {
      if (USE_MOCKS || process.env.NODE_ENV === 'development') {
        console.warn('Using mock dashboard statistics data');
        return mockStatistics;
      }
      throw error;
    }
  },

  getRecentActivity: async (): Promise<RecentActivity[]> => {
    try {
      const { data } = await apiClient.get<RecentActivity[]>('/dashboard/recent-activity');
      return data;
    } catch (error) {
      if (USE_MOCKS || process.env.NODE_ENV === 'development') {
        console.warn('Using mock recent activity data');
        return mockRecentActivity;
      }
      throw error;
    }
  },
};
