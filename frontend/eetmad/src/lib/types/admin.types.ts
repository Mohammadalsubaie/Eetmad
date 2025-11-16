export interface DashboardStats {
  totalUsers: number;
  totalSuppliers: number;
  activeRequests: number;
  activeProjects: number;
  totalRevenue: number;
  pendingDisputes: number;
  pendingVerifications: number;
  completionRate: number;
}

export interface RecentActivity {
  id: string;
  type: string;
  description: string;
  user: string;
  timestamp: string;
  status: 'success' | 'warning' | 'error' | 'info';
}

export interface StatsSummaryItem {
  id: string;
  label: string;
  value: string | number;
  icon: any;
  color: string;
}
