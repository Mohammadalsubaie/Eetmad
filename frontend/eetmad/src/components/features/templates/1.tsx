'use client';

import { cssVars } from '@/styles/theme';
import { useTranslations } from 'next-intl';

export default function Template1() {
  const t = useTranslations('templates');

  return (
    <div
      className="flex min-h-screen items-center justify-center"
      style={{ backgroundColor: cssVars.neutral.bg }}
    >
      <div
        className="mx-auto max-w-4xl rounded-lg p-8 shadow-lg"
        style={{
          backgroundColor: cssVars.neutral.surface,
        }}
      >
        <h1 className="mb-4 text-3xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
          {t('template1.title')}
        </h1>
        <p style={{ color: cssVars.neutral.textSecondary }}>
          {t('template1.description')}
        </p>
      </div>
    </div>
  );
}

