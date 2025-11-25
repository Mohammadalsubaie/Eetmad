'use client';

import { Briefcase, Star, TrendingUp } from 'lucide-react';
import SaudiRiyalIcon from '@/components/shared/icons/SaudiRiyalIcon';
import { cssVars } from '@/styles/theme';
import { useTranslations } from 'next-intl';
import type { User } from '@/lib/types/user.types';
import AdminStatCard from '@/components/shared/admin/AdminStatCard';

interface UserStatsProps {
  user: User;
}

export default function UserStats({ user }: UserStatsProps) {
  const t = useTranslations('admin');

  return (
    <div className="mb-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <AdminStatCard
        title={t('users.detail.stats.rating')}
        value={user.averageRating.toFixed(1)}
        change={`${user.totalReviews} ${t('users.detail.stats.reviews')}`}
        trend="up"
        icon={Star}
        color={cssVars.status.warning}
      />
      <AdminStatCard
        title={t('users.detail.stats.projects')}
        value={user.completedProjects.toString()}
        change={t('users.detail.stats.completed')}
        trend="up"
        icon={Briefcase}
        color={cssVars.primary.DEFAULT}
      />
      <AdminStatCard
        title={t('users.detail.stats.wallet')}
        value={new Intl.NumberFormat('en-US', { numberingSystem: 'latn' }).format(user.walletBalance)}
        change=""
        icon={SaudiRiyalIcon}
        color={cssVars.status.success}
      />
      <AdminStatCard
        title={t('users.detail.stats.lastLogin')}
        value={new Date(user.lastLoginAt).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        })}
        change={new Date(user.lastLoginAt).toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
        })}
        icon={TrendingUp}
        color={cssVars.status.info}
      />
    </div>
  );
}
