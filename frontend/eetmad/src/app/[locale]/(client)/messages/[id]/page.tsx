'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowLeft, MoreVertical, Archive, Trash2, Bell, BellOff } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import {
  useConversation,
  useMessages,
  useSendMessage,
  useDeleteMessage,
  useUpdateMessage,
} from '@/lib/hooks/useMessages';
import { LoadingSpinner, ErrorMessage, Button } from '@/components/ui';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';
import MessageBubble from '@/components/features/messages/MessageBubble';
import MessageInput from '@/components/features/messages/MessageInput';
import { messagesApi } from '@/lib/api/messages';

export default function ConversationPage() {
  const params = useParams();
  const router = useRouter();
  const locale = useLocale();
  const id = params.id as string;
  const t = useTranslations('pages.messages');
  const { data: conversation, isLoading: conversationLoading } = useConversation(id);
  const { data: messages, isLoading: messagesLoading } = useMessages(id);
  const { mutate: sendMessage, isLoading: sending } = useSendMessage();
  const { mutate: deleteMessage } = useDeleteMessage();
  const { mutate: updateMessage } = useUpdateMessage();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isEditing, setIsEditing] = useState<{ id: string; content: string } | null>(null);
  const [showMenu, setShowMenu] = useState(false);

  // TODO: Get actual user ID from auth context
  const currentUserId = 'user-1';

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (content: string, attachments?: File[]) => {
    if (isEditing) {
      await updateMessage(isEditing.id, content);
      setIsEditing(null);
    } else {
      await sendMessage(id, { content, attachments });
    }
  };

  const handleDelete = async (messageId: string) => {
    if (confirm(t('confirmDeleteMessage'))) {
      await deleteMessage(messageId);
    }
  };

  const handleEdit = (messageId: string, content: string) => {
    setIsEditing({ id: messageId, content });
  };

  const handleArchive = async () => {
    if (conversation) {
      if (conversation.status === 'archived') {
        await messagesApi.unarchiveConversation(id);
      } else {
        await messagesApi.archiveConversation(id);
      }
      setShowMenu(false);
    }
  };

  const handleMute = async () => {
    if (conversation) {
      // TODO: Check if muted
      await messagesApi.muteConversation(id);
      setShowMenu(false);
    }
  };

  if (conversationLoading || messagesLoading) {
    return (
      <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
        <Breadcrumbs
          items={[{ label: t('title'), href: `/${locale}/messages` }, { label: id }]}
          className="mb-6"
        />
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  if (!conversation) {
    return (
      <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
        <Breadcrumbs
          items={[{ label: t('title'), href: `/${locale}/messages` }, { label: id }]}
          className="mb-6"
        />
        <ErrorMessage error={t('conversationNotFound')} variant="banner" />
      </div>
    );
  }

  return (
    <div
      className="flex h-[calc(100vh-200px)] flex-col"
      style={{ backgroundColor: cssVars.neutral.bg }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between border-b-2 p-4"
        style={{
          backgroundColor: cssVars.neutral.surface,
          borderColor: cssVars.neutral.border,
        }}
      >
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ x: -4 }}
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm font-medium"
            style={{ color: cssVars.primary.DEFAULT }}
          >
            <ArrowLeft className="h-4 w-4" />
            {t('back')}
          </motion.button>
          <div>
            <h2 className="text-lg font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
              {conversation.requestId
                ? t('conversationAboutRequest')
                : conversation.projectId
                  ? t('conversationAboutProject')
                  : t('conversation')}
            </h2>
            {conversation.participants.length > 0 && (
              <p className="text-xs" style={{ color: cssVars.neutral.textMuted }}>
                {conversation.participants.length} {t('participants')}
              </p>
            )}
          </div>
        </div>
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowMenu(!showMenu)}
            className="rounded-xl p-2"
            style={{
              backgroundColor: `color-mix(in srgb, ${cssVars.neutral.border} 30%, transparent)`,
            }}
          >
            <MoreVertical className="h-5 w-5" style={{ color: cssVars.secondary.DEFAULT }} />
          </motion.button>
          {showMenu && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute right-0 top-full mt-2 rounded-xl border-2 p-2 shadow-lg"
              style={{
                backgroundColor: cssVars.neutral.surface,
                borderColor: cssVars.neutral.border,
              }}
            >
              <button
                onClick={handleArchive}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
                style={{ color: cssVars.secondary.DEFAULT }}
              >
                <Archive className="h-4 w-4" />
                {conversation.status === 'archived' ? t('unarchive') : t('archive')}
              </button>
              <button
                onClick={handleMute}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
                style={{ color: cssVars.secondary.DEFAULT }}
              >
                <BellOff className="h-4 w-4" />
                {t('mute')}
              </button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="mx-auto max-w-4xl">
          {messages.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <p style={{ color: cssVars.neutral.textMuted }}>{t('noMessages')}</p>
            </div>
          ) : (
            messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                isOwn={message.senderId === currentUserId}
                onDelete={handleDelete}
                onEdit={handleEdit}
                currentUserId={currentUserId}
              />
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t-2 p-4" style={{ borderColor: cssVars.neutral.border }}>
        <div className="mx-auto max-w-4xl">
          {isEditing ? (
            <div
              className="mb-2 rounded-lg border-2 p-2"
              style={{ borderColor: cssVars.primary.DEFAULT }}
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-semibold" style={{ color: cssVars.primary.DEFAULT }}>
                  {t('editing')}
                </span>
                <button
                  onClick={() => setIsEditing(null)}
                  className="text-xs"
                  style={{ color: cssVars.neutral.textMuted }}
                >
                  {t('cancel')}
                </button>
              </div>
            </div>
          ) : null}
          <MessageInput
            onSend={handleSend}
            isLoading={sending}
            placeholder={isEditing ? t('editMessagePlaceholder') : t('typeMessage')}
          />
        </div>
      </div>
    </div>
  );
}
