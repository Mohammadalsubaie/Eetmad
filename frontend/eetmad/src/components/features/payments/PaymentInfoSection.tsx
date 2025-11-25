'use client';

import { motion } from 'framer-motion';
import { Info } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import { useTranslations } from 'next-intl';
import SaudiRiyalIcon from '@/components/shared/icons/SaudiRiyalIcon';
import type { Payment } from '@/lib/types/payment.types';

interface PaymentInfoSectionProps {
  payment: Payment;
}

export default function PaymentInfoSection({ payment }: PaymentInfoSectionProps) {
  const t = useTranslations('admin');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="rounded-2xl border-2 p-6 shadow-md"
      style={{
        backgroundColor: cssVars.neutral.surface,
        borderColor: cssVars.neutral.border,
      }}
    >
      <h3
        className="mb-4 flex items-center gap-2 text-lg font-bold"
        style={{ color: cssVars.secondary.DEFAULT }}
      >
        <Info className="h-5 w-5" />
        {t('payments.detail.sections.paymentInfo')}
      </h3>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span style={{ color: cssVars.neutral.textSecondary }}>
            {t('payments.detail.paymentType')}
          </span>
          <span className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
            {t(`payments.types.${payment.paymentType}`)}
          </span>
        </div>
        <div className="flex justify-between">
          <span style={{ color: cssVars.neutral.textSecondary }}>
            {t('payments.detail.paymentStage')}
          </span>
          <span className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
            {t(`payments.stages.${payment.paymentStage}`)}
          </span>
        </div>
        <div className="flex justify-between">
          <span style={{ color: cssVars.neutral.textSecondary }}>
            {t('payments.detail.gateway')}
          </span>
          <span className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
            {payment.paymentGateway}
          </span>
        </div>
        <div className="flex justify-between">
          <span style={{ color: cssVars.neutral.textSecondary }}>
            {t('payments.detail.currency')}
          </span>
          <span className="font-semibold inline-flex items-center gap-1" style={{ color: cssVars.secondary.DEFAULT }}>
            <SaudiRiyalIcon width={16} height={16} />
          </span>
        </div>
      </div>
    </motion.div>
  );
}
