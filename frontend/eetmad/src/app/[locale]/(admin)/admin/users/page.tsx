'use client';

import { useTranslations } from 'next-intl';

export default function AdminUsersPage() {
  const t = useTranslations('pages');
  
  return (
    <div>
      <h1>{t('userManagement.title')}</h1>
      {/* User management will be implemented here */}
    </div>
  );
}
