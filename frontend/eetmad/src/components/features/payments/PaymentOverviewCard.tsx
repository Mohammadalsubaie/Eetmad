'use client';

import { motion } from 'framer-motion';
import { CreditCard, TrendingUp } from 'lucide-react';
import SaudiRiyalIcon from '@/components/shared/icons/SaudiRiyalIcon';
import CurrencyDisplay from '@/components/shared/CurrencyDisplay';
import { cssVars } from '@/styles/theme';
import { useTranslations } from 'next-intl';
import StatusBadge from '@/components/shared/badges/StatusBadge';
import type { Payment } from '@/lib/types/payment.types';

interface PaymentOverviewCardProps {
  payment: Payment;
}

export default function PaymentOverviewCard({ payment }: PaymentOverviewCardProps) {
  const t = useTranslations('admin');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6 rounded-2xl border-2 p-6 shadow-md"
      style={{
        backgroundColor: cssVars.neutral.surface,
        borderColor: cssVars.neutral.border,
      }}
    >
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div
            className="flex h-16 w-16 items-center justify-center rounded-2xl"
            style={{
              backgroundColor: `color-mix(in srgb, ${cssVars.status.success} 15%, transparent)`,
            }}
          >
            <CreditCard className="h-8 w-8" style={{ color: cssVars.status.success }} />
          </div>
          <div>
            <h2 className="text-2xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
              {payment.transactionId}
            </h2>
            <div className="mt-1">
              <StatusBadge
                status={payment.status}
                labels={{
                  pending: t('payments.statuses.pending'),
                  processing: t('payments.statuses.processing'),
                  completed: t('payments.statuses.completed'),
                  failed: t('payments.statuses.failed'),
                  cancelled: t('payments.statuses.cancelled'),
                  refunded: t('payments.statuses.refunded'),
                }}
              />
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
            <CurrencyDisplay amount={payment.amount} iconSize={24} />
          </div>
          <div className="text-sm" style={{ color: cssVars.neutral.textSecondary }}>
            {t('payments.detail.totalAmount')}
          </div>
        </div>
      </div>

      {/* Payment Details Grid */}
      <div
        className="grid gap-6 border-t pt-6 sm:grid-cols-2 lg:grid-cols-3"
        style={{ borderColor: cssVars.neutral.border }}
      >
        <div>
          <div className="mb-2 text-xs font-semibold" style={{ color: cssVars.neutral.textMuted }}>
            {t('payments.detail.netAmount')}
          </div>
          <CurrencyDisplay
              amount={payment.netAmount}
              className="text-xl font-bold"
              iconSize={20}
            />
          </div>
        </div>

        <div>
          <div className="mb-2 text-xs font-semibold" style={{ color: cssVars.neutral.textMuted }}>
            {t('payments.detail.platformFee')}
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" style={{ color: cssVars.status.warning }} />
            <CurrencyDisplay
              amount={payment.platformFee}
              className="text-xl font-bold"
              iconSize={20}
            />
          </div>
        </div>

        <div>
          <div className="mb-2 text-xs font-semibold" style={{ color: cssVars.neutral.textMuted }}>
            {t('payments.detail.paymentMethod')}
          </div>
          <div className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" style={{ color: cssVars.primary.DEFAULT }} />
            <span className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
              {t(`payments.methods.${payment.paymentMethod}`)}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
