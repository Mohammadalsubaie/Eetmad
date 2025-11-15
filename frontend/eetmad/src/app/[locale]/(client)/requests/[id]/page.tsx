'use client';

import { useTranslations } from 'next-intl';

export default function RequestDetailPage({ params }: { params: { id: string } }) {
  const t = useTranslations('pages');
  
  return (
    <div>
      <h1>{t('requestDetails.title')}</h1>
      <p>{t('requestDetails.id')}: {params.id}</p>
      {/* Request details will be implemented here */}
    </div>
  );
}
