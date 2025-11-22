'use client';

import { useTranslations } from 'next-intl';
import { useNotifications, useUnreadNotifications } from '@/lib/hooks/useNotifications';
import NotificationCard from './NotificationCard';
import { EmptyState, LoadingSpinner, ErrorMessage } from '@/components/ui';
import { useMarkAsRead, useDeleteNotification } from '@/lib/hooks/useNotifications';

interface NotificationsListProps {
  showUnreadOnly?: boolean;
  type?: string;
}

export default function NotificationsList({
  showUnreadOnly = false,
  type,
}: NotificationsListProps) {
  const t = useTranslations('pages.notifications');
  const {
    data: notifications,
    isLoading,
    error,
  } = showUnreadOnly
    ? useUnreadNotifications(type ? { type } : undefined)
    : useNotifications(type ? { type } : undefined);
  const { mutate: markAsRead } = useMarkAsRead();
  const { mutate: deleteNotification } = useDeleteNotification();

  const handleMarkAsRead = (id: string) => {
    markAsRead(id);
  };

  const handleDelete = (id: string) => {
    if (confirm(t('confirmDelete'))) {
      deleteNotification(id);
    }
  };

  if (isLoading) {
    return <LoadingSpinner text={t('loading')} />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <div className="space-y-3">
      {notifications.length === 0 ? (
        <EmptyState
          title={showUnreadOnly ? t('noUnreadNotifications') : t('noNotifications')}
          description={
            showUnreadOnly ? t('noUnreadNotificationsDescription') : t('noNotificationsDescription')
          }
        />
      ) : (
        notifications.map((notification) => (
          <NotificationCard
            key={notification.id}
            notification={notification}
            onMarkAsRead={handleMarkAsRead}
            onDelete={handleDelete}
          />
        ))
      )}
    </div>
  );
}
