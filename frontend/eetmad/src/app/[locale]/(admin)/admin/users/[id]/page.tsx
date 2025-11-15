'use client';

import { useTranslations } from 'next-intl';

export default function AdminUserDetailPage({ params }: { params: { id: string } }) {
  const t = useTranslations('pages');
  
  return (
    <div>
      <h1>{t('userDetails.title')}</h1>
      <p>{t('userDetails.id')}: {params.id}</p>
      {/* User details will be implemented here */}
    </div>
  );
}
