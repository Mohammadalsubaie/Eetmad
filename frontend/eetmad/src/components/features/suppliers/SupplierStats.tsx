'use client';

import { motion } from 'framer-motion';
import { Clock, TrendingUp } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import { useTranslations } from 'next-intl';
import type { Supplier } from '@/lib/types/supplier.types';

interface SupplierStatsProps {
  supplier: Supplier;
}

export default function SupplierStats({ supplier }: SupplierStatsProps) {
  const t = useTranslations('pages.suppliers');

  return (
    <div className="mb-12 grid gap-6 md:grid-cols-3">
      {supplier.acceptanceRate !== undefined && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border-2 p-6"
          style={{
            backgroundColor: cssVars.neutral.surface,
            borderColor: cssVars.neutral.border,
          }}
        >
          <div className="mb-2 flex items-center gap-2">
            <TrendingUp className="h-5 w-5" style={{ color: cssVars.primary.DEFAULT }} />
            <span
              className="text-sm font-semibold"
              style={{ color: cssVars.neutral.textSecondary }}
            >
              {t('acceptanceRate') || 'Acceptance Rate'}
            </span>
          </div>
          <div className="text-3xl font-bold" style={{ color: cssVars.primary.DEFAULT }}>
            {supplier.acceptanceRate.toFixed(0)}%
          </div>
        </motion.div>
      )}

      {supplier.onTimeDelivery !== undefined && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border-2 p-6"
          style={{
            backgroundColor: cssVars.neutral.surface,
            borderColor: cssVars.neutral.border,
          }}
        >
          <div className="mb-2 flex items-center gap-2">
            <Clock className="h-5 w-5" style={{ color: cssVars.status.success }} />
            <span
              className="text-sm font-semibold"
              style={{ color: cssVars.neutral.textSecondary }}
            >
              {t('onTimeDelivery') || 'On-Time Delivery'}
            </span>
          </div>
          <div className="text-3xl font-bold" style={{ color: cssVars.status.success }}>
            {supplier.onTimeDelivery.toFixed(0)}%
          </div>
        </motion.div>
      )}

      {supplier.responseTime !== undefined && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl border-2 p-6"
          style={{
            backgroundColor: cssVars.neutral.surface,
            borderColor: cssVars.neutral.border,
          }}
        >
          <div className="mb-2 flex items-center gap-2">
            <Clock className="h-5 w-5" style={{ color: cssVars.primary.DEFAULT }} />
            <span
              className="text-sm font-semibold"
              style={{ color: cssVars.neutral.textSecondary }}
            >
              {t('responseTime') || 'Response Time'}
            </span>
          </div>
          <div className="text-3xl font-bold" style={{ color: cssVars.primary.DEFAULT }}>
            {supplier.responseTime}h
          </div>
        </motion.div>
      )}
    </div>
  );
}
