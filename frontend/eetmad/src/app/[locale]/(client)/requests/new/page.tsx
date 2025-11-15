'use client';

import { useTranslations } from 'next-intl';

export default function NewRequestPage() {
  const t = useTranslations('pages');
  
  return (
    <div>
      <h1>{t('createRequest.title')}</h1>
      {/* Request form will be implemented here */}
    </div>
  );
}
