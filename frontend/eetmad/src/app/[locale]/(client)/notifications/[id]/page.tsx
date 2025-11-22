'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Clock, ExternalLink, Trash2 } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import {
  useNotification,
  useMarkAsRead,
  useDeleteNotification,
} from '@/lib/hooks/useNotifications';
import { LoadingSpinner, ErrorMessage, Button } from '@/components/ui';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';
import NotificationCard from '@/components/features/notifications/NotificationCard';

export default function NotificationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const locale = useLocale();
  const id = params.id as string;
  const t = useTranslations('pages.notifications');
  const { data: notification, isLoading, error } = useNotification(id);
  const { mutate: markAsRead } = useMarkAsRead();
  const { mutate: deleteNotification } = useDeleteNotification();

  // Mark as read when viewing
  useEffect(() => {
    if (notification && !notification.isRead) {
      markAsRead(id);
    }
  }, [notification, id, markAsRead]);

  const handleDelete = () => {
    if (confirm(t('confirmDelete'))) {
      deleteNotification(id);
      router.push(`/${locale}/notifications`);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
        <Breadcrumbs
          items={[{ label: t('title'), href: `/${locale}/notifications` }, { label: id }]}
          className="mb-6"
        />
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  if (error || !notification) {
    return (
      <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
        <Breadcrumbs
          items={[{ label: t('title'), href: `/${locale}/notifications` }, { label: id }]}
          className="mb-6"
        />
        <ErrorMessage error={error?.message || t('notificationNotFound')} variant="banner" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
      <Breadcrumbs
        items={[
          { label: t('title'), href: `/${locale}/notifications` },
          { label: notification.title },
        ]}
        className="mb-6"
      />

      {/* Back Button */}
      <motion.button
        whileHover={{ x: -4 }}
        onClick={() => router.back()}
        className="mb-6 flex items-center gap-2 text-sm font-medium"
        style={{ color: cssVars.primary.DEFAULT }}
      >
        <ArrowLeft className="h-4 w-4" />
        {t('back')}
      </motion.button>

      {/* Notification Card */}
      <div className="mb-6">
        <NotificationCard notification={notification} />
      </div>

      {/* Details */}
      <div
        className="mb-6 rounded-2xl border-2 p-6"
        style={{
          backgroundColor: cssVars.neutral.surface,
          borderColor: cssVars.neutral.border,
        }}
      >
        <h2 className="mb-4 text-2xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
          {t('details')}
        </h2>
        <div className="space-y-3">
          <div>
            <p className="text-xs font-semibold" style={{ color: cssVars.neutral.textMuted }}>
              {t('typeLabel')}
            </p>
            <p className="text-sm font-medium" style={{ color: cssVars.secondary.DEFAULT }}>
              {t(`type.${notification.type}`)}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold" style={{ color: cssVars.neutral.textMuted }}>
              {t('status')}
            </p>
            <div className="flex items-center gap-2">
              {notification.isRead ? (
                <>
                  <CheckCircle2 className="h-4 w-4" style={{ color: cssVars.status.success }} />
                  <span className="text-sm font-medium" style={{ color: cssVars.status.success }}>
                    {t('read')}
                  </span>
                </>
              ) : (
                <>
                  <Clock className="h-4 w-4" style={{ color: cssVars.status.warning }} />
                  <span className="text-sm font-medium" style={{ color: cssVars.status.warning }}>
                    {t('unread')}
                  </span>
                </>
              )}
            </div>
          </div>
          {notification.readAt && (
            <div>
              <p className="text-xs font-semibold" style={{ color: cssVars.neutral.textMuted }}>
                {t('readAt')}
              </p>
              <p className="text-sm font-medium" style={{ color: cssVars.secondary.DEFAULT }}>
                {formatDate(notification.readAt)}
              </p>
            </div>
          )}
          <div>
            <p className="text-xs font-semibold" style={{ color: cssVars.neutral.textMuted }}>
              {t('createdAt')}
            </p>
            <p className="text-sm font-medium" style={{ color: cssVars.secondary.DEFAULT }}>
              {formatDate(notification.createdAt)}
            </p>
          </div>
          {notification.referenceType && notification.referenceId && (
            <div>
              <p className="text-xs font-semibold" style={{ color: cssVars.neutral.textMuted }}>
                {t('reference')}
              </p>
              <p className="text-sm font-medium" style={{ color: cssVars.secondary.DEFAULT }}>
                {notification.referenceType}: {notification.referenceId}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        {notification.actionUrl && (
          <Button
            onClick={() => router.push(notification.actionUrl!)}
            variant="primary"
            icon={ExternalLink}
            style={{
              background: cssVars.gradient.gold,
              color: cssVars.secondary.DEFAULT,
            }}
          >
            {t('viewRelated')}
          </Button>
        )}
        <Button
          onClick={handleDelete}
          variant="outline"
          icon={Trash2}
          style={{
            borderColor: cssVars.status.error,
            color: cssVars.status.error,
          }}
        >
          {t('delete')}
        </Button>
      </div>
    </div>
  );
}
