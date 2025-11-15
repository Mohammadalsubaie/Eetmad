'use client';

import { useTranslations } from 'next-intl';

export default function SupplierSetupPage() {
  const t = useTranslations('pages');
  
  return (
    <div>
      <h1>{t('supplierSetup.title')}</h1>
      {/* Supplier setup form will be implemented here */}
    </div>
  );
}
