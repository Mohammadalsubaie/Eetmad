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
  // Always call all hooks to avoid conditional hook calls
  const { data: allDisputes, isLoading: isLoadingAll, error: errorAll } = useDisputes();

  const {
    data: pendingDisputes,
    isLoading: isLoadingPending,
    error: errorPending,
  } = usePendingDisputes();

  const {
    data: resolvedDisputes,
    isLoading: isLoadingResolved,
    error: errorResolved,
  } = useResolvedDisputes();

  // Select data based on filter
  const disputes =
    filter === 'pending' ? pendingDisputes : filter === 'resolved' ? resolvedDisputes : allDisputes;
  const isLoading =
    filter === 'pending'
      ? isLoadingPending
      : filter === 'resolved'
        ? isLoadingResolved
        : isLoadingAll;
  const error =
    filter === 'pending' ? errorPending : filter === 'resolved' ? errorResolved : errorAll;

  if (isLoading) {
    return <LoadingSpinner text={t('loading')} />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <div className="space-y-6">
      {disputes.length === 0 ? (
        <EmptyState title={t('noDisputes')} description={t('noDisputesDescription')} />
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
