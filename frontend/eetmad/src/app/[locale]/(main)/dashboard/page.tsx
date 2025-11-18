'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { cssVars } from '@/styles/theme';
import { motion } from 'framer-motion';
import {
  Activity,
  Briefcase,
  FileText,
  Bell,
  MessageSquare,
  TrendingUp,
  CheckCircle2,
  Clock,
  Wallet,
  ArrowRight,
  Package,
} from 'lucide-react';
import { dashboardApi } from '@/lib/api/dashboard';
import type { DashboardOverview, DashboardStatistics, RecentActivity } from '@/lib/api/dashboard';

export default function DashboardPage() {
  const t = useTranslations('pages.dashboard');
  const router = useRouter();
  const [overview, setOverview] = useState<DashboardOverview | null>(null);
  const [statistics, setStatistics] = useState<DashboardStatistics | null>(null);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [overviewData, statisticsData, activityData] = await Promise.all([
          dashboardApi.getOverview(),
          dashboardApi.getStatistics(),
          dashboardApi.getRecentActivity(),
        ]);
        setOverview(overviewData);
        setStatistics(statisticsData);
        setRecentActivity(activityData);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const getActivityIcon = (type: RecentActivity['type']) => {
    switch (type) {
      case 'request':
        return FileText;
      case 'offer':
        return Briefcase;
      case 'project':
        return Package;
      case 'message':
        return MessageSquare;
      case 'notification':
        return Bell;
      default:
        return Activity;
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInSeconds = Math.floor((now.getTime() - time.getTime()) / 1000);

    if (diffInSeconds < 60) return t('timeAgo.justNow');
    if (diffInSeconds < 3600)
      return t('timeAgo.minutes', { count: Math.floor(diffInSeconds / 60) });
    if (diffInSeconds < 86400)
      return t('timeAgo.hours', { count: Math.floor(diffInSeconds / 3600) });
    return t('timeAgo.days', { count: Math.floor(diffInSeconds / 86400) });
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
        <div className="text-center" style={{ color: cssVars.neutral.textSecondary }}>
          {t('loading')}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
            {t('title')}
          </h1>
          <p className="text-lg" style={{ color: cssVars.neutral.textSecondary }}>
            {t('subtitle')}
          </p>
        </div>

        {/* Overview Stats */}
        {overview && (
          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <motion.div
              whileHover={{ y: -4 }}
              className="rounded-2xl border-2 p-6"
              style={{
                backgroundColor: cssVars.neutral.surface,
                borderColor: cssVars.neutral.border,
              }}
            >
              <div className="mb-4 flex items-center justify-between">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{
                    backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 15%, transparent)`,
                  }}
                >
                  <FileText className="h-6 w-6" style={{ color: cssVars.primary.DEFAULT }} />
                </div>
                <TrendingUp className="h-5 w-5" style={{ color: cssVars.status.success }} />
              </div>
              <div className="mb-1 text-3xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                {overview.totalRequests}
              </div>
              <div className="text-sm" style={{ color: cssVars.neutral.textSecondary }}>
                {t('stats.totalRequests')}
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              className="rounded-2xl border-2 p-6"
              style={{
                backgroundColor: cssVars.neutral.surface,
                borderColor: cssVars.neutral.border,
              }}
            >
              <div className="mb-4 flex items-center justify-between">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{
                    backgroundColor: `color-mix(in srgb, ${cssVars.accent.primary} 15%, transparent)`,
                  }}
                >
                  <Package className="h-6 w-6" style={{ color: cssVars.accent.primary }} />
                </div>
                <Activity className="h-5 w-5" style={{ color: cssVars.status.info }} />
              </div>
              <div className="mb-1 text-3xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                {overview.activeProjects}
              </div>
              <div className="text-sm" style={{ color: cssVars.neutral.textSecondary }}>
                {t('stats.activeProjects')}
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              className="rounded-2xl border-2 p-6"
              style={{
                backgroundColor: cssVars.neutral.surface,
                borderColor: cssVars.neutral.border,
              }}
            >
              <div className="mb-4 flex items-center justify-between">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{
                    backgroundColor: `color-mix(in srgb, ${cssVars.status.success} 15%, transparent)`,
                  }}
                >
                  <CheckCircle2 className="h-6 w-6" style={{ color: cssVars.status.success }} />
                </div>
              </div>
              <div className="mb-1 text-3xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                {overview.completedProjects}
              </div>
              <div className="text-sm" style={{ color: cssVars.neutral.textSecondary }}>
                {t('stats.completedProjects')}
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              className="rounded-2xl border-2 p-6"
              style={{
                backgroundColor: cssVars.neutral.surface,
                borderColor: cssVars.neutral.border,
              }}
            >
              <div className="mb-4 flex items-center justify-between">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{
                    backgroundColor: `color-mix(in srgb, ${cssVars.accent.warm} 15%, transparent)`,
                  }}
                >
                  <Wallet className="h-6 w-6" style={{ color: cssVars.accent.warm }} />
                </div>
              </div>
              <div className="mb-1 text-3xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                {overview.walletBalance.toLocaleString()} {t('currency')}
              </div>
              <div className="text-sm" style={{ color: cssVars.neutral.textSecondary }}>
                {t('stats.walletBalance')}
              </div>
            </motion.div>
          </div>
        )}

        {/* Statistics Grid */}
        {statistics && (
          <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Requests Statistics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl border-2 p-6"
              style={{
                backgroundColor: cssVars.neutral.surface,
                borderColor: cssVars.neutral.border,
              }}
            >
              <h2 className="mb-4 text-xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                {t('sections.requests.title')}
              </h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span style={{ color: cssVars.neutral.textSecondary }}>
                    {t('sections.requests.total')}
                  </span>
                  <span className="font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                    {statistics.requests.total}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span style={{ color: cssVars.neutral.textSecondary }}>
                    {t('sections.requests.active')}
                  </span>
                  <span className="font-bold" style={{ color: cssVars.status.info }}>
                    {statistics.requests.active}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span style={{ color: cssVars.neutral.textSecondary }}>
                    {t('sections.requests.closed')}
                  </span>
                  <span className="font-bold" style={{ color: cssVars.neutral.textSecondary }}>
                    {statistics.requests.closed}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span style={{ color: cssVars.neutral.textSecondary }}>
                    {t('sections.requests.pending')}
                  </span>
                  <span className="font-bold" style={{ color: cssVars.status.warning }}>
                    {statistics.requests.pending}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Projects Statistics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl border-2 p-6"
              style={{
                backgroundColor: cssVars.neutral.surface,
                borderColor: cssVars.neutral.border,
              }}
            >
              <h2 className="mb-4 text-xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                {t('sections.projects.title')}
              </h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span style={{ color: cssVars.neutral.textSecondary }}>
                    {t('sections.projects.total')}
                  </span>
                  <span className="font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                    {statistics.projects.total}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span style={{ color: cssVars.neutral.textSecondary }}>
                    {t('sections.projects.active')}
                  </span>
                  <span className="font-bold" style={{ color: cssVars.status.info }}>
                    {statistics.projects.active}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span style={{ color: cssVars.neutral.textSecondary }}>
                    {t('sections.projects.completed')}
                  </span>
                  <span className="font-bold" style={{ color: cssVars.status.success }}>
                    {statistics.projects.completed}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span style={{ color: cssVars.neutral.textSecondary }}>
                    {t('sections.projects.cancelled')}
                  </span>
                  <span className="font-bold" style={{ color: cssVars.status.error }}>
                    {statistics.projects.cancelled}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl border-2 p-6"
          style={{
            backgroundColor: cssVars.neutral.surface,
            borderColor: cssVars.neutral.border,
          }}
        >
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
              {t('sections.recentActivity.title')}
            </h2>
            {overview && (overview.unreadNotifications > 0 || overview.unreadMessages > 0) && (
              <div className="flex items-center gap-2">
                {overview.unreadNotifications > 0 && (
                  <div
                    className="flex items-center gap-2 rounded-lg px-3 py-1"
                    style={{
                      backgroundColor: `color-mix(in srgb, ${cssVars.status.info} 15%, transparent)`,
                    }}
                  >
                    <Bell className="h-4 w-4" style={{ color: cssVars.status.info }} />
                    <span className="text-sm font-bold" style={{ color: cssVars.status.info }}>
                      {overview.unreadNotifications}
                    </span>
                  </div>
                )}
                {overview.unreadMessages > 0 && (
                  <div
                    className="flex items-center gap-2 rounded-lg px-3 py-1"
                    style={{
                      backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 15%, transparent)`,
                    }}
                  >
                    <MessageSquare className="h-4 w-4" style={{ color: cssVars.primary.DEFAULT }} />
                    <span className="text-sm font-bold" style={{ color: cssVars.primary.DEFAULT }}>
                      {overview.unreadMessages}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          {recentActivity.length === 0 ? (
            <div className="py-8 text-center" style={{ color: cssVars.neutral.textSecondary }}>
              {t('sections.recentActivity.empty')}
            </div>
          ) : (
            <div className="space-y-4">
              {recentActivity.map((activity, index) => {
                const Icon = getActivityIcon(activity.type);
                return (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex cursor-pointer items-start gap-4 rounded-xl p-4 transition-all hover:shadow-md"
                    style={{
                      backgroundColor: cssVars.neutral.surfaceAlt,
                    }}
                    onClick={() => activity.link && router.push(activity.link)}
                  >
                    <div
                      className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg"
                      style={{
                        backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 15%, transparent)`,
                      }}
                    >
                      <Icon className="h-5 w-5" style={{ color: cssVars.primary.DEFAULT }} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3
                        className="mb-1 font-semibold"
                        style={{ color: cssVars.secondary.DEFAULT }}
                      >
                        {activity.title}
                      </h3>
                      <p className="mb-2 text-sm" style={{ color: cssVars.neutral.textSecondary }}>
                        {activity.description}
                      </p>
                      <div
                        className="flex items-center gap-2 text-xs"
                        style={{ color: cssVars.neutral.textMuted }}
                      >
                        <Clock className="h-3 w-3" />
                        {formatTimeAgo(activity.timestamp)}
                      </div>
                    </div>
                    {activity.link && (
                      <ArrowRight
                        className="h-5 w-5 flex-shrink-0"
                        style={{ color: cssVars.neutral.textMuted }}
                      />
                    )}
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
