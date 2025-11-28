'use client';

import { useState, useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { cssVars } from '@/styles/theme';
import { SectionHeader, LoadingSpinner, ErrorMessage, EmptyState } from '@/components/ui';
import { useSuppliers } from '@/lib/hooks/useSupplier';
import { Users } from 'lucide-react';
import SupplierSearchBar from '@/components/features/suppliers/SupplierSearchBar';
import SupplierCard from '@/components/features/suppliers/SupplierCard';

export default function SuppliersPage() {
  const t = useTranslations('pages.suppliers');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const [searchQuery, setSearchQuery] = useState('');
  const { suppliers, isLoading, error } = useSuppliers();

  const filteredSuppliers = useMemo(() => {
    if (!searchQuery) return suppliers;
    const query = searchQuery.toLowerCase();
    return suppliers.filter((supplier) => {
      return (
        supplier.serviceDescription?.toLowerCase().includes(query) ||
        supplier.categories?.some(
          (cat) =>
            cat.category?.nameAr?.toLowerCase().includes(query) ||
            cat.category?.nameEn?.toLowerCase().includes(query)
        )
      );
    });
  }, [suppliers, searchQuery]);

  return (
    <div
      className="relative min-h-screen py-20"
      style={{
        backgroundColor: cssVars.neutral.bg,
      }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute start-0 top-1/4 h-96 w-96 rounded-full blur-3xl"
          style={{ background: cssVars.accent.primary }}
        />
        <div
          className="absolute bottom-1/4 end-0 h-96 w-96 rounded-full blur-3xl"
          style={{ background: cssVars.primary.DEFAULT }}
        />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <SectionHeader
            badge={t('badge') || 'Suppliers'}
            title={t('title') || 'Suppliers'}
            subtitle={t('subtitle') || 'Browse our verified suppliers'}
            variant="light"
            align={isRTL ? 'right' : 'left'}
            badgeColor="warm"
            className="max-w-3xl"
          />
        </div>

        <SupplierSearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <LoadingSpinner size="lg" />
          </div>
        )}

        {error && !isLoading && (
          <ErrorMessage
            error={error.message || t('error') || 'Failed to load suppliers'}
            variant="banner"
          />
        )}

        {!isLoading && !error && (
          <>
            {filteredSuppliers.length === 0 ? (
              <EmptyState
                icon={Users}
                title={t('noSuppliers') || 'No suppliers found'}
                description={
                  searchQuery
                    ? t('noResults') || 'Try adjusting your search'
                    : t('emptyState') || 'No suppliers available'
                }
              />
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredSuppliers.map((supplier, index) => (
                  <SupplierCard key={supplier.id} supplier={supplier} index={index} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
