'use client';

import { motion } from 'framer-motion';
import { Activity, CheckCircle2, FileText, Package, TrendingUp, Wallet } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import { useTranslations } from 'next-intl';
import type { DashboardOverview } from '@/lib/api/dashboard';

interface DashboardOverviewStatsProps {
  overview: DashboardOverview;
}

export default function DashboardOverviewStats({ overview }: DashboardOverviewStatsProps) {
  const t = useTranslations('pages.dashboard');

  return (
    <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      <motion.div
        whileHover={{ y: -4 }}
        className="rounded-2xl border-2 p-6"
        style={{
          backgroundColor: cssVars.neutral.surface,
          borderColor: cssVars.neutral.border,
        }}
      >
        <div className="mb-4 flex items-center justify-between">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-xl"
            style={{
              backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 15%, transparent)`,
            }}
          >
            <FileText className="h-6 w-6" style={{ color: cssVars.primary.DEFAULT }} />
          </div>
          <TrendingUp className="h-5 w-5" style={{ color: cssVars.status.success }} />
        </div>
        <div className="mb-1 text-3xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
          {overview.totalRequests}
        </div>
        <div className="text-sm" style={{ color: cssVars.neutral.textSecondary }}>
          {t('stats.totalRequests')}
        </div>
      </motion.div>

      <motion.div
        whileHover={{ y: -4 }}
        className="rounded-2xl border-2 p-6"
        style={{
          backgroundColor: cssVars.neutral.surface,
          borderColor: cssVars.neutral.border,
        }}
      >
        <div className="mb-4 flex items-center justify-between">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-xl"
            style={{
              backgroundColor: `color-mix(in srgb, ${cssVars.accent.primary} 15%, transparent)`,
            }}
          >
            <Package className="h-6 w-6" style={{ color: cssVars.accent.primary }} />
          </div>
          <Activity className="h-5 w-5" style={{ color: cssVars.status.info }} />
        </div>
        <div className="mb-1 text-3xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
          {overview.activeProjects}
        </div>
        <div className="text-sm" style={{ color: cssVars.neutral.textSecondary }}>
          {t('stats.activeProjects')}
        </div>
      </motion.div>

      <motion.div
        whileHover={{ y: -4 }}
        className="rounded-2xl border-2 p-6"
        style={{
          backgroundColor: cssVars.neutral.surface,
          borderColor: cssVars.neutral.border,
        }}
      >
        <div className="mb-4 flex items-center justify-between">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-xl"
            style={{
              backgroundColor: `color-mix(in srgb, ${cssVars.status.success} 15%, transparent)`,
            }}
          >
            <CheckCircle2 className="h-6 w-6" style={{ color: cssVars.status.success }} />
          </div>
        </div>
        <div className="mb-1 text-3xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
          {overview.completedProjects}
        </div>
        <div className="text-sm" style={{ color: cssVars.neutral.textSecondary }}>
          {t('stats.completedProjects')}
        </div>
      </motion.div>

      <motion.div
        whileHover={{ y: -4 }}
        className="rounded-2xl border-2 p-6"
        style={{
          backgroundColor: cssVars.neutral.surface,
          borderColor: cssVars.neutral.border,
        }}
      >
        <div className="mb-4 flex items-center justify-between">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-xl"
            style={{
              backgroundColor: `color-mix(in srgb, ${cssVars.accent.warm} 15%, transparent)`,
            }}
          >
            <Wallet className="h-6 w-6" style={{ color: cssVars.accent.warm }} />
          </div>
        </div>
        <div className="mb-1 text-3xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
          {overview.walletBalance.toLocaleString()} {t('currency')}
        </div>
        <div className="text-sm" style={{ color: cssVars.neutral.textSecondary }}>
          {t('stats.walletBalance')}
        </div>
      </motion.div>
    </div>
  );
}
