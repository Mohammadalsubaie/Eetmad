'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { cssVars } from '@/styles/theme';
import { requestsApi } from '@/lib/api/requests';
import type { Request } from '@/lib/types/request.types';
import RequestCard from './RequestCard';
import RequestFilters from './RequestFilters';
import RequestSearch from './RequestSearch';
import EmptyState from '@/components/ui/EmptyState';

interface RequestsListProps {
  showMyRequests?: boolean;
  filters?: Record<string, any>;
}

export default function RequestsList({ showMyRequests = false, filters }: RequestsListProps) {
  const t = useTranslations('pages.requests');
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>(filters || {});

  useEffect(() => {
    fetchRequests();
  }, [showMyRequests, activeFilters]);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      setError(null);
      const params = {
        ...activeFilters,
        ...(searchQuery && { search: searchQuery }),
      };
      const data = showMyRequests
        ? await requestsApi.getMyRequests(params)
        : await requestsApi.getAll(params);
      setRequests(data);
    } catch (err) {
      console.error('Failed to fetch requests:', err);
      setError(t('fetchError'));
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Debounce search - fetch after user stops typing
    const timeoutId = setTimeout(() => {
      fetchRequests();
    }, 500);
    return () => clearTimeout(timeoutId);
  };

  const handleFilterChange = (newFilters: Record<string, any>) => {
    setActiveFilters(newFilters);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-lg font-medium" style={{ color: cssVars.neutral.textSecondary }}>
          {t('loading')}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="rounded-2xl border-2 p-8 text-center"
        style={{ borderColor: cssVars.status.error }}
      >
        <p style={{ color: cssVars.status.error }}>{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="space-y-4">
        <RequestSearch onSearch={handleSearch} />
        <RequestFilters filters={activeFilters} onFilterChange={handleFilterChange} />
      </div>

      {/* Requests Grid */}
      {requests.length === 0 ? (
        <EmptyState
          title={showMyRequests ? t('noMyRequests') : t('noRequests')}
          description={t('noRequestsDescription')}
        />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {requests.map((request) => (
            <RequestCard key={request.id} request={request} />
          ))}
        </div>
      )}
    </div>
  );
}
