'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import type { RequestFilters } from '@/lib/types/request.types';
import { useRequests, useMyRequests } from '@/lib/hooks/useRequests';
import RequestCard from './RequestCard';
import RequestFiltersComponent from './RequestFilters';
import RequestSearch from './RequestSearch';
import { EmptyState, LoadingSpinner, ErrorMessage } from '@/components/ui';
import { ResourceGrid } from '@/components/shared/data-display';

interface RequestsListProps {
  showMyRequests?: boolean;
  filters?: RequestFilters;
}

export default function RequestsList({ showMyRequests = false, filters }: RequestsListProps) {
  const t = useTranslations('pages.requests');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<RequestFilters>(filters || {});

  const combinedFilters = useMemo(
    () => ({
      ...activeFilters,
      ...(searchQuery && { search: searchQuery }),
    }),
    [activeFilters, searchQuery]
  );

  const { data: requests, isLoading, error } = showMyRequests
    ? useMyRequests(combinedFilters)
    : useRequests(combinedFilters);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (newFilters: RequestFilters) => {
    setActiveFilters(newFilters);
  };

  if (isLoading) {
    return <LoadingSpinner text={t('loading')} />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="space-y-4">
        <RequestSearch onSearch={handleSearch} />
        <RequestFiltersComponent filters={activeFilters} onFilterChange={handleFilterChange} />
      </div>

      {/* Requests Grid */}
      {requests.length === 0 ? (
        <EmptyState
          title={showMyRequests ? t('noMyRequests') : t('noRequests')}
          description={t('noRequestsDescription')}
        />
      ) : (
        <ResourceGrid columns={{ default: 1, md: 2, lg: 3 }}>
          {requests.map((request) => (
            <RequestCard key={request.id} request={request} />
          ))}
        </ResourceGrid>
      )}
    </div>
  );
}
