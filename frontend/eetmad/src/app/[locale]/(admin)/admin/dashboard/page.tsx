'use client';

import { useTranslations, useLocale } from 'next-intl';
import { LayoutDashboard } from 'lucide-react';
import { useAdminDashboard } from '@/lib/hooks/useAdminDashboard';
import { LoadingSpinner, ErrorMessage } from '@/components/ui';
import AdminPageHeader from '@/components/shared/admin/AdminPageHeader';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';
import AdminDashboardStats from '@/components/features/admin/AdminDashboardStats';
import AdminDashboardRevenue from '@/components/features/admin/AdminDashboardRevenue';
import AdminDashboardPerformance from '@/components/features/admin/AdminDashboardPerformance';
import AdminDashboardAlerts from '@/components/features/admin/AdminDashboardAlerts';
import AdminDashboardActivity from '@/components/features/admin/AdminDashboardActivity';

export default function AdminDashboardPage() {
  const t = useTranslations('admin');
  const tPages = useTranslations('pages');
  const locale = useLocale();
  const { stats, recentActivity, isLoading, error } = useAdminDashboard();

  if (isLoading) {
    return (
      <div>
        <Breadcrumbs
          items={[
            { label: tPages('admin.title'), href: `/${locale}/admin` },
            { label: tPages('dashboard.title') },
          ]}
          className="mb-6"
        />
        <div className="flex h-64 items-center justify-center">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div>
        <Breadcrumbs
          items={[
            { label: tPages('admin.title'), href: `/${locale}/admin` },
            { label: tPages('dashboard.title') },
          ]}
          className="mb-6"
        />
        <ErrorMessage error={error?.message || t('dashboard.error')} variant="banner" />
      </div>
    );
  }

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: tPages('admin.title'), href: `/${locale}/admin` },
          { label: tPages('dashboard.title') },
        ]}
        className="mb-6"
      />

      <AdminPageHeader
        title={t('dashboard.title')}
        description={t('dashboard.description')}
        icon={LayoutDashboard}
      />

      <AdminDashboardStats stats={stats} />

      <div className="mb-6 grid gap-4 sm:mb-8 sm:gap-6 lg:grid-cols-2">
        <AdminDashboardRevenue stats={stats} />
        <AdminDashboardPerformance stats={stats} />
      </div>

      <AdminDashboardAlerts stats={stats} />

      <AdminDashboardActivity recentActivity={recentActivity} isLoading={isLoading} />
    </div>
  );
}
