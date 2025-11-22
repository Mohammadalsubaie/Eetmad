'use client';

import { useTranslations } from 'next-intl';
import { useContracts } from '@/lib/hooks/useContracts';
import ContractCard from './ContractCard';
import { EmptyState, LoadingSpinner, ErrorMessage } from '@/components/ui';
import { ResourceGrid } from '@/components/shared/data-display';

interface ContractsListProps {
  projectId?: string;
}

export default function ContractsList({ projectId }: ContractsListProps) {
  const t = useTranslations('pages.contracts');
  const { data: contracts, isLoading, error } = useContracts(
    projectId ? { projectId } : undefined
  );

  if (isLoading) {
    return <LoadingSpinner text={t('loading')} />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <div className="space-y-6">
      {contracts.length === 0 ? (
        <EmptyState
          title={t('noContracts')}
          description={t('noContractsDescription')}
        />
      ) : (
        <ResourceGrid columns={{ default: 1, md: 2, lg: 3 }}>
          {contracts.map((contract) => (
            <ContractCard key={contract.id} contract={contract} />
          ))}
        </ResourceGrid>
      )}
    </div>
  );
}

