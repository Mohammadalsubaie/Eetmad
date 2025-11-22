'use client';

import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Edit, CheckCircle2, Clock, Package, Award, Star } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import { useMySupplierProfile, useSupplierStatistics } from '@/lib/hooks/useSuppliers';
import { LoadingSpinner, ErrorMessage, Button } from '@/components/ui';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';
import { Badge } from '@/components/ui';

export default function MySupplierProfilePage() {
  const t = useTranslations('pages.suppliers');
  const locale = useLocale();
  const router = useRouter();
  const { data: profile, isLoading, error } = useMySupplierProfile();
  const { data: statistics } = useSupplierStatistics();

  if (isLoading) {
    return (
      <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
        <Breadcrumbs items={[{ label: t('myProfile') }]} className="mb-6" />
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
        <Breadcrumbs items={[{ label: t('myProfile') }]} className="mb-6" />
        <ErrorMessage error={error?.message || t('profileNotFound')} variant="banner" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
      <Breadcrumbs items={[{ label: t('myProfile') }]} className="mb-6" />

      {/* Header */}
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {profile.isVerified && (
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
          <Button
            onClick={() => router.push(`/${locale}/suppliers/me/edit`)}
            variant="outline"
            icon={Edit}
          >
            {t('edit')}
          </Button>
        </div>
        <h1 className="mb-2 text-4xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
          {t('myProfile')}
        </h1>
        <p className="text-base" style={{ color: cssVars.neutral.textSecondary }}>
          {profile.serviceDescription}
        </p>
      </div>

      {/* Statistics */}
      {statistics && (
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
                {t('averageRating')}
              </span>
            </div>
            <p className="text-2xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
              {statistics.averageRating?.toFixed(1) || '0.0'}
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
                {t('totalProjects')}
              </span>
            </div>
            <p className="text-2xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
              {statistics.totalProjects || 0}
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
                {t('totalEarnings')}
              </span>
            </div>
            <p className="text-2xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
              {statistics.totalEarnings?.toLocaleString() || '0'} {t('currency')}
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
                {t('responseTime')}
              </span>
            </div>
            <p className="text-2xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
              {profile.responseTime} {t('minutes')}
            </p>
          </div>
        </div>
      )}

      {/* Performance Metrics */}
      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <div
          className="rounded-2xl border-2 p-6"
          style={{
            backgroundColor: cssVars.neutral.surface,
            borderColor: cssVars.neutral.border,
          }}
        >
          <p className="mb-2 text-sm font-semibold" style={{ color: cssVars.neutral.textMuted }}>
            {t('acceptanceRate')}
          </p>
          <p className="text-3xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
            {profile.acceptanceRate}%
          </p>
        </div>
        <div
          className="rounded-2xl border-2 p-6"
          style={{
            backgroundColor: cssVars.neutral.surface,
            borderColor: cssVars.neutral.border,
          }}
        >
          <p className="mb-2 text-sm font-semibold" style={{ color: cssVars.neutral.textMuted }}>
            {t('onTimeDelivery')}
          </p>
          <p className="text-3xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
            {profile.onTimeDelivery}%
          </p>
        </div>
        <div
          className="rounded-2xl border-2 p-6"
          style={{
            backgroundColor: cssVars.neutral.surface,
            borderColor: cssVars.neutral.border,
          }}
        >
          <p className="mb-2 text-sm font-semibold" style={{ color: cssVars.neutral.textMuted }}>
            {t('portfolioItems')}
          </p>
          <p className="text-3xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
            {profile.portfolio?.length || 0}
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => router.push(`/${locale}/suppliers/${profile.id}/portfolio`)}
          className="rounded-2xl border-2 p-6 text-left transition-all hover:shadow-lg"
          style={{
            backgroundColor: cssVars.neutral.surface,
            borderColor: cssVars.neutral.border,
          }}
        >
          <h3 className="mb-2 text-lg font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
            {t('viewPortfolio')}
          </h3>
          <p className="text-sm" style={{ color: cssVars.neutral.textSecondary }}>
            {t('viewPortfolioDescription')}
          </p>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => router.push(`/${locale}/suppliers/me/edit`)}
          className="rounded-2xl border-2 p-6 text-left transition-all hover:shadow-lg"
          style={{
            backgroundColor: cssVars.neutral.surface,
            borderColor: cssVars.neutral.border,
          }}
        >
          <h3 className="mb-2 text-lg font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
            {t('editProfile')}
          </h3>
          <p className="text-sm" style={{ color: cssVars.neutral.textSecondary }}>
            {t('editProfileDescription')}
          </p>
        </motion.button>
      </div>
    </div>
  );
}

