'use client';

import { useTranslations } from 'next-intl';

export default function SuppliersPage() {
  const t = useTranslations('pages');
  
  return (
    <div>
      <h1>{t('suppliers.title')}</h1>
      {/* Suppliers list will be implemented here */}
    </div>
  );
}
