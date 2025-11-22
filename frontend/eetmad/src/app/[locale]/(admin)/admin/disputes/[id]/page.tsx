'use client';

import { useParams } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';

export default function DisputeDetailPage() {
  const params = useParams();
  const tPages = useTranslations('pages');
  const locale = useLocale();
  const disputeId = params.id as string;

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: tPages('admin.title'), href: `/${locale}/admin` },
          { label: tPages('disputes.title'), href: `/${locale}/admin/disputes` },
          // TODO: Replace with actual data for id
          { label: '{id}' },
        ]}
        className="mb-6"
      />

      <h1>{tPages('disputeDetails.title')}</h1>
      <p>
        {tPages('disputeDetails.id')}: {disputeId}
      </p>
      {/* Dispute details will be implemented here */}
    </div>
  );
}
