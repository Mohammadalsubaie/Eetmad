'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Plus, Archive, MessageCircle } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import ConversationsList from '@/components/features/messages/ConversationsList';
import { Button } from '@/components/ui';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';
import { useUnreadCount } from '@/lib/hooks/useMessages';

export default function MessagesPage() {
  const t = useTranslations('pages.messages');
  const tPages = useTranslations('pages');
  const locale = useLocale();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'active' | 'archived'>('active');
  const { data: unreadCount } = useUnreadCount();

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
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={() => router.push(`/${locale}/messages/new`)}
            className="flex items-center gap-2"
            style={{
              background: cssVars.gradient.gold,
              color: cssVars.secondary.DEFAULT,
            }}
            icon={Plus}
          >
            {t('newConversation')}
          </Button>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-2 border-b-2" style={{ borderColor: cssVars.neutral.border }}>
        <button
          onClick={() => setActiveTab('active')}
          className="relative px-4 py-2 font-semibold transition-colors"
          style={{
            color: activeTab === 'active' ? cssVars.primary.DEFAULT : cssVars.neutral.textMuted,
          }}
        >
          {t('active')}
          {activeTab === 'active' && (
            <motion.div
              layoutId="activeTab"
              className="absolute bottom-0 left-0 right-0 h-0.5"
              style={{ backgroundColor: cssVars.primary.DEFAULT }}
            />
          )}
        </button>
        <button
          onClick={() => setActiveTab('archived')}
          className="relative px-4 py-2 font-semibold transition-colors"
          style={{
            color: activeTab === 'archived' ? cssVars.primary.DEFAULT : cssVars.neutral.textMuted,
          }}
        >
          {t('archived')}
          {activeTab === 'archived' && (
            <motion.div
              layoutId="activeTab"
              className="absolute bottom-0 left-0 right-0 h-0.5"
              style={{ backgroundColor: cssVars.primary.DEFAULT }}
            />
          )}
        </button>
      </div>

      {/* Conversations List */}
      <ConversationsList status={activeTab} />
    </div>
  );
}
