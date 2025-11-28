'use client';

import { useTranslations } from 'next-intl';
import { useConversations } from '@/lib/hooks/useMessages';
import ConversationCard from './ConversationCard';
import { EmptyState, LoadingSpinner, ErrorMessage } from '@/components/ui';

interface ConversationsListProps {
  status?: 'active' | 'archived' | 'closed';
  currentUserId?: string;
}

export default function ConversationsList({ status, currentUserId }: ConversationsListProps) {
  const t = useTranslations('pages.messages');
  const {
    data: conversations,
    isLoading,
    error,
  } = useConversations(status ? { status } : undefined);

  if (isLoading) {
    return <LoadingSpinner text={t('loading')} />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <div className="space-y-3">
      {conversations.length === 0 ? (
        <EmptyState title={t('noConversations')} description={t('noConversationsDescription')} />
      ) : (
        conversations.map((conversation) => (
          <ConversationCard
            key={conversation.id}
            conversation={conversation}
            currentUserId={currentUserId}
          />
        ))
      )}
    </div>
  );
}
