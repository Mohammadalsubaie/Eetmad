'use client';

import { useTranslations } from 'next-intl';

export default function EditOfferPage({ params }: { params: { id: string } }) {
  const t = useTranslations('pages');

  return (
    <div>
      <h1>{t('editOffer.title')}</h1>
      <p>
        {t('editOffer.id')}: {params.id}
      </p>
      {/* Edit offer form will be implemented here */}
    </div>
  );
}
