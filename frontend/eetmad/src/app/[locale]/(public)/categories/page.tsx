'use client';

import { useTranslations } from 'next-intl';

export default function CategoriesPage() {
  const t = useTranslations('pages');

  return (
    <div>
      <h1>{t('categories.title')}</h1>
      {/* Categories list will be implemented here */}
    </div>
  );
}
