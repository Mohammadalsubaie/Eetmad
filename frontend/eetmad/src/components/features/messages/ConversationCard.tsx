'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { MessageCircle, Archive, Clock, CheckCircle2 } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import type { Conversation } from '@/lib/types/message.types';
import { Badge } from '@/components/ui';

interface ConversationCardProps {
  conversation: Conversation;
  onView?: (id: string) => void;
  currentUserId?: string;
}

export default function ConversationCard({
  conversation,
  onView,
  currentUserId,
}: ConversationCardProps) {
  const t = useTranslations('pages.messages');
  const router = useRouter();

  const handleClick = () => {
    if (onView) {
      onView(conversation.id);
    } else {
      router.push(`/messages/${conversation.id}`);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      });
    } else if (diffInHours < 168) {
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return cssVars.status.success;
      case 'archived':
        return cssVars.neutral.textMuted;
      case 'closed':
        return cssVars.status.error;
      default:
        return cssVars.neutral.textSecondary;
    }
  };

  const isUnread = conversation.unreadCount > 0;
  const lastMessage = conversation.lastMessage;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="cursor-pointer rounded-2xl border-2 p-4 shadow-md transition-all hover:shadow-lg"
      style={{
        backgroundColor: isUnread
          ? `color-mix(in srgb, ${cssVars.primary.DEFAULT} 5%, transparent)`
          : cssVars.neutral.surface,
        borderColor: isUnread ? cssVars.primary.DEFAULT : cssVars.neutral.border,
      }}
      onClick={handleClick}
    >
      <div className="flex items-start gap-4">
        {/* Avatar/Icon */}
        <div
          className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl"
          style={{
            backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 15%, transparent)`,
          }}
        >
          <MessageCircle
            className="h-6 w-6"
            style={{ color: cssVars.primary.DEFAULT }}
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="mb-1 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <h3
                className="truncate text-base font-bold"
                style={{ color: cssVars.secondary.DEFAULT }}
              >
                {conversation.requestId
                  ? t('conversationAboutRequest')
                  : conversation.projectId
                    ? t('conversationAboutProject')
                    : t('conversation')}
              </h3>
              {conversation.status !== 'active' && (
                <Badge
                  style={{
                    backgroundColor: `color-mix(in srgb, ${getStatusColor(conversation.status)} 15%, transparent)`,
                    color: getStatusColor(conversation.status),
                    borderColor: getStatusColor(conversation.status),
                  }}
                >
                  {conversation.status === 'archived' ? (
                    <Archive className="mr-1 h-3 w-3" />
                  ) : null}
                  {t(`status.${conversation.status}`)}
                </Badge>
              )}
            </div>
            <span className="text-xs font-medium" style={{ color: cssVars.neutral.textMuted }}>
              {formatDate(conversation.lastMessageAt)}
            </span>
          </div>

          {/* Last Message */}
          {lastMessage && (
            <p
              className="mb-2 line-clamp-2 text-sm"
              style={{
                color: isUnread
                  ? cssVars.secondary.DEFAULT
                  : cssVars.neutral.textSecondary,
                fontWeight: isUnread ? '600' : '400',
              }}
            >
              {lastMessage.isSystemMessage ? (
                <span style={{ fontStyle: 'italic', color: cssVars.neutral.textMuted }}>
                  {lastMessage.content}
                </span>
              ) : (
                lastMessage.content
              )}
            </p>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {conversation.requestId && (
                <Badge
                  style={{
                    borderColor: cssVars.accent.warm,
                    color: cssVars.accent.warm,
                  }}
                >
                  {t('request')}
                </Badge>
              )}
              {conversation.projectId && (
                <Badge
                  style={{
                    borderColor: cssVars.status.success,
                    color: cssVars.status.success,
                  }}
                >
                  {t('project')}
                </Badge>
              )}
            </div>
            {isUnread && (
              <div
                className="flex h-6 w-6 items-center justify-center rounded-full font-bold text-xs"
                style={{
                  backgroundColor: cssVars.primary.DEFAULT,
                  color: cssVars.neutral.bg,
                }}
              >
                {conversation.unreadCount > 9 ? '9+' : conversation.unreadCount}
              </div>
            )}
            {!isUnread && lastMessage && lastMessage.isRead && (
              <CheckCircle2
                className="h-4 w-4"
                style={{ color: cssVars.status.success }}
              />
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

