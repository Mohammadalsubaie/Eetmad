'use client';

import { useParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { Star, CheckCircle2, Clock, Package, Award, Calendar, MapPin } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import { useSupplier } from '@/lib/hooks/useSuppliers';
import { LoadingSpinner, ErrorMessage } from '@/components/ui';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';
import { Badge } from '@/components/ui';
import { useReviewsBySupplier } from '@/lib/hooks/useReviews';
import ReviewsList from '@/components/features/reviews/ReviewsList';

export default function SupplierDetailPage() {
  const params = useParams();
  const locale = useLocale();
  const id = params.id as string;
  const t = useTranslations('pages.suppliers');
  const { data: supplier, isLoading, error } = useSupplier(id);
  const { data: reviews } = useReviewsBySupplier(id);

  if (isLoading) {
    return (
      <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
        <Breadcrumbs
          items={[{ label: t('title'), href: `/${locale}/suppliers` }, { label: id }]}
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
          items={[{ label: t('title'), href: `/${locale}/suppliers` }, { label: id }]}
          className="mb-6"
        />
        <ErrorMessage error={error?.message || t('supplierNotFound')} variant="banner" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
      <Breadcrumbs
        items={[{ label: t('title'), href: `/${locale}/suppliers` }, { label: supplier.id }]}
        className="mb-6"
      />

      {/* Header */}
      <div className="mb-8">
        <div className="mb-4 flex items-center gap-2">
          {supplier.isVerified && (
            <Badge
              style={{
                backgroundColor: `color-mix(in srgb, ${cssVars.status.success} 15%, transparent)`,
                color: cssVars.status.success,
                borderColor: cssVars.status.success,
              }}
            >
              <CheckCircle2 className="mr-1 h-3 w-3" />
              {t('verified')}
            </Badge>
          )}
        </div>
        <h1 className="mb-2 text-4xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
          {t('supplierProfile')}
        </h1>
        <p className="text-base" style={{ color: cssVars.neutral.textSecondary }}>
          {supplier.serviceDescription}
        </p>
      </div>

      {/* Statistics */}
      <div className="mb-8 grid gap-4 md:grid-cols-4">
        <div
          className="rounded-2xl border-2 p-6"
          style={{
            backgroundColor: cssVars.neutral.surface,
            borderColor: cssVars.neutral.border,
          }}
        >
          <div className="mb-2 flex items-center gap-2">
            <Star className="h-5 w-5" style={{ color: cssVars.status.warning }} />
            <span className="text-sm font-semibold" style={{ color: cssVars.neutral.textMuted }}>
              {t('responseTime')}
            </span>
          </div>
          <p className="text-2xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
            {supplier.responseTime} {t('minutes')}
          </p>
        </div>
        <div
          className="rounded-2xl border-2 p-6"
          style={{
            backgroundColor: cssVars.neutral.surface,
            borderColor: cssVars.neutral.border,
          }}
        >
          <div className="mb-2 flex items-center gap-2">
            <Package className="h-5 w-5" style={{ color: cssVars.primary.DEFAULT }} />
            <span className="text-sm font-semibold" style={{ color: cssVars.neutral.textMuted }}>
              {t('acceptanceRate')}
            </span>
          </div>
          <p className="text-2xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
            {supplier.acceptanceRate}%
          </p>
        </div>
        <div
          className="rounded-2xl border-2 p-6"
          style={{
            backgroundColor: cssVars.neutral.surface,
            borderColor: cssVars.neutral.border,
          }}
        >
          <div className="mb-2 flex items-center gap-2">
            <Clock className="h-5 w-5" style={{ color: cssVars.status.info }} />
            <span className="text-sm font-semibold" style={{ color: cssVars.neutral.textMuted }}>
              {t('onTimeDelivery')}
            </span>
          </div>
          <p className="text-2xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
            {supplier.onTimeDelivery}%
          </p>
        </div>
        <div
          className="rounded-2xl border-2 p-6"
          style={{
            backgroundColor: cssVars.neutral.surface,
            borderColor: cssVars.neutral.border,
          }}
        >
          <div className="mb-2 flex items-center gap-2">
            <Award className="h-5 w-5" style={{ color: cssVars.status.success }} />
            <span className="text-sm font-semibold" style={{ color: cssVars.neutral.textMuted }}>
              {t('portfolioItems')}
            </span>
          </div>
          <p className="text-2xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
            {supplier.portfolio?.length || 0}
          </p>
        </div>
      </div>

      {/* Categories */}
      {supplier.categories && supplier.categories.length > 0 && (
        <div
          className="mb-8 rounded-2xl border-2 p-6"
          style={{
            backgroundColor: cssVars.neutral.surface,
            borderColor: cssVars.neutral.border,
          }}
        >
          <h2 className="mb-4 text-xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
            {t('categories')}
          </h2>
          <div className="flex flex-wrap gap-2">
            {supplier.categories.map(
              (cat: {
                id: string;
                category?: { nameEn?: string };
                categoryId: string;
                isPrimary: boolean;
              }) => (
                <Badge
                  key={cat.id}
                  style={{
                    backgroundColor: cat.isPrimary
                      ? `color-mix(in srgb, ${cssVars.primary.DEFAULT} 15%, transparent)`
                      : `color-mix(in srgb, ${cssVars.neutral.border} 15%, transparent)`,
                    color: cat.isPrimary ? cssVars.primary.DEFAULT : cssVars.neutral.textSecondary,
                    borderColor: cat.isPrimary ? cssVars.primary.DEFAULT : cssVars.neutral.border,
                  }}
                >
                  {cat.category?.nameEn || cat.categoryId}
                  {cat.isPrimary && ` (${t('primary')})`}
                </Badge>
              )
            )}
          </div>
        </div>
      )}

      {/* Portfolio */}
      {supplier.portfolio && supplier.portfolio.length > 0 && (
        <div
          className="mb-8 rounded-2xl border-2 p-6"
          style={{
            backgroundColor: cssVars.neutral.surface,
            borderColor: cssVars.neutral.border,
          }}
        >
          <h2 className="mb-4 text-xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
            {t('portfolio')}
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {supplier.portfolio
              .slice(0, 6)
              .map(
                (item: { id: string; images?: string[]; title: string; description: string }) => (
                  <div
                    key={item.id}
                    className="overflow-hidden rounded-xl border-2"
                    style={{ borderColor: cssVars.neutral.border }}
                  >
                    {item.images && item.images.length > 0 && (
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="h-48 w-full object-cover"
                      />
                    )}
                    <div className="p-4">
                      <h3 className="mb-1 font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                        {item.title}
                      </h3>
                      <p className="text-sm" style={{ color: cssVars.neutral.textSecondary }}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                )
              )}
          </div>
        </div>
      )}

      {/* Certifications */}
      {supplier.certifications && supplier.certifications.length > 0 && (
        <div
          className="mb-8 rounded-2xl border-2 p-6"
          style={{
            backgroundColor: cssVars.neutral.surface,
            borderColor: cssVars.neutral.border,
          }}
        >
          <h2 className="mb-4 text-xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
            {t('certifications')}
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {supplier.certifications.map(
              (cert: {
                id: string;
                name: string;
                issuer: string;
                issuedAt: string;
                expiryDate: string | null;
                fileUrl: string;
              }) => (
                <div
                  key={cert.id}
                  className="rounded-lg border-2 p-4"
                  style={{ borderColor: cssVars.neutral.border }}
                >
                  <h3 className="mb-1 font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                    {cert.name}
                  </h3>
                  <p className="text-sm" style={{ color: cssVars.neutral.textMuted }}>
                    {t('issuedBy')}: {cert.issuer}
                  </p>
                  <p className="text-xs" style={{ color: cssVars.neutral.textMuted }}>
                    {t('issuedAt')}: {new Date(cert.issuedAt).toLocaleDateString()}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      )}

      {/* Reviews */}
      <div
        className="rounded-2xl border-2 p-6"
        style={{
          backgroundColor: cssVars.neutral.surface,
          borderColor: cssVars.neutral.border,
        }}
      >
        <h2 className="mb-4 text-xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
          {t('reviews')}
        </h2>
        <ReviewsList supplierId={id} />
      </div>
    </div>
  );
}
