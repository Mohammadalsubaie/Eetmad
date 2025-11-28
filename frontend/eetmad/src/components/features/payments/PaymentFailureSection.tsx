'use client';

import { motion } from 'framer-motion';
import { XCircle } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import { useTranslations } from 'next-intl';
import type { Payment } from '@/lib/types/payment.types';

interface PaymentFailureSectionProps {
  payment: Payment;
}

export default function PaymentFailureSection({ payment }: PaymentFailureSectionProps) {
  const t = useTranslations('admin');

  if (!payment.failureReason) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="rounded-2xl border-2 border-l-4 p-6 shadow-md"
      style={{
        backgroundColor: cssVars.neutral.surface,
        borderColor: cssVars.neutral.border,
        borderLeftColor: cssVars.status.error,
      }}
    >
      <h3
        className="mb-4 flex items-center gap-2 text-lg font-bold"
        style={{ color: cssVars.status.error }}
      >
        <XCircle className="h-5 w-5" />
        {t('payments.detail.sections.failureReason')}
      </h3>
      <p style={{ color: cssVars.secondary.DEFAULT }}>{payment.failureReason}</p>
    </motion.div>
  );
}
