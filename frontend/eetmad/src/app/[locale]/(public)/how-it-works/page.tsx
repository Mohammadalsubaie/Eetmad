'use client';

import { useTranslations } from 'next-intl';

export default function HowItWorksPage() {
  const t = useTranslations('pages');

  return (
    <div>
      <h1>{t('howItWorks.title')}</h1>
      {/* How it works content will be implemented here */}
    </div>
  );
}
