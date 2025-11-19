'use client';

import { motion } from 'framer-motion';
import { cssVars } from '@/styles/theme';
import { useTranslations } from 'next-intl';
import type { DashboardStatistics as DashboardStatisticsType } from '@/lib/api/dashboard';

interface DashboardStatisticsProps {
  statistics: DashboardStatisticsType;
}

export default function DashboardStatistics({ statistics }: DashboardStatisticsProps) {
  const t = useTranslations('pages.dashboard');

  return (
    <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Requests Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-2xl border-2 p-6"
        style={{
          backgroundColor: cssVars.neutral.surface,
          borderColor: cssVars.neutral.border,
        }}
      >
        <h2 className="mb-4 text-xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
          {t('sections.requests.title')}
        </h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span style={{ color: cssVars.neutral.textSecondary }}>
              {t('sections.requests.total')}
            </span>
            <span className="font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
              {statistics.requests.total}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span style={{ color: cssVars.neutral.textSecondary }}>
              {t('sections.requests.active')}
            </span>
            <span className="font-bold" style={{ color: cssVars.status.info }}>
              {statistics.requests.active}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span style={{ color: cssVars.neutral.textSecondary }}>
              {t('sections.requests.closed')}
            </span>
            <span className="font-bold" style={{ color: cssVars.neutral.textSecondary }}>
              {statistics.requests.closed}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span style={{ color: cssVars.neutral.textSecondary }}>
              {t('sections.requests.pending')}
            </span>
            <span className="font-bold" style={{ color: cssVars.status.warning }}>
              {statistics.requests.pending}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Projects Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-2xl border-2 p-6"
        style={{
          backgroundColor: cssVars.neutral.surface,
          borderColor: cssVars.neutral.border,
        }}
      >
        <h2 className="mb-4 text-xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
          {t('sections.projects.title')}
        </h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span style={{ color: cssVars.neutral.textSecondary }}>
              {t('sections.projects.total')}
            </span>
            <span className="font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
              {statistics.projects.total}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span style={{ color: cssVars.neutral.textSecondary }}>
              {t('sections.projects.active')}
            </span>
            <span className="font-bold" style={{ color: cssVars.status.info }}>
              {statistics.projects.active}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span style={{ color: cssVars.neutral.textSecondary }}>
              {t('sections.projects.completed')}
            </span>
            <span className="font-bold" style={{ color: cssVars.status.success }}>
              {statistics.projects.completed}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span style={{ color: cssVars.neutral.textSecondary }}>
              {t('sections.projects.cancelled')}
            </span>
            <span className="font-bold" style={{ color: cssVars.status.error }}>
              {statistics.projects.cancelled}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

