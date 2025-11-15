'use client';

import { useTranslations } from 'next-intl';

export default function AdminSettingsPage() {
  const t = useTranslations('pages');
  
  return (
    <div>
      <h1>{t('systemSettings.title')}</h1>
      {/* System settings will be implemented here */}
    </div>
  );
}
