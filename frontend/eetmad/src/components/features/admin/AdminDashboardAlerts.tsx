'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, Package } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import { useTranslations } from 'next-intl';
import type { DashboardStats } from '@/lib/types';

interface AdminDashboardAlertsProps {
  stats: DashboardStats;
}

export default function AdminDashboardAlerts({ stats }: AdminDashboardAlertsProps) {
  const t = useTranslations('admin');

  return (
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
            <div className="text-sm font-semibold" style={{ color: cssVars.neutral.textSecondary }}>
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
            <div className="text-sm font-semibold" style={{ color: cssVars.neutral.textSecondary }}>
              {t('dashboard.alerts.pendingVerifications')}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
