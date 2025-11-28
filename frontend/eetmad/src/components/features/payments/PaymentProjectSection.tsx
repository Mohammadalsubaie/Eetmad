'use client';

import { motion } from 'framer-motion';
import { Building2 } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import { useTranslations } from 'next-intl';
import type { Payment } from '@/lib/types/payment.types';

interface PaymentProjectSectionProps {
  payment: Payment;
}

export default function PaymentProjectSection({ payment }: PaymentProjectSectionProps) {
  const t = useTranslations('admin');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
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
        <Building2 className="h-5 w-5" />
        {t('payments.detail.sections.projectInfo')}
      </h3>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span style={{ color: cssVars.neutral.textSecondary }}>
            {t('payments.detail.projectId')}
          </span>
          <span className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
            {payment.projectId}
          </span>
        </div>
        {payment.milestoneId && (
          <div className="flex justify-between">
            <span style={{ color: cssVars.neutral.textSecondary }}>
              {t('payments.detail.milestoneId')}
            </span>
            <span className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
              {payment.milestoneId}
            </span>
          </div>
        )}
        <div className="flex justify-between">
          <span style={{ color: cssVars.neutral.textSecondary }}>
            {t('payments.detail.payerId')}
          </span>
          <span className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
            {payment.payerId}
          </span>
        </div>
        <div className="flex justify-between">
          <span style={{ color: cssVars.neutral.textSecondary }}>
            {t('payments.detail.receiverId')}
          </span>
          <span className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
            {payment.receiverId}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
