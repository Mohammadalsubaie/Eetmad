'use client';

import { motion } from 'framer-motion';
import {
  Activity,
  ArrowRight,
  Bell,
  Briefcase,
  Clock,
  FileText,
  MessageSquare,
  Package,
} from 'lucide-react';
import { cssVars } from '@/styles/theme';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { EmptyState } from '@/components/ui';
import type { RecentActivity } from '@/lib/api/dashboard';

interface DashboardRecentActivityProps {
  recentActivity: RecentActivity[];
  overview?: { unreadNotifications: number; unreadMessages: number } | null;
}

export default function DashboardRecentActivity({
  recentActivity,
  overview,
}: DashboardRecentActivityProps) {
  const t = useTranslations('pages.dashboard');
  const router = useRouter();

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

  return (
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
        <EmptyState title={t('sections.recentActivity.empty')} description="" />
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
                  <h3 className="mb-1 font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
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
  );
}
