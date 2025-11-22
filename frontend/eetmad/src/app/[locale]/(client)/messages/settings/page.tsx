'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowLeft, Bell, BellOff, Mail, MessageSquare } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import { Button } from '@/components/ui';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';

export default function MessagesSettingsPage() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('pages.messages');
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    soundEnabled: true,
    autoMarkAsRead: false,
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
    // TODO: Save to API
  };

  return (
    <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
      <Breadcrumbs
        items={[
          { label: t('title'), href: `/${locale}/messages` },
          { label: t('settings') },
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
          {t('settings')}
        </h1>
        <p className="text-base" style={{ color: cssVars.neutral.textSecondary }}>
          {t('settingsDescription')}
        </p>
      </div>

      {/* Settings */}
      <div className="space-y-4">
        {/* Email Notifications */}
        <div
          className="rounded-2xl border-2 p-6"
          style={{
            backgroundColor: cssVars.neutral.surface,
            borderColor: cssVars.neutral.border,
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5" style={{ color: cssVars.primary.DEFAULT }} />
              <div>
                <h3 className="font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                  {t('emailNotifications')}
                </h3>
                <p className="text-sm" style={{ color: cssVars.neutral.textSecondary }}>
                  {t('emailNotificationsDescription')}
                </p>
              </div>
            </div>
            <button
              onClick={() => handleToggle('emailNotifications')}
              className={`relative h-6 w-11 rounded-full transition-colors ${
                settings.emailNotifications ? 'bg-primary' : 'bg-neutral-border'
              }`}
              style={{
                backgroundColor: settings.emailNotifications
                  ? cssVars.primary.DEFAULT
                  : cssVars.neutral.border,
              }}
            >
              <span
                className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                  settings.emailNotifications ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Push Notifications */}
        <div
          className="rounded-2xl border-2 p-6"
          style={{
            backgroundColor: cssVars.neutral.surface,
            borderColor: cssVars.neutral.border,
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5" style={{ color: cssVars.primary.DEFAULT }} />
              <div>
                <h3 className="font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                  {t('pushNotifications')}
                </h3>
                <p className="text-sm" style={{ color: cssVars.neutral.textSecondary }}>
                  {t('pushNotificationsDescription')}
                </p>
              </div>
            </div>
            <button
              onClick={() => handleToggle('pushNotifications')}
              className={`relative h-6 w-11 rounded-full transition-colors ${
                settings.pushNotifications ? 'bg-primary' : 'bg-neutral-border'
              }`}
              style={{
                backgroundColor: settings.pushNotifications
                  ? cssVars.primary.DEFAULT
                  : cssVars.neutral.border,
              }}
            >
              <span
                className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                  settings.pushNotifications ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Sound */}
        <div
          className="rounded-2xl border-2 p-6"
          style={{
            backgroundColor: cssVars.neutral.surface,
            borderColor: cssVars.neutral.border,
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MessageSquare className="h-5 w-5" style={{ color: cssVars.primary.DEFAULT }} />
              <div>
                <h3 className="font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                  {t('soundEnabled')}
                </h3>
                <p className="text-sm" style={{ color: cssVars.neutral.textSecondary }}>
                  {t('soundEnabledDescription')}
                </p>
              </div>
            </div>
            <button
              onClick={() => handleToggle('soundEnabled')}
              className={`relative h-6 w-11 rounded-full transition-colors ${
                settings.soundEnabled ? 'bg-primary' : 'bg-neutral-border'
              }`}
              style={{
                backgroundColor: settings.soundEnabled
                  ? cssVars.primary.DEFAULT
                  : cssVars.neutral.border,
              }}
            >
              <span
                className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                  settings.soundEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Auto Mark as Read */}
        <div
          className="rounded-2xl border-2 p-6"
          style={{
            backgroundColor: cssVars.neutral.surface,
            borderColor: cssVars.neutral.border,
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BellOff className="h-5 w-5" style={{ color: cssVars.primary.DEFAULT }} />
              <div>
                <h3 className="font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                  {t('autoMarkAsRead')}
                </h3>
                <p className="text-sm" style={{ color: cssVars.neutral.textSecondary }}>
                  {t('autoMarkAsReadDescription')}
                </p>
              </div>
            </div>
            <button
              onClick={() => handleToggle('autoMarkAsRead')}
              className={`relative h-6 w-11 rounded-full transition-colors ${
                settings.autoMarkAsRead ? 'bg-primary' : 'bg-neutral-border'
              }`}
              style={{
                backgroundColor: settings.autoMarkAsRead
                  ? cssVars.primary.DEFAULT
                  : cssVars.neutral.border,
              }}
            >
              <span
                className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                  settings.autoMarkAsRead ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

