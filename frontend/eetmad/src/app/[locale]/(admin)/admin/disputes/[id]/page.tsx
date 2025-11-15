'use client';

import { useTranslations } from 'next-intl';

export default function DisputeDetailPage({ params }: { params: { id: string } }) {
  const t = useTranslations('pages');
  
  return (
    <div>
      <h1>{t('disputeDetails.title')}</h1>
      <p>{t('disputeDetails.id')}: {params.id}</p>
      {/* Dispute details will be implemented here */}
    </div>
  );
}
