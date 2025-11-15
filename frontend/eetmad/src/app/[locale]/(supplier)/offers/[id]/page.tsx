'use client';

import { useTranslations } from 'next-intl';

export default function OfferDetailPage({ params }: { params: { id: string } }) {
  const t = useTranslations('pages');

  return (
    <div>
      <h1>{t('offerDetails.title')}</h1>
      <p>
        {t('offerDetails.id')}: {params.id}
      </p>
      {/* Offer details will be implemented here */}
    </div>
  );
}
