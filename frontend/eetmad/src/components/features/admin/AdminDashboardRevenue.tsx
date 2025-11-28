'use client';

import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import SaudiRiyalIcon from '@/components/shared/icons/SaudiRiyalIcon';
import CurrencyDisplay from '@/components/shared/CurrencyDisplay';
import { cssVars } from '@/styles/theme';
import { useTranslations } from 'next-intl';
import type { DashboardStats } from '@/lib/types';

interface AdminDashboardRevenueProps {
  stats: DashboardStats;
}

export default function AdminDashboardRevenue({ stats }: AdminDashboardRevenueProps) {
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
              backgroundColor: `color-mix(in srgb, ${cssVars.status.success} 15%, transparent)`,
            }}
          >
            <SaudiRiyalIcon
              className="h-6 w-6"
              style={{ color: cssVars.status.success }}
              width={24}
              height={24}
            />
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
        <CurrencyDisplay amount={stats.totalRevenue} iconSize={32} />
      </div>
      <div className="mt-2 text-sm" style={{ color: cssVars.neutral.textSecondary }}>
        {t('dashboard.revenue.comparison')}
      </div>
    </motion.div>
  );
}
