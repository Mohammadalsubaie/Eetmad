'use client';

import { useParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { Image as ImageIcon } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import { useSupplier } from '@/lib/hooks/useSuppliers';
import { LoadingSpinner, ErrorMessage, EmptyState } from '@/components/ui';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';
import { ResourceGrid } from '@/components/shared/data-display';

export default function SupplierPortfolioPage() {
  const params = useParams();
  const locale = useLocale();
  const id = params.id as string;
  const t = useTranslations('pages.suppliers');
  const { data: supplier, isLoading, error } = useSupplier(id);

  if (isLoading) {
    return (
      <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
        <Breadcrumbs
          items={[
            { label: t('title'), href: `/${locale}/suppliers` },
            { label: id, href: `/${locale}/suppliers/${id}` },
            { label: t('portfolio') },
          ]}
          className="mb-6"
        />
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  if (error || !supplier) {
    return (
      <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
        <Breadcrumbs
          items={[
            { label: t('title'), href: `/${locale}/suppliers` },
            { label: id, href: `/${locale}/suppliers/${id}` },
            { label: t('portfolio') },
          ]}
          className="mb-6"
        />
        <ErrorMessage error={error?.message || t('supplierNotFound')} variant="banner" />
      </div>
    );
  }

  const portfolio = supplier.portfolio || [];

  return (
    <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
      <Breadcrumbs
        items={[
          { label: t('title'), href: `/${locale}/suppliers` },
          { label: supplier.id, href: `/${locale}/suppliers/${id}` },
          { label: t('portfolio') },
        ]}
        className="mb-6"
      />

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
          {t('portfolio')}
        </h1>
        <p className="mt-2 text-base" style={{ color: cssVars.neutral.textSecondary }}>
          {t('portfolioDescription')}
        </p>
      </div>

      {/* Portfolio Items */}
      {portfolio.length === 0 ? (
        <EmptyState
          title={t('noPortfolioItems')}
          description={t('noPortfolioItemsDescription')}
        />
      ) : (
        <ResourceGrid columns={{ default: 1, md: 2, lg: 3 }}>
          {portfolio.map((item: { id: string; title: string; description: string; images?: string[]; category?: string; completedAt?: string }) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-2xl border-2 shadow-md transition-all hover:shadow-lg"
              style={{
                backgroundColor: cssVars.neutral.surface,
                borderColor: cssVars.neutral.border,
              }}
            >
              {item.images && item.images.length > 0 ? (
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="h-64 w-full object-cover"
                />
              ) : (
                <div
                  className="flex h-64 w-full items-center justify-center"
                  style={{ backgroundColor: cssVars.neutral.bg }}
                >
                  <ImageIcon className="h-12 w-12" style={{ color: cssVars.neutral.textMuted }} />
                </div>
              )}
              <div className="p-6">
                <h3 className="mb-2 text-xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                  {item.title}
                </h3>
                <p className="mb-4 text-sm leading-relaxed" style={{ color: cssVars.neutral.textSecondary }}>
                  {item.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold" style={{ color: cssVars.neutral.textMuted }}>
                    {item.category}
                  </span>
                  <span className="text-xs" style={{ color: cssVars.neutral.textMuted }}>
                    {item.completedAt ? new Date(item.completedAt).toLocaleDateString() : ''}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </ResourceGrid>
      )}
    </div>
  );
}

