'use client';

import { useTranslations } from 'next-intl';

export default function AnalyticsPage() {
  const t = useTranslations('pages');

  return (
    <div>
      <h1>{t('analytics.title')}</h1>
      {/* Analytics dashboard will be implemented here */}
    </div>
  );
}
