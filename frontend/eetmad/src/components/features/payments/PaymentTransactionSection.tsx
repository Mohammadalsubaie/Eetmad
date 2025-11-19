'use client';

import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import { useTranslations } from 'next-intl';
import type { Payment } from '@/lib/types/payment.types';

interface PaymentTransactionSectionProps {
  payment: Payment;
}

export default function PaymentTransactionSection({ payment }: PaymentTransactionSectionProps) {
  const t = useTranslations('admin');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
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
        <FileText className="h-5 w-5" />
        {t('payments.detail.sections.transactionInfo')}
      </h3>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span style={{ color: cssVars.neutral.textSecondary }}>
            {t('payments.detail.createdAt')}
          </span>
          <span className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
            {new Date(payment.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        </div>
        {payment.completedAt && (
          <div className="flex justify-between">
            <span style={{ color: cssVars.neutral.textSecondary }}>
              {t('payments.detail.completedAt')}
            </span>
            <span className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
              {new Date(payment.completedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
        )}
        <div className="flex justify-between">
          <span style={{ color: cssVars.neutral.textSecondary }}>
            {t('payments.detail.ipAddress')}
          </span>
          <span className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
            {payment.ipAddress}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

