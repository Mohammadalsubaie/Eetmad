'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, Download, FileText, Image as ImageIcon, X } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import type { Message } from '@/lib/types/message.types';
import { Button } from '@/components/ui';

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
  onDelete?: (id: string) => void;
  onEdit?: (id: string, content: string) => void;
  currentUserId?: string;
}

export default function MessageBubble({ message, isOwn, onDelete, onEdit }: MessageBubbleProps) {
  const t = useTranslations('pages.messages');

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const isToday = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  if (message.isSystemMessage) {
    return (
      <div className="my-4 flex items-center justify-center">
        <div
          className="rounded-full px-4 py-2 text-xs font-medium"
          style={{
            backgroundColor: `color-mix(in srgb, ${cssVars.neutral.border} 50%, transparent)`,
            color: cssVars.neutral.textMuted,
          }}
        >
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`mb-4 flex ${isOwn ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`flex max-w-[75%] flex-col ${isOwn ? 'items-end' : 'items-start'}`}>
        {/* Message Content */}
        <div
          className="rounded-2xl px-4 py-3"
          style={{
            backgroundColor: isOwn
              ? cssVars.primary.DEFAULT
              : `color-mix(in srgb, ${cssVars.neutral.surface} 100%, transparent)`,
            border: `2px solid ${isOwn ? cssVars.primary.DEFAULT : cssVars.neutral.border}`,
            color: isOwn ? cssVars.neutral.bg : cssVars.secondary.DEFAULT,
          }}
        >
          {/* Text Content */}
          {message.content && (
            <p className="mb-2 whitespace-pre-wrap break-words text-sm leading-relaxed">
              {message.content}
            </p>
          )}

          {/* Attachments */}
          {message.attachments && message.attachments.length > 0 && (
            <div className="mb-2 space-y-2">
              {message.attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="flex items-center gap-2 rounded-lg border-2 p-2"
                  style={{
                    backgroundColor: isOwn
                      ? `color-mix(in srgb, ${cssVars.neutral.bg} 20%, transparent)`
                      : `color-mix(in srgb, ${cssVars.neutral.bg} 50%, transparent)`,
                    borderColor: isOwn ? cssVars.neutral.bg : cssVars.neutral.border,
                  }}
                >
                  {message.messageType === 'image' ? (
                    <ImageIcon
                      className="h-4 w-4 flex-shrink-0"
                      style={{ color: isOwn ? cssVars.neutral.bg : cssVars.primary.DEFAULT }}
                    />
                  ) : (
                    <FileText
                      className="h-4 w-4 flex-shrink-0"
                      style={{ color: isOwn ? cssVars.neutral.bg : cssVars.primary.DEFAULT }}
                    />
                  )}
                  <a
                    href={attachment.url || attachment.filePath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 truncate text-xs font-medium underline"
                    style={{ color: isOwn ? cssVars.neutral.bg : cssVars.primary.DEFAULT }}
                  >
                    {attachment.name}
                  </a>
                  <Download
                    className="h-4 w-4 flex-shrink-0 cursor-pointer"
                    style={{ color: isOwn ? cssVars.neutral.bg : cssVars.primary.DEFAULT }}
                    onClick={(e) => {
                      e.preventDefault();
                      window.open(attachment.url || attachment.filePath, '_blank');
                    }}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Message Footer */}
          <div className="flex items-center gap-2">
            <span className="text-xs opacity-70">{formatTime(message.createdAt)}</span>
            {isOwn && (
              <>
                {message.isRead ? (
                  <CheckCircle2 className="h-3 w-3" />
                ) : (
                  <Clock className="h-3 w-3" />
                )}
              </>
            )}
          </div>
        </div>

        {/* Actions */}
        {isOwn && (onDelete || onEdit) && (
          <div className="mt-1 flex gap-2">
            {onEdit && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(message.id, message.content)}
                className="h-6 px-2 text-xs"
              >
                {t('edit')}
              </Button>
            )}
            {onDelete && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(message.id)}
                className="h-6 px-2 text-xs"
                style={{ color: cssVars.status.error }}
              >
                {t('delete')}
              </Button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
