'use client';

import { useTranslations } from 'next-intl';

export default function SupplierDetailPage({ params }: { params: { id: string } }) {
  const t = useTranslations('pages');

  return (
    <div>
      <h1>{t('supplierProfile.title')}</h1>
      <p>
        {t('supplierProfile.id')}: {params.id}
      </p>
      {/* Supplier profile will be implemented here */}
    </div>
  );
}
