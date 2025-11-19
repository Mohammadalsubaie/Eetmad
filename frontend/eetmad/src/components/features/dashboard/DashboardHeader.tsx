'use client';

import { cssVars } from '@/styles/theme';
import { useTranslations } from 'next-intl';

export default function DashboardHeader() {
  const t = useTranslations('pages.dashboard');

  return (
    <div className="mb-8">
      <h1 className="mb-2 text-4xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
        {t('title')}
      </h1>
      <p className="text-lg" style={{ color: cssVars.neutral.textSecondary }}>
        {t('subtitle')}
      </p>
    </div>
  );
}

