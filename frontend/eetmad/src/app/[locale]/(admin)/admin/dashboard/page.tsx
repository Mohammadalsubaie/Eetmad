'use client';

import AdminDataTable from '@/components/shared/admin/AdminDataTable';
import AdminPageHeader from '@/components/shared/admin/AdminPageHeader';
import AdminStatCard from '@/components/shared/admin/AdminStatCard';
import type { DashboardStats, RecentActivity } from '@/lib/types';
import { cssVars } from '@/styles/theme';
import { motion } from 'framer-motion';
import {
  Activity,
  AlertTriangle,
  Briefcase,
  CheckCircle,
  Clock,
  DollarSign,
  FileText,
  LayoutDashboard,
  Package,
  ShoppingBag,
  Star,
  TrendingUp,
  Users,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

export default function AdminDashboardPage() {
  const t = useTranslations('admin');
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 1247,
    totalSuppliers: 389,
    activeRequests: 156,
    activeProjects: 94,
    totalRevenue: 2847500,
    pendingDisputes: 8,
    pendingVerifications: 23,
    completionRate: 94.5,
  });

  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([
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

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch dashboard data from API
    // const fetchDashboardData = async () => {
    //   setLoading(true);
    //   try {
    //     const data = await adminApi.getDashboard();
    //     setStats(data.stats);
    //     setRecentActivity(data.recentActivity);
    //   } catch (error) {
    //     console.error('Failed to fetch dashboard data:', error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // fetchDashboardData();
  }, []);

  const activityColumns = [
    {
      key: 'description',
      header: t('dashboard.recentActivity.table.activity'),
      render: (item: RecentActivity) => (
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl"
            style={{
              backgroundColor: `color-mix(in srgb, ${
                item.status === 'success'
                  ? cssVars.status.success
                  : item.status === 'warning'
                    ? cssVars.status.warning
                    : item.status === 'error'
                      ? cssVars.status.error
                      : cssVars.status.info
              } 15%, transparent)`,
            }}
          >
            {item.status === 'success' ? (
              <CheckCircle className="h-5 w-5" style={{ color: cssVars.status.success }} />
            ) : item.status === 'warning' ? (
              <AlertTriangle className="h-5 w-5" style={{ color: cssVars.status.warning }} />
            ) : (
              <Activity className="h-5 w-5" style={{ color: cssVars.status.info }} />
            )}
          </div>
          <div>
            <div className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
              {t(`dashboard.recentActivity.types.${item.type}`, { defaultValue: item.description })}
            </div>
            <div className="text-xs" style={{ color: cssVars.neutral.textMuted }}>
              {item.user}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 'timestamp',
      header: t('dashboard.recentActivity.table.time'),
      render: (item: RecentActivity) => (
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" style={{ color: cssVars.neutral.textMuted }} />
          <span style={{ color: cssVars.neutral.textSecondary }}>{item.timestamp}</span>
        </div>
      ),
    },
  ];

  return (
    <div>
      <AdminPageHeader
        title={t('dashboard.title')}
        description={t('dashboard.description')}
        icon={LayoutDashboard}
      />

      {/* Stats Grid */}
      <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStatCard
          title={t('dashboard.stats.totalUsers')}
          value={stats.totalUsers.toLocaleString('ar-SA')}
          change="+12%"
          trend="up"
          icon={Users}
          color={cssVars.primary.DEFAULT}
        />
        <AdminStatCard
          title={t('dashboard.stats.totalSuppliers')}
          value={stats.totalSuppliers.toLocaleString('ar-SA')}
          change="+8%"
          trend="up"
          icon={ShoppingBag}
          color={cssVars.accent.primary}
        />
        <AdminStatCard
          title={t('dashboard.stats.activeRequests')}
          value={stats.activeRequests.toLocaleString('ar-SA')}
          change="+24%"
          trend="up"
          icon={FileText}
          color={cssVars.status.info}
        />
        <AdminStatCard
          title={t('dashboard.stats.activeProjects')}
          value={stats.activeProjects.toLocaleString('ar-SA')}
          change="-3%"
          trend="down"
          icon={Briefcase}
          color={cssVars.secondary.DEFAULT}
        />
      </div>

      {/* Revenue & Performance */}
      <div className="mb-8 grid gap-6 lg:grid-cols-2">
        <motion.div
          whileHover={{ y: -4 }}
          className="rounded-2xl border-2 p-6 shadow-md"
          style={{
            backgroundColor: cssVars.neutral.surface,
            borderColor: cssVars.neutral.border,
          }}
        >
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl"
                style={{
                  backgroundColor: `color-mix(in srgb, ${cssVars.status.success} 15%, transparent)`,
                }}
              >
                <DollarSign className="h-6 w-6" style={{ color: cssVars.status.success }} />
              </div>
              <div>
                <h3 className="text-lg font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                  {t('dashboard.revenue.title')}
                </h3>
                <p className="text-sm" style={{ color: cssVars.neutral.textSecondary }}>
                  {t('dashboard.revenue.subtitle')}
                </p>
              </div>
            </div>
            <div
              className="flex items-center gap-2 rounded-lg px-3 py-1.5"
              style={{
                backgroundColor: `color-mix(in srgb, ${cssVars.status.success} 15%, transparent)`,
              }}
            >
              <TrendingUp className="h-4 w-4" style={{ color: cssVars.status.success }} />
              <span className="text-sm font-bold" style={{ color: cssVars.status.success }}>
                +18%
              </span>
            </div>
          </div>
          <div className="text-4xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
            {stats.totalRevenue.toLocaleString('ar-SA')} {t('common.currency')}
          </div>
          <div className="mt-2 text-sm" style={{ color: cssVars.neutral.textSecondary }}>
            {t('dashboard.revenue.comparison')}
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -4 }}
          className="rounded-2xl border-2 p-6 shadow-md"
          style={{
            backgroundColor: cssVars.neutral.surface,
            borderColor: cssVars.neutral.border,
          }}
        >
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl"
                style={{
                  backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 15%, transparent)`,
                }}
              >
                <Star className="h-6 w-6" style={{ color: cssVars.primary.DEFAULT }} />
              </div>
              <div>
                <h3 className="text-lg font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                  {t('dashboard.performance.title')}
                </h3>
                <p className="text-sm" style={{ color: cssVars.neutral.textSecondary }}>
                  {t('dashboard.performance.subtitle')}
                </p>
              </div>
            </div>
            <div
              className="flex items-center gap-2 rounded-lg px-3 py-1.5"
              style={{
                backgroundColor: `color-mix(in srgb, ${cssVars.status.success} 15%, transparent)`,
              }}
            >
              <TrendingUp className="h-4 w-4" style={{ color: cssVars.status.success }} />
              <span className="text-sm font-bold" style={{ color: cssVars.status.success }}>
                +5%
              </span>
            </div>
          </div>
          <div className="text-4xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
            {stats.completionRate}%
          </div>
          <div className="mt-2 text-sm" style={{ color: cssVars.neutral.textSecondary }}>
            {t('dashboard.performance.completionRate')}
          </div>
        </motion.div>
      </div>

      {/* Alerts */}
      <div className="mb-8 grid gap-6 sm:grid-cols-2">
        <motion.div
          whileHover={{ y: -4 }}
          className="rounded-2xl border-2 border-l-4 p-6 shadow-md"
          style={{
            backgroundColor: cssVars.neutral.surface,
            borderColor: cssVars.neutral.border,
            borderLeftColor: cssVars.status.warning,
          }}
        >
          <div className="flex items-center gap-4">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-xl"
              style={{
                backgroundColor: `color-mix(in srgb, ${cssVars.status.warning} 15%, transparent)`,
              }}
            >
              <AlertTriangle className="h-6 w-6" style={{ color: cssVars.status.warning }} />
            </div>
            <div>
              <div className="text-2xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                {stats.pendingDisputes}
              </div>
              <div
                className="text-sm font-semibold"
                style={{ color: cssVars.neutral.textSecondary }}
              >
                {t('dashboard.alerts.pendingDisputes')}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -4 }}
          className="rounded-2xl border-2 border-l-4 p-6 shadow-md"
          style={{
            backgroundColor: cssVars.neutral.surface,
            borderColor: cssVars.neutral.border,
            borderLeftColor: cssVars.status.info,
          }}
        >
          <div className="flex items-center gap-4">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-xl"
              style={{
                backgroundColor: `color-mix(in srgb, ${cssVars.status.info} 15%, transparent)`,
              }}
            >
              <Package className="h-6 w-6" style={{ color: cssVars.status.info }} />
            </div>
            <div>
              <div className="text-2xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                {stats.pendingVerifications}
              </div>
              <div
                className="text-sm font-semibold"
                style={{ color: cssVars.neutral.textSecondary }}
              >
                {t('dashboard.alerts.pendingVerifications')}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="mb-4 text-2xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
          {t('dashboard.recentActivity.title')}
        </h2>
        <AdminDataTable
          data={recentActivity}
          columns={activityColumns}
          searchPlaceholder={t('dashboard.recentActivity.search')}
          isLoading={loading}
          emptyMessage={t('dashboard.recentActivity.empty')}
        />
      </div>
    </div>
  );
}
