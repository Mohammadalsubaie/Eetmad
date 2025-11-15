'use client';

import { useTranslations } from 'next-intl';

export default function EditRequestPage({ params }: { params: { id: string } }) {
  const t = useTranslations('pages');

  return (
    <div>
      <h1>{t('editRequest.title')}</h1>
      <p>
        {t('editRequest.id')}: {params.id}
      </p>
      {/* Edit request form will be implemented here */}
    </div>
  );
}
