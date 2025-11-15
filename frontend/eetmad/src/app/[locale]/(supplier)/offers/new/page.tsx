'use client';

import { useTranslations } from 'next-intl';

export default function NewOfferPage() {
  const t = useTranslations('pages');
  
  return (
    <div>
      <h1>{t('createOffer.title')}</h1>
      {/* Offer form will be implemented here */}
    </div>
  );
}
