'use client';

import { cssVars } from '@/styles/theme';
import { useTranslations } from 'next-intl';
import type { Project } from '@/lib/types/project.types';

interface ProjectPaymentInfoProps {
  project: Project;
}

export default function ProjectPaymentInfo({ project }: ProjectPaymentInfoProps) {
  const t = useTranslations('pages.projects');

  const formatCurrency = (amount: number) => {
    return `${amount.toLocaleString()} ${t('currency')}`;
  };

  return (
    <div
      className="rounded-2xl border-2 p-6"
      style={{
        backgroundColor: cssVars.neutral.surface,
        borderColor: cssVars.neutral.border,
      }}
    >
      <h3 className="mb-4 text-lg font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
        {t('paymentInfo')}
      </h3>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-sm" style={{ color: cssVars.neutral.textMuted }}>
            {t('depositAmount')}
          </span>
          <span className="text-sm font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
            {formatCurrency(project.depositAmount)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm" style={{ color: cssVars.neutral.textMuted }}>
            {t('finalAmount')}
          </span>
          <span className="text-sm font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
            {formatCurrency(project.finalAmount)}
          </span>
        </div>
      </div>
    </div>
  );
}
