'use client';

import { Activity, CheckCircle, Clock } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import { useTranslations } from 'next-intl';
import AdminDataTable from '@/components/shared/admin/AdminDataTable';
import type { RecentActivity } from '@/lib/types';

interface AdminDashboardActivityProps {
  recentActivity: RecentActivity[];
  isLoading?: boolean;
}

export default function AdminDashboardActivity({
  recentActivity,
  isLoading = false,
}: AdminDashboardActivityProps) {
  const t = useTranslations('admin');

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
              <Activity className="h-5 w-5" style={{ color: cssVars.status.warning }} />
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
      <h2 className="mb-4 text-2xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
        {t('dashboard.recentActivity.title')}
      </h2>
      <AdminDataTable
        data={recentActivity}
        columns={activityColumns}
        searchPlaceholder={t('dashboard.recentActivity.search')}
        isLoading={isLoading}
        emptyMessage={t('dashboard.recentActivity.empty')}
      />
    </div>
  );
}

