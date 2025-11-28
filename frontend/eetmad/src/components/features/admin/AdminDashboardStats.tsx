'use client';

import AdminStatCard from '@/components/shared/admin/AdminStatCard';
import type { DashboardStats } from '@/lib/types';
import { cssVars } from '@/styles/theme';
import { Briefcase, FileText, ShoppingBag, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface AdminDashboardStatsProps {
  stats: DashboardStats;
}

export default function AdminDashboardStats({ stats }: AdminDashboardStatsProps) {
  const t = useTranslations('admin');

  return (
    <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <AdminStatCard
        title={t('dashboard.stats.totalUsers')}
        value={new Intl.NumberFormat('en-US', { numberingSystem: 'latn' }).format(stats.totalUsers)}
        change="+12%"
        trend="up"
        icon={Users}
        color={cssVars.primary.DEFAULT}
      />
      <AdminStatCard
        title={t('dashboard.stats.totalSuppliers')}
        value={new Intl.NumberFormat('en-US', { numberingSystem: 'latn' }).format(
          stats.totalSuppliers
        )}
        change="+8%"
        trend="up"
        icon={ShoppingBag}
        color={cssVars.accent.primary}
      />
      <AdminStatCard
        title={t('dashboard.stats.activeRequests')}
        value={new Intl.NumberFormat('en-US', { numberingSystem: 'latn' }).format(
          stats.activeRequests
        )}
        change="+24%"
        trend="up"
        icon={FileText}
        color={cssVars.status.info}
      />
      <AdminStatCard
        title={t('dashboard.stats.activeProjects')}
        value={new Intl.NumberFormat('en-US', { numberingSystem: 'latn' }).format(
          stats.activeProjects
        )}
        change="-3%"
        trend="down"
        icon={Briefcase}
        color={cssVars.secondary.DEFAULT}
      />
    </div>
  );
}
