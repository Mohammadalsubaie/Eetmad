'use client';

import { useTranslations } from 'next-intl';
import { cssVars } from '@/styles/theme';
import TermsContent from '@/components/features/terms/TermsContent';

export default function TermsPage() {
  const t = useTranslations('pages.terms');

  return (
    <div
      className="container mx-auto py-8 px-4"
      style={{ backgroundColor: cssVars.neutral.bg, color: cssVars.neutral.textSecondary }}
    >
      <h1 className="text-4xl font-bold mb-8" style={{ color: cssVars.secondary.DEFAULT }}>
        {t('pageTitle')}
      </h1>
      <TermsContent />
    </div>
  );
}