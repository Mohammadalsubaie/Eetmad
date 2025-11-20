'use client';

import { motion } from 'framer-motion';
import { Star, TrendingUp } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import { useTranslations } from 'next-intl';
import type { DashboardStats } from '@/lib/types';

interface AdminDashboardPerformanceProps {
  stats: DashboardStats;
}

export default function AdminDashboardPerformance({ stats }: AdminDashboardPerformanceProps) {
  const t = useTranslations('admin');

  return (
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
  );
}

