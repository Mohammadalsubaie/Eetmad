'use client';

import { useTranslations } from 'next-intl';

export default function ReportsPage() {
  const t = useTranslations('pages');

  return (
    <div>
      <h1>{t('reports.title')}</h1>
      {/* Reports will be implemented here */}
    </div>
  );
}
