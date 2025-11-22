'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowLeft, Bell, Mail, MessageSquare, Smartphone } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import { Button } from '@/components/ui';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';

export default function NotificationsSettingsPage() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('pages.notifications');
  const [settings, setSettings] = useState({
    inApp: true,
    email: true,
    sms: false,
    push: true,
    requestNotifications: true,
    offerNotifications: true,
    projectNotifications: true,
    messageNotifications: true,
    paymentNotifications: true,
    contractNotifications: true,
    disputeNotifications: true,
    systemNotifications: true,
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
    // TODO: Save to API - PUT /users/me/notification-preferences
  };

  return (
    <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
      <Breadcrumbs
        items={[{ label: t('title'), href: `/${locale}/notifications` }, { label: t('settings') }]}
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

      {/* Channel Settings */}
      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
          {t('channels')}
        </h2>
        <div className="space-y-4">
          {/* In-App Notifications */}
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
                    {t('inAppNotifications')}
                  </h3>
                  <p className="text-sm" style={{ color: cssVars.neutral.textSecondary }}>
                    {t('inAppNotificationsDescription')}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleToggle('inApp')}
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  settings.inApp ? 'bg-primary' : 'bg-neutral-border'
                }`}
                style={{
                  backgroundColor: settings.inApp
                    ? cssVars.primary.DEFAULT
                    : cssVars.neutral.border,
                }}
              >
                <span
                  className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                    settings.inApp ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

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
                onClick={() => handleToggle('email')}
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  settings.email ? 'bg-primary' : 'bg-neutral-border'
                }`}
                style={{
                  backgroundColor: settings.email
                    ? cssVars.primary.DEFAULT
                    : cssVars.neutral.border,
                }}
              >
                <span
                  className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                    settings.email ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* SMS Notifications */}
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
                    {t('smsNotifications')}
                  </h3>
                  <p className="text-sm" style={{ color: cssVars.neutral.textSecondary }}>
                    {t('smsNotificationsDescription')}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleToggle('sms')}
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  settings.sms ? 'bg-primary' : 'bg-neutral-border'
                }`}
                style={{
                  backgroundColor: settings.sms ? cssVars.primary.DEFAULT : cssVars.neutral.border,
                }}
              >
                <span
                  className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                    settings.sms ? 'translate-x-5' : 'translate-x-0'
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
                <Smartphone className="h-5 w-5" style={{ color: cssVars.primary.DEFAULT }} />
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
                onClick={() => handleToggle('push')}
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  settings.push ? 'bg-primary' : 'bg-neutral-border'
                }`}
                style={{
                  backgroundColor: settings.push ? cssVars.primary.DEFAULT : cssVars.neutral.border,
                }}
              >
                <span
                  className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                    settings.push ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Type Settings */}
      <div>
        <h2 className="mb-4 text-2xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
          {t('notificationTypes')}
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {[
            { key: 'requestNotifications', label: t('requestNotifications') },
            { key: 'offerNotifications', label: t('offerNotifications') },
            { key: 'projectNotifications', label: t('projectNotifications') },
            { key: 'messageNotifications', label: t('messageNotifications') },
            { key: 'paymentNotifications', label: t('paymentNotifications') },
            { key: 'contractNotifications', label: t('contractNotifications') },
            { key: 'disputeNotifications', label: t('disputeNotifications') },
            { key: 'systemNotifications', label: t('systemNotifications') },
          ].map(({ key, label }) => (
            <div
              key={key}
              className="flex items-center justify-between rounded-xl border-2 p-4"
              style={{
                backgroundColor: cssVars.neutral.surface,
                borderColor: cssVars.neutral.border,
              }}
            >
              <span className="font-medium" style={{ color: cssVars.secondary.DEFAULT }}>
                {label}
              </span>
              <button
                onClick={() => handleToggle(key as keyof typeof settings)}
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  settings[key as keyof typeof settings] ? 'bg-primary' : 'bg-neutral-border'
                }`}
                style={{
                  backgroundColor: settings[key as keyof typeof settings]
                    ? cssVars.primary.DEFAULT
                    : cssVars.neutral.border,
                }}
              >
                <span
                  className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                    settings[key as keyof typeof settings] ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
