'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowLeft, Search, User } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import { useCreateConversation } from '@/lib/hooks/useMessages';
import { LoadingSpinner, ErrorMessage, Button } from '@/components/ui';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';
import Input from '@/components/ui/Input/Input';

export default function NewConversationPage() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('pages.messages');
  const { mutate: createConversation, isLoading, error } = useCreateConversation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [initialMessage, setInitialMessage] = useState('');

  // TODO: Replace with actual user search API
  const mockUsers = [
    { id: 'user-1', name: 'Ahmed Al-Saeed', email: 'ahmed@example.com' },
    { id: 'user-2', name: 'Fatima Al-Zahrani', email: 'fatima@example.com' },
    { id: 'supplier-1', name: 'Tech Solutions Co.', email: 'tech@example.com' },
  ];

  const filteredUsers = mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectUser = (userId: string) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handleCreate = async () => {
    if (selectedUsers.length === 0) return;

    try {
      const conversation = await createConversation({
        participantIds: selectedUsers,
        initialMessage: initialMessage || undefined,
      });
      router.push(`/${locale}/messages/${conversation.id}`);
    } catch (err) {
      // Error handled by hook
    }
  };

  return (
    <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
      <Breadcrumbs
        items={[
          { label: t('title'), href: `/${locale}/messages` },
          { label: t('newConversation') },
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

      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
          {t('newConversation')}
        </h1>
        <p className="text-base" style={{ color: cssVars.neutral.textSecondary }}>
          {t('newConversationDescription')}
        </p>
      </div>

      {/* Form */}
      <div
        className="rounded-2xl border-2 p-6"
        style={{
          backgroundColor: cssVars.neutral.surface,
          borderColor: cssVars.neutral.border,
        }}
      >
        {error && (
          <ErrorMessage error={error.message || String(error)} variant="inline" className="mb-4" />
        )}

        {/* Search Users */}
        <div className="mb-6">
          <label
            htmlFor="search"
            className="mb-2 block text-sm font-bold"
            style={{ color: cssVars.secondary.DEFAULT }}
          >
            {t('searchUsers')}
          </label>
          <Input
            type="text"
            id="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={Search}
            placeholder={t('searchUsersPlaceholder')}
            className="w-full"
          />
        </div>

        {/* Selected Users */}
        {selectedUsers.length > 0 && (
          <div className="mb-6">
            <label
              className="mb-2 block text-sm font-bold"
              style={{ color: cssVars.secondary.DEFAULT }}
            >
              {t('selectedUsers')} ({selectedUsers.length})
            </label>
            <div className="flex flex-wrap gap-2">
              {selectedUsers.map((userId) => {
                const user = mockUsers.find((u) => u.id === userId);
                return (
                  <div
                    key={userId}
                    className="flex items-center gap-2 rounded-lg border-2 px-3 py-2"
                    style={{
                      backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 10%, transparent)`,
                      borderColor: cssVars.primary.DEFAULT,
                    }}
                  >
                    <span
                      className="text-sm font-medium"
                      style={{ color: cssVars.secondary.DEFAULT }}
                    >
                      {user?.name}
                    </span>
                    <button
                      onClick={() => handleSelectUser(userId)}
                      className="text-xs"
                      style={{ color: cssVars.status.error }}
                    >
                      ×
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Users List */}
        {searchQuery && (
          <div className="mb-6 max-h-64 overflow-y-auto">
            <label
              className="mb-2 block text-sm font-bold"
              style={{ color: cssVars.secondary.DEFAULT }}
            >
              {t('users')}
            </label>
            <div className="space-y-2">
              {filteredUsers.length === 0 ? (
                <p className="text-sm" style={{ color: cssVars.neutral.textMuted }}>
                  {t('noUsersFound')}
                </p>
              ) : (
                filteredUsers.map((user) => (
                  <button
                    key={user.id}
                    onClick={() => handleSelectUser(user.id)}
                    className={`flex w-full items-center gap-3 rounded-xl border-2 p-3 transition-all ${
                      selectedUsers.includes(user.id) ? 'border-primary' : ''
                    }`}
                    style={{
                      backgroundColor: selectedUsers.includes(user.id)
                        ? `color-mix(in srgb, ${cssVars.primary.DEFAULT} 10%, transparent)`
                        : cssVars.neutral.surface,
                      borderColor: selectedUsers.includes(user.id)
                        ? cssVars.primary.DEFAULT
                        : cssVars.neutral.border,
                    }}
                  >
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-full"
                      style={{
                        backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 15%, transparent)`,
                      }}
                    >
                      <User className="h-5 w-5" style={{ color: cssVars.primary.DEFAULT }} />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
                        {user.name}
                      </p>
                      <p className="text-xs" style={{ color: cssVars.neutral.textMuted }}>
                        {user.email}
                      </p>
                    </div>
                    {selectedUsers.includes(user.id) && (
                      <div
                        className="flex h-6 w-6 items-center justify-center rounded-full"
                        style={{
                          backgroundColor: cssVars.primary.DEFAULT,
                          color: cssVars.neutral.bg,
                        }}
                      >
                        ✓
                      </div>
                    )}
                  </button>
                ))
              )}
            </div>
          </div>
        )}

        {/* Initial Message */}
        <div className="mb-6">
          <label
            htmlFor="initialMessage"
            className="mb-2 block text-sm font-bold"
            style={{ color: cssVars.secondary.DEFAULT }}
          >
            {t('initialMessage')} ({t('optional')})
          </label>
          <textarea
            id="initialMessage"
            value={initialMessage}
            onChange={(e) => setInitialMessage(e.target.value)}
            rows={4}
            className="w-full rounded-xl border-2 px-4 py-3 text-sm"
            style={{
              backgroundColor: cssVars.neutral.bg,
              borderColor: cssVars.neutral.border,
              color: cssVars.secondary.DEFAULT,
            }}
            placeholder={t('initialMessagePlaceholder')}
          />
        </div>

        {/* Submit Button */}
        <div className="flex gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            className="flex-1"
            style={{
              borderColor: cssVars.neutral.border,
              color: cssVars.neutral.textSecondary,
            }}
          >
            {t('cancel')}
          </Button>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
            <Button
              onClick={handleCreate}
              disabled={isLoading || selectedUsers.length === 0}
              className="w-full"
              style={{
                background: cssVars.gradient.gold,
                color: cssVars.secondary.DEFAULT,
              }}
            >
              {isLoading ? t('creating') : t('createConversation')}
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
