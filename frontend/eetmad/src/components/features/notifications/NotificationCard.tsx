'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
  Bell,
  CheckCircle2,
  Clock,
  DollarSign,
  FileText,
  MessageCircle,
  Package,
  Star,
  AlertCircle,
  Shield,
  CreditCard,
  FileCheck,
} from 'lucide-react';
import { cssVars } from '@/styles/theme';
import type { Notification } from '@/lib/types/notification.types';
import { Badge } from '@/components/ui';

interface NotificationCardProps {
  notification: Notification;
  onView?: (id: string) => void;
  onMarkAsRead?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function NotificationCard({
  notification,
  onView,
  onMarkAsRead,
  onDelete,
}: NotificationCardProps) {
  const t = useTranslations('pages.notifications');
  const router = useRouter();

  const handleClick = () => {
    if (notification.actionUrl) {
      router.push(notification.actionUrl);
    }
    if (onView) {
      onView(notification.id);
    }
    if (!notification.isRead && onMarkAsRead) {
      onMarkAsRead(notification.id);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = (now.getTime() - date.getTime()) / (1000 * 60);

    if (diffInMinutes < 1) {
      return t('justNow');
    } else if (diffInMinutes < 60) {
      const count = Math.floor(diffInMinutes);
      return t('minutesAgo', { count });
    } else if (diffInMinutes < 1440) {
      const count = Math.floor(diffInMinutes / 60);
      return t('hoursAgo', { count });
    } else if (diffInMinutes < 10080) {
      const count = Math.floor(diffInMinutes / 1440);
      return t('daysAgo', { count });
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'request':
        return FileText;
      case 'offer':
        return Package;
      case 'project':
        return CheckCircle2;
      case 'message':
        return MessageCircle;
      case 'review':
        return Star;
      case 'payment':
        return DollarSign;
      case 'contract':
        return FileCheck;
      case 'dispute':
        return AlertCircle;
      case 'verification':
        return Shield;
      default:
        return Bell;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'request':
        return cssVars.primary.DEFAULT;
      case 'offer':
        return cssVars.status.success;
      case 'project':
        return cssVars.status.info;
      case 'message':
        return cssVars.accent.warm;
      case 'review':
        return cssVars.status.warning;
      case 'payment':
        return cssVars.status.success;
      case 'contract':
        return cssVars.primary.DEFAULT;
      case 'dispute':
        return cssVars.status.error;
      case 'verification':
        return cssVars.status.info;
      default:
        return cssVars.neutral.textSecondary;
    }
  };

  const Icon = getTypeIcon(notification.type);
  const typeColor = getTypeColor(notification.type);

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className="cursor-pointer rounded-2xl border-2 p-4 shadow-md transition-all hover:shadow-lg"
      style={{
        backgroundColor: notification.isRead
          ? cssVars.neutral.surface
          : `color-mix(in srgb, ${cssVars.primary.DEFAULT} 5%, transparent)`,
        borderColor: notification.isRead ? cssVars.neutral.border : cssVars.primary.DEFAULT,
        borderLeftWidth: notification.isRead ? '2px' : '4px',
      }}
      onClick={handleClick}
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div
          className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl"
          style={{
            backgroundColor: `color-mix(in srgb, ${typeColor} 15%, transparent)`,
          }}
        >
          <Icon className="h-6 w-6" style={{ color: typeColor }} />
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-start justify-between gap-2">
            <div className="flex-1">
              <h3
                className="mb-1 text-base font-bold leading-tight"
                style={{ color: cssVars.secondary.DEFAULT }}
              >
                {notification.title}
              </h3>
              <p
                className="line-clamp-2 text-sm leading-relaxed"
                style={{ color: cssVars.neutral.textSecondary }}
              >
                {notification.body}
              </p>
            </div>
            {!notification.isRead && (
              <div
                className="h-3 w-3 flex-shrink-0 rounded-full"
                style={{ backgroundColor: cssVars.primary.DEFAULT }}
              />
            )}
          </div>

          {/* Footer */}
          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge
                style={{
                  backgroundColor: `color-mix(in srgb, ${typeColor} 15%, transparent)`,
                  color: typeColor,
                  borderColor: typeColor,
                }}
              >
                {t(`type.${notification.type}`)}
              </Badge>
              <span className="text-xs" style={{ color: cssVars.neutral.textMuted }}>
                {formatDate(notification.createdAt)}
              </span>
            </div>
            {notification.sentVia.email && (
              <span className="text-xs" style={{ color: cssVars.neutral.textMuted }}>
                📧
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
