'use client';

import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import { useTranslations } from 'next-intl';
import type { Payment } from '@/lib/types/payment.types';

interface PaymentNotesSectionProps {
  payment: Payment;
}

export default function PaymentNotesSection({ payment }: PaymentNotesSectionProps) {
  const t = useTranslations('admin');

  if (!payment.notes) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
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
        {t('payments.detail.sections.notes')}
      </h3>
      <p style={{ color: cssVars.secondary.DEFAULT }}>{payment.notes}</p>
    </motion.div>
  );
}

