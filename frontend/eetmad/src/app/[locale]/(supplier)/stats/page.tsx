'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { DollarSign, TrendingUp, CheckCircle2, Star, Package, Award } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import { suppliersApi } from '@/lib/api/suppliers';
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
  const tPages = useTranslations('pages');
  const locale = useLocale();
  const [stats, setStats] = useState<SupplierStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await suppliersApi.getStatistics();
      setStats(data);
    } catch (err) {
      console.error('Failed to fetch stats:', err);
      setError(t('fetchError'));
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const formatCurrency = (amount: number) => {
    return `${amount.toLocaleString()} ${t('currency')}`;
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
        <div className="flex items-center justify-center py-12">
          <div className="text-lg font-medium" style={{ color: cssVars.neutral.textSecondary }}>
            {t('loading')}
          </div>
        </div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
        <div
          className="rounded-2xl border-2 p-8 text-center"
          style={{ borderColor: cssVars.status.error }}
        >
          <p style={{ color: cssVars.status.error }}>{error || t('fetchError')}</p>
        </div>
      </div>
    );
  }

  const acceptanceRate =
    stats.totalOffers > 0 ? Math.round((stats.acceptedOffers / stats.totalOffers) * 100) : 0;

  const completionRate =
    stats.totalProjects > 0 ? Math.round((stats.completedProjects / stats.totalProjects) * 100) : 0;

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
          icon={DollarSign}
          label={t('totalEarnings')}
          value={formatCurrency(stats.totalEarnings)}
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
