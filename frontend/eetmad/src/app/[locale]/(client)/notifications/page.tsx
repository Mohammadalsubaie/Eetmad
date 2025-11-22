'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle2, Settings, Trash2, Bell, BellOff } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import NotificationsList from '@/components/features/notifications/NotificationsList';
import { Button } from '@/components/ui';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';
import {
  useUnreadCount,
  useMarkAllAsRead,
  useClearAllNotifications,
} from '@/lib/hooks/useNotifications';

export default function NotificationsPage() {
  const t = useTranslations('pages.notifications');
  const tPages = useTranslations('pages');
  const locale = useLocale();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all');
  const { data: unreadCount } = useUnreadCount();
  const { mutate: markAllAsRead, isLoading: markingAll } = useMarkAllAsRead();
  const { mutate: clearAll, isLoading: clearing } = useClearAllNotifications();

  const handleMarkAllAsRead = () => {
    if (confirm(t('confirmMarkAllAsRead'))) {
      markAllAsRead();
    }
  };

  const handleClearAll = () => {
    if (confirm(t('confirmClearAll'))) {
      clearAll();
    }
  };

  return (
    <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
      <Breadcrumbs items={[{ label: t('title') }]} className="mb-6" />

      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-3">
            <h1 className="text-4xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
              {t('title')}
            </h1>
            {unreadCount > 0 && (
              <div
                className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold"
                style={{
                  backgroundColor: cssVars.status.error,
                  color: cssVars.neutral.bg,
                }}
              >
                {unreadCount > 9 ? '9+' : unreadCount}
              </div>
            )}
          </div>
          <p className="text-base" style={{ color: cssVars.neutral.textSecondary }}>
            {t('subtitle')}
          </p>
        </div>
        <div className="flex gap-2">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => router.push(`/${locale}/notifications/settings`)}
              variant="outline"
              icon={Settings}
            >
              {t('settings')}
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        {/* Tabs */}
        <div className="flex gap-2 border-b-2" style={{ borderColor: cssVars.neutral.border }}>
          <button
            onClick={() => setActiveTab('all')}
            className="relative px-4 py-2 font-semibold transition-colors"
            style={{
              color: activeTab === 'all' ? cssVars.primary.DEFAULT : cssVars.neutral.textMuted,
            }}
          >
            {t('all')}
            {activeTab === 'all' && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5"
                style={{ backgroundColor: cssVars.primary.DEFAULT }}
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab('unread')}
            className="relative px-4 py-2 font-semibold transition-colors"
            style={{
              color: activeTab === 'unread' ? cssVars.primary.DEFAULT : cssVars.neutral.textMuted,
            }}
          >
            {t('unread')}
            {unreadCount > 0 && (
              <span
                className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold"
                style={{
                  backgroundColor: cssVars.status.error,
                  color: cssVars.neutral.bg,
                }}
              >
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
            {activeTab === 'unread' && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5"
                style={{ backgroundColor: cssVars.primary.DEFAULT }}
              />
            )}
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          {activeTab === 'all' && (
            <>
              <Button
                onClick={handleMarkAllAsRead}
                disabled={markingAll || unreadCount === 0}
                variant="outline"
                icon={CheckCircle2}
                size="sm"
              >
                {t('markAllAsRead')}
              </Button>
              <Button
                onClick={handleClearAll}
                disabled={clearing}
                variant="outline"
                icon={Trash2}
                size="sm"
                style={{
                  borderColor: cssVars.status.error,
                  color: cssVars.status.error,
                }}
              >
                {t('clearAll')}
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Notifications List */}
      <NotificationsList showUnreadOnly={activeTab === 'unread'} />
    </div>
  );
}
