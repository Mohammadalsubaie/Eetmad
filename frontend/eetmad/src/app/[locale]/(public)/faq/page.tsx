'use client';

import { useTranslations } from 'next-intl';
import { cssVars } from '@/styles/theme';
import FAQList from '@/components/features/faq/FAQList';

export default function FAQPage() {
  const t = useTranslations('faq');

  return (
    <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
      <h1 className="text-4xl font-bold mb-8" style={{ color: cssVars.secondary.DEFAULT }}>
        {t('pageTitle')}
      </h1>
      <FAQList />
    </div>
  );
}
