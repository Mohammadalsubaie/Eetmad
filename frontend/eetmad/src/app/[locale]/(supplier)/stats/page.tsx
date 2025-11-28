'use client';

import { useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { TrendingUp, CheckCircle2, Star, Package, Award } from 'lucide-react';
import SaudiRiyalIcon from '@/components/shared/icons/SaudiRiyalIcon';
import CurrencyDisplay from '@/components/shared/CurrencyDisplay';
import { cssVars } from '@/styles/theme';
import { useSupplierStatistics } from '@/lib/hooks/useSupplier';
import { LoadingSpinner, ErrorMessage } from '@/components/ui';
import StatCard from '@/components/shared/cards/StatCard';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';

interface SupplierStats {
  totalOffers: number;
  acceptedOffers: number;
  totalProjects: number;
  completedProjects: number;
  totalEarnings: number;
  averageRating: number;
}

export default function StatsPage() {
  const t = useTranslations('pages.stats');
  const locale = useLocale();
  const { stats, isLoading, error } = useSupplierStatistics();

  const { acceptanceRate, completionRate } = useMemo(() => {
    if (!stats) return { acceptanceRate: 0, completionRate: 0 };
    const acceptance =
      stats.totalOffers > 0 ? Math.round((stats.acceptedOffers / stats.totalOffers) * 100) : 0;
    const completion =
      stats.totalProjects > 0
        ? Math.round((stats.completedProjects / stats.totalProjects) * 100)
        : 0;
    return { acceptanceRate: acceptance, completionRate: completion };
  }, [stats]);

  if (isLoading) {
    return (
      <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
        <Breadcrumbs items={[{ label: t('title') }]} className="mb-6" />
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
        <Breadcrumbs items={[{ label: t('title') }]} className="mb-6" />
        <ErrorMessage error={error?.message || t('fetchError')} variant="banner" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
      <Breadcrumbs items={[{ label: t('title') }]} className="mb-6" />
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
          {t('title')}
        </h1>
        <p className="text-base" style={{ color: cssVars.neutral.textSecondary }}>
          {t('subtitle')}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <StatCard
          icon={SaudiRiyalIcon}
          label={t('totalEarnings')}
          value={<CurrencyDisplay amount={stats.totalEarnings} iconSize={16} />}
        />
        <StatCard icon={Package} label={t('totalOffers')} value={stats.totalOffers.toString()} />
        <StatCard
          icon={CheckCircle2}
          label={t('acceptedOffers')}
          value={stats.acceptedOffers.toString()}
          trend={{
            value: acceptanceRate,
            isPositive: acceptanceRate >= 50,
          }}
        />
        <StatCard icon={Award} label={t('totalProjects')} value={stats.totalProjects.toString()} />
        <StatCard
          icon={TrendingUp}
          label={t('completedProjects')}
          value={stats.completedProjects.toString()}
          trend={{
            value: completionRate,
            isPositive: completionRate >= 70,
          }}
        />
        <StatCard icon={Star} label={t('averageRating')} value={stats.averageRating.toFixed(1)} />
      </div>
    </div>
  );
}
