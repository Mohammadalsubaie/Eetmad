'use client';

import { useTranslations } from 'next-intl';

export default function DashboardPage() {
  const t = useTranslations('pages');

  return (
    <div>
      <h1>{t('dashboard.title')}</h1>
      {/* Dashboard content will be implemented here */}
    </div>
  );
}
