'use client';

import { useTranslations } from 'next-intl';
import { useDisputes, usePendingDisputes, useResolvedDisputes } from '@/lib/hooks/useDisputes';
import DisputeCard from './DisputeCard';
import { EmptyState, LoadingSpinner, ErrorMessage } from '@/components/ui';
import { ResourceGrid } from '@/components/shared/data-display';

interface DisputesListProps {
  filter?: 'all' | 'pending' | 'resolved';
}

export default function DisputesList({ filter = 'all' }: DisputesListProps) {
  const t = useTranslations('pages.disputes');
  const { data: disputes, isLoading, error } =
    filter === 'pending'
      ? usePendingDisputes()
      : filter === 'resolved'
        ? useResolvedDisputes()
        : useDisputes();

  if (isLoading) {
    return <LoadingSpinner text={t('loading')} />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <div className="space-y-6">
      {disputes.length === 0 ? (
        <EmptyState
          title={t('noDisputes')}
          description={t('noDisputesDescription')}
        />
      ) : (
        <ResourceGrid columns={{ default: 1, md: 2, lg: 3 }}>
          {disputes.map((dispute) => (
            <DisputeCard key={dispute.id} dispute={dispute} />
          ))}
        </ResourceGrid>
      )}
    </div>
  );
}

