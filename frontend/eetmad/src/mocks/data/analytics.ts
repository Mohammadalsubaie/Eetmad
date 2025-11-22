/**
 * Mock analytics data for admin dashboard
 */

export interface UserGrowthData {
  month: string;
  users: number;
  growth: number;
}

export interface MonthlyRevenueData {
  month: string;
  revenue: number;
  target: number;
}

export interface ProjectsByCategoryData {
  category: string;
  projects: number;
}

export interface CompletionRateData {
  name: string;
  value: number;
  color?: string;
}

export interface AnalyticsData {
  userGrowth: UserGrowthData[];
  monthlyRevenue: MonthlyRevenueData[];
  projectsByCategory: ProjectsByCategoryData[];
  completionRate: CompletionRateData[];
  stats: {
    totalUsers: number;
    totalRevenue: number;
    activeProjects: number;
    growthRate: number;
  };
}

export const mockAnalyticsData: AnalyticsData = {
  userGrowth: [
    { month: 'يناير', users: 850, growth: 5.2 },
    { month: 'فبراير', users: 920, growth: 8.2 },
    { month: 'مارس', users: 1000, growth: 8.7 },
    { month: 'أبريل', users: 1080, growth: 8.0 },
    { month: 'مايو', users: 1150, growth: 6.5 },
    { month: 'يونيو', users: 1247, growth: 8.4 },
  ],
  monthlyRevenue: [
    { month: 'يناير', revenue: 420000, target: 400000 },
    { month: 'فبراير', revenue: 480000, target: 450000 },
    { month: 'مارس', revenue: 520000, target: 500000 },
    { month: 'أبريل', revenue: 580000, target: 550000 },
    { month: 'مايو', revenue: 640000, target: 600000 },
    { month: 'يونيو', revenue: 720000, target: 700000 },
  ],
  projectsByCategory: [
    { category: 'بناء وتشييد', projects: 45 },
    { category: 'تصميم', projects: 38 },
    { category: 'برمجة', projects: 32 },
    { category: 'تسويق', projects: 28 },
    { category: 'استشارات', projects: 15 },
  ],
  completionRate: [
    { name: 'مكتملة', value: 94.5 },
    { name: 'قيد التنفيذ', value: 4.2 },
    { name: 'متأخرة', value: 1.3 },
  ],
  stats: {
    totalUsers: 1247,
    totalRevenue: 2800000,
    activeProjects: 156,
    growthRate: 94.5,
  },
};
