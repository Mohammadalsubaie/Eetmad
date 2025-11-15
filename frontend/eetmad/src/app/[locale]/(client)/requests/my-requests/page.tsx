'use client';

import { useTranslations } from 'next-intl';

export default function MyRequestsPage() {
  const t = useTranslations('pages');

  return (
    <div>
      <h1>{t('myRequests.title')}</h1>
      {/* My requests list will be implemented here */}
    </div>
  );
}
