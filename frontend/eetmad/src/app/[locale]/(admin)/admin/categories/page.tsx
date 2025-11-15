'use client';

import { useTranslations } from 'next-intl';

export default function CategoriesManagementPage() {
  const t = useTranslations('pages');
  
  return (
    <div>
      <h1>{t('categoryManagement.title')}</h1>
      {/* Category management will be implemented here */}
    </div>
  );
}
