'use client';

import { useTranslations } from 'next-intl';

export default function DisputesPage() {
  const t = useTranslations('pages');
  
  return (
    <div>
      <h1>{t('disputes.title')}</h1>
      {/* Disputes management will be implemented here */}
    </div>
  );
}
