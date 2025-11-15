'use client';

import { useTranslations } from 'next-intl';

export default function OffersPage() {
  const t = useTranslations('pages');
  
  return (
    <div>
      <h1>{t('myOffers.title')}</h1>
      {/* Offers list will be implemented here */}
    </div>
  );
}
