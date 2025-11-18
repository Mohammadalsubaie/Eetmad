'use client';

import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function DisputeDetailPage() {
  const params = useParams();
  const t = useTranslations('pages');
  const disputeId = params.id as string;

  return (
    <div>
      <h1>{t('disputeDetails.title')}</h1>
      <p>
        {t('disputeDetails.id')}: {disputeId}
      </p>
      {/* Dispute details will be implemented here */}
    </div>
  );
}
