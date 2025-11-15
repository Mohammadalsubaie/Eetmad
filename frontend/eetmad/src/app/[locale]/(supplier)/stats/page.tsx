'use client';

import { useTranslations } from 'next-intl';

export default function StatsPage() {
  const t = useTranslations('pages');
  
  return (
    <div>
      <h1>{t('statistics.title')}</h1>
      {/* Statistics dashboard will be implemented here */}
    </div>
  );
}
