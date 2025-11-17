'use client';

import TermsContent from '@/components/features/terms/TermsContent';
import { cssVars } from '@/styles/theme';
import { useTranslations } from 'next-intl';

export default function TermsPage() {
  const t = useTranslations('pages.terms');

  return (
    <div
      className="container mx-auto px-4 py-8"
      style={{ backgroundColor: cssVars.neutral.bg, color: cssVars.neutral.textSecondary }}
    >
      <h1 className="mb-8 text-4xl font-bold" style={{ color: cssVars.primary.DEFAULT }}>
        {t('pageTitle')}
      </h1>
      <TermsContent />
    </div>
  );
}
