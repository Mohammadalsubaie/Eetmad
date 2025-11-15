'use client';

import { useTranslations } from 'next-intl';

export default function RequestOffersPage({ params }: { params: { id: string } }) {
  const t = useTranslations('pages');
  
  return (
    <div>
      <h1>{t('requestOffers.title')}</h1>
      <p>{t('requestOffers.id')}: {params.id}</p>
      {/* Offers list will be implemented here */}
    </div>
  );
}
