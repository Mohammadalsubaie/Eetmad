'use client';

import { useTranslations } from 'next-intl';
import { cssVars } from '@/styles/theme';
import { motion } from 'framer-motion';
import { useDashboard } from '@/lib/hooks/useDashboard';
import { LoadingSpinner, ErrorMessage } from '@/components/ui';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';
import DashboardHeader from '@/components/features/dashboard/DashboardHeader';
import DashboardOverviewStats from '@/components/features/dashboard/DashboardOverviewStats';
import DashboardStatistics from '@/components/features/dashboard/DashboardStatistics';
import DashboardRecentActivity from '@/components/features/dashboard/DashboardRecentActivity';

export default function DashboardPage() {
  const t = useTranslations('pages.dashboard');
  const { overview, statistics, recentActivity, isLoading, error } = useDashboard();

  if (isLoading) {
    return (
      <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
        <Breadcrumbs items={[{ label: t('title') }]} className="mb-6" />
        <div className="flex h-64 items-center justify-center">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
        <Breadcrumbs items={[{ label: t('title') }]} className="mb-6" />
        <ErrorMessage error={error.message} variant="banner" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
      <Breadcrumbs items={[{ label: t('title') }]} className="mb-6" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <DashboardHeader />

        {overview && <DashboardOverviewStats overview={overview} />}
        {statistics && <DashboardStatistics statistics={statistics} />}
        <DashboardRecentActivity recentActivity={recentActivity} overview={overview} />
      </motion.div>
    </div>
  );
}
