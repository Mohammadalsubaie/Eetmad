'use client';

import { useTranslations } from 'next-intl';

export default function AdminDashboardPage() {
  const t = useTranslations('pages');
  
  return (
    <div>
      <h1>{t('adminDashboard.title')}</h1>
      {/* Admin dashboard will be implemented here */}
    </div>
  );
}
