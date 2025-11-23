'use client';

import CompletionRateChart from '@/components/features/admin/charts/CompletionRateChart';
import MonthlyRevenueChart from '@/components/features/admin/charts/MonthlyRevenueChart';
import ProjectsByCategoryChart from '@/components/features/admin/charts/ProjectsByCategoryChart';
import UserGrowthChart from '@/components/features/admin/charts/UserGrowthChart';
import AdminActionButton from '@/components/shared/admin/AdminActionButton';
import AdminPageHeader from '@/components/shared/admin/AdminPageHeader';
import AdminStatCard from '@/components/shared/admin/AdminStatCard';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';
import { useAnalytics } from '@/lib/hooks/useAnalytics';
import { cssVars } from '@/styles/theme';
import { motion } from 'framer-motion';
import {
  Activity,
  BarChart3,
  Calendar,
  DollarSign,
  Download,
  TrendingUp,
  Users,
} from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

export default function AnalyticsPage() {
  const t = useTranslations('admin');
  const tPages = useTranslations('pages');
  const locale = useLocale();
  const { data, isLoading, error } = useAnalytics();

  // Add colors to completion rate data
  const completionRateData =
    data?.completionRate.map((item, index) => {
      const colors = [cssVars.status.success, cssVars.status.warning, cssVars.status.error];
      return {
        ...item,
        color: item.color || colors[index % colors.length],
      };
    }) || [];

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p style={{ color: cssVars.neutral.textSecondary }}>{t('analytics.loading')}</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p style={{ color: cssVars.status.error }}>{error?.message || t('analytics.error')}</p>
      </div>
    );
  }

  const formatRevenue = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}${t('analytics.currency.million')}`;
    }
    return `${(value / 1000).toFixed(0)}${t('analytics.currency.thousand')}`;
  };

  const formatNumber = (value: number) => {
    return value.toLocaleString();
  };

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: tPages('admin.title'), href: `/${locale}/admin` },
          { label: tPages('analytics.title') },
        ]}
        className="mb-6"
      />

      <AdminPageHeader
        title={t('analytics.title')}
        description={t('analytics.description')}
        icon={BarChart3}
        action={
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <AdminActionButton
              label={t('analytics.actions.selectPeriod')}
              icon={Calendar}
              variant="secondary"
              size="sm"
            />
            <AdminActionButton
              label={t('analytics.actions.exportReport')}
              icon={Download}
              variant="primary"
              size="sm"
            />
          </div>
        }
      />

      {/* Key Metrics */}
      <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStatCard
          title={t('analytics.stats.totalUsers')}
          value={formatNumber(data.stats.totalUsers)}
          change="+12%"
          trend="up"
          icon={Users}
          color={cssVars.primary.DEFAULT}
        />
        <AdminStatCard
          title={t('analytics.stats.totalRevenue')}
          value={formatRevenue(data.stats.totalRevenue)}
          change="+18%"
          trend="up"
          icon={DollarSign}
          color={cssVars.status.success}
        />
        <AdminStatCard
          title={t('analytics.stats.activeProjects')}
          value={formatNumber(data.stats.activeProjects)}
          change="+24%"
          trend="up"
          icon={Activity}
          color={cssVars.status.info}
        />
        <AdminStatCard
          title={t('analytics.stats.growthRate')}
          value={`${data.stats.growthRate.toFixed(1)}%`}
          change="+5%"
          trend="up"
          icon={TrendingUp}
          color={cssVars.accent.primary}
        />
      </div>

      {/* Charts */}
      <div className="mb-6 sm:mb-8 grid gap-4 sm:gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          whileHover={{ y: -6, scale: 1.01 }}
          className="rounded-xl sm:rounded-2xl border-2 p-4 sm:p-6 shadow-lg transition-shadow duration-300"
          style={{
            backgroundColor: cssVars.neutral.surface,
            borderColor: cssVars.neutral.border,
            boxShadow: `0 4px 6px -1px color-mix(in srgb, ${cssVars.neutral.darker} 10%, transparent), 0 2px 4px -1px color-mix(in srgb, ${cssVars.neutral.darker} 6%, transparent)`,
          }}
        >
          <div className="mb-3 sm:mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <h3 className="text-lg sm:text-xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
              {t('analytics.charts.userGrowth')}
            </h3>
            <div
              className="rounded-lg px-3 py-1 text-xs font-semibold"
              style={{
                backgroundColor: `${cssVars.primary.DEFAULT}15`,
                color: cssVars.primary.DEFAULT,
              }}
            >
              +8.4%
            </div>
          </div>
          <div className="rounded-xl p-3" style={{ backgroundColor: cssVars.neutral.bg }}>
            <UserGrowthChart data={data.userGrowth} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
          whileHover={{ y: -6, scale: 1.01 }}
          className="rounded-xl sm:rounded-2xl border-2 p-4 sm:p-6 shadow-lg transition-shadow duration-300"
          style={{
            backgroundColor: cssVars.neutral.surface,
            borderColor: cssVars.neutral.border,
            boxShadow: `0 4px 6px -1px color-mix(in srgb, ${cssVars.neutral.darker} 10%, transparent), 0 2px 4px -1px color-mix(in srgb, ${cssVars.neutral.darker} 6%, transparent)`,
          }}
        >
          <div className="mb-3 sm:mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <h3 className="text-lg sm:text-xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
              {t('analytics.charts.monthlyRevenue')}
            </h3>
            <div
              className="rounded-lg px-3 py-1 text-xs font-semibold"
              style={{
                backgroundColor: `${cssVars.status.success}15`,
                color: cssVars.status.success,
              }}
            >
              +18%
            </div>
          </div>
          <div className="rounded-xl p-3" style={{ backgroundColor: cssVars.neutral.bg }}>
            <MonthlyRevenueChart data={data.monthlyRevenue} />
          </div>
        </motion.div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2, ease: 'easeOut' }}
          whileHover={{ y: -6, scale: 1.01 }}
          className="rounded-xl sm:rounded-2xl border-2 p-4 sm:p-6 shadow-lg transition-shadow duration-300"
          style={{
            backgroundColor: cssVars.neutral.surface,
            borderColor: cssVars.neutral.border,
            boxShadow: `0 4px 6px -1px color-mix(in srgb, ${cssVars.neutral.darker} 10%, transparent), 0 2px 4px -1px color-mix(in srgb, ${cssVars.neutral.darker} 6%, transparent)`,
          }}
        >
          <div className="mb-3 sm:mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <h3 className="text-lg sm:text-xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
              {t('analytics.charts.projectsByCategory')}
            </h3>
            <div
              className="rounded-lg px-3 py-1 text-xs font-semibold"
              style={{
                backgroundColor: `${cssVars.status.info}15`,
                color: cssVars.status.info,
              }}
            >
              {data.projectsByCategory.reduce((sum, item) => sum + item.projects, 0)}{' '}
              {t('analytics.common.project')}
            </div>
          </div>
          <div className="rounded-xl p-3" style={{ backgroundColor: cssVars.neutral.bg }}>
            <ProjectsByCategoryChart data={data.projectsByCategory} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3, ease: 'easeOut' }}
          whileHover={{ y: -6, scale: 1.01 }}
          className="rounded-xl sm:rounded-2xl border-2 p-4 sm:p-6 shadow-lg transition-shadow duration-300"
          style={{
            backgroundColor: cssVars.neutral.surface,
            borderColor: cssVars.neutral.border,
            boxShadow: `0 4px 6px -1px color-mix(in srgb, ${cssVars.neutral.darker} 10%, transparent), 0 2px 4px -1px color-mix(in srgb, ${cssVars.neutral.darker} 6%, transparent)`,
          }}
        >
          <div className="mb-3 sm:mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <h3 className="text-lg sm:text-xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
              {t('analytics.charts.completionRate')}
            </h3>
            <div
              className="rounded-lg px-3 py-1 text-xs font-semibold"
              style={{
                backgroundColor: `${cssVars.status.success}15`,
                color: cssVars.status.success,
              }}
            >
              {completionRateData[0]?.value.toFixed(1)}%
            </div>
          </div>
          <div className="rounded-xl p-3" style={{ backgroundColor: cssVars.neutral.bg }}>
            <CompletionRateChart data={completionRateData} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
