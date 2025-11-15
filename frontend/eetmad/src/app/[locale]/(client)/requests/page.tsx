'use client';

import { useTranslations } from 'next-intl';

export default function RequestsPage() {
  const t = useTranslations('pages');

  return (
    <div>
      <h1>{t('requests.title')}</h1>
      {/* Requests list will be implemented here */}
    </div>
  );
}
