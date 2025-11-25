'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Lock,
  Bell,
  Trash2,
  AlertTriangle,
  Mail,
  Smartphone,
  MessageSquare,
} from 'lucide-react';
import { cssVars } from '@/styles/theme';
import {
  useProfile,
  useChangePassword,
  useUpdateNotificationPreferences,
  useDeleteAccount,
} from '@/lib/hooks/useUsers';
import { LoadingSpinner, ErrorMessage, Button, Switch } from '@/components/ui';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';
import Input from '@/components/ui/Input/Input';

export default function ProfileSettingsPage() {
  const t = useTranslations('pages.profile');
  const locale = useLocale();
  const router = useRouter();
  const { data: profile, isLoading: loadingProfile } = useProfile();
  const {
    mutate: changePassword,
    isLoading: changingPassword,
    error: passwordError,
  } = useChangePassword();
  const { mutate: updatePreferences, isLoading: updatingPreferences } =
    useUpdateNotificationPreferences();
  const { mutate: deleteAccount, isLoading: deletingAccount } = useDeleteAccount();

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [notificationPrefs, setNotificationPrefs] = useState({
    email: {
      requests: false,
      offers: false,
      messages: false,
      reviews: false,
      system: false,
    },
    push: {
      requests: false,
      offers: false,
      messages: false,
      reviews: false,
      system: false,
    },
    sms: {
      important: false,
      security: false,
    },
  });

  useEffect(() => {
    if (profile?.notificationPreferences) {
      // Use setTimeout to avoid synchronous setState in effect
      const timer = setTimeout(() => {
        setNotificationPrefs({
          email: {
            requests: profile.notificationPreferences.email?.requests || false,
            offers: profile.notificationPreferences.email?.offers || false,
            messages: profile.notificationPreferences.email?.messages || false,
            reviews: profile.notificationPreferences.email?.reviews || false,
            system: profile.notificationPreferences.email?.system || false,
          },
          push: {
            requests: profile.notificationPreferences.push?.requests || false,
            offers: profile.notificationPreferences.push?.offers || false,
            messages: profile.notificationPreferences.push?.messages || false,
            reviews: profile.notificationPreferences.push?.reviews || false,
            system: profile.notificationPreferences.push?.system || false,
          },
          sms: {
            important: profile.notificationPreferences.sms?.important || false,
            security: profile.notificationPreferences.sms?.security || false,
          },
        });
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [profile]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert(t('passwordsDoNotMatch'));
      return;
    }
    try {
      await changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      alert(t('passwordChanged'));
    } catch {
      // Error handled by hook
    }
  };

  const handleNotificationChange = (category: 'email' | 'push' | 'sms', key: string) => {
    setNotificationPrefs((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: !prev[category][key as keyof (typeof prev)[typeof category]],
      },
    }));
  };

  const handleSaveNotifications = async () => {
    try {
      await updatePreferences(notificationPrefs);
      alert(t('preferencesSaved'));
    } catch {
      // Error handled by hook
    }
  };

  const handleDeleteAccount = async () => {
    if (confirm(t('confirmDeleteAccount'))) {
      if (confirm(t('confirmDeleteAccountFinal'))) {
        try {
          await deleteAccount();
          router.push(`/${locale}/`);
        } catch {
          // Error handled by hook
        }
      }
    }
  };

  if (loadingProfile) {
    return (
      <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
        <Breadcrumbs
          items={[{ label: t('title'), href: `/${locale}/profile` }, { label: t('settings') }]}
          className="mb-6"
        />
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
      <Breadcrumbs
        items={[{ label: t('title'), href: `/${locale}/profile` }, { label: t('settings') }]}
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
        <h1 className="text-4xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
          {t('settings')}
        </h1>
        <p className="mt-2 text-base" style={{ color: cssVars.neutral.textSecondary }}>
          {t('settingsDescription')}
        </p>
      </div>

      <div className="space-y-6">
        {/* Change Password */}
        <div
          className="rounded-2xl border-2 p-6"
          style={{
            backgroundColor: cssVars.neutral.surface,
            borderColor: cssVars.neutral.border,
          }}
        >
          <div className="mb-4 flex items-center gap-3">
            <Lock className="h-6 w-6" style={{ color: cssVars.primary.DEFAULT }} />
            <h2 className="text-xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
              {t('changePassword')}
            </h2>
          </div>
          {passwordError && (
            <ErrorMessage error={passwordError.message || String(passwordError)} variant="inline" />
          )}
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="currentPassword"
                className="mb-2 block text-sm font-bold"
                style={{ color: cssVars.secondary.DEFAULT }}
              >
                {t('currentPassword')}
              </label>
              <Input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                required
                className="w-full"
              />
            </div>
            <div>
              <label
                htmlFor="newPassword"
                className="mb-2 block text-sm font-bold"
                style={{ color: cssVars.secondary.DEFAULT }}
              >
                {t('newPassword')}
              </label>
              <Input
                type="password"
                id="newPassword"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                required
                minLength={8}
                className="w-full"
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-bold"
                style={{ color: cssVars.secondary.DEFAULT }}
              >
                {t('confirmPassword')}
              </label>
              <Input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                required
                className="w-full"
              />
            </div>
            <Button
              type="submit"
              disabled={changingPassword}
              style={{
                background: cssVars.gradient.gold,
                color: cssVars.secondary.DEFAULT,
              }}
            >
              {changingPassword ? t('changing') : t('changePassword')}
            </Button>
          </form>
        </div>

        {/* Notification Preferences */}
        <div
          className="rounded-2xl border-2 p-6"
          style={{
            backgroundColor: cssVars.neutral.surface,
            borderColor: cssVars.neutral.border,
          }}
        >
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl"
                style={{
                  background: `linear-gradient(135deg, ${cssVars.primary.DEFAULT}15, ${cssVars.primary.light}15)`,
                }}
              >
                <Bell className="h-6 w-6" style={{ color: cssVars.primary.DEFAULT }} />
              </div>
              <div>
                <h2 className="text-xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                  {t('notificationPreferences')}
                </h2>
                <p className="mt-1 text-sm" style={{ color: cssVars.neutral.textSecondary }}>
                  اختر كيف تريد تلقي الإشعارات
                </p>
              </div>
            </div>
            <Button
              onClick={handleSaveNotifications}
              disabled={updatingPreferences}
              variant="primary"
              icon={updatingPreferences ? undefined : Bell}
            >
              {updatingPreferences ? t('saving') : t('save')}
            </Button>
          </div>

          <div className="space-y-6">
            {/* Email Notifications */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="rounded-xl border p-5"
              style={{
                backgroundColor: cssVars.neutral.surfaceAlt,
                borderColor: cssVars.neutral.border,
              }}
            >
              <div className="mb-4 flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg"
                  style={{
                    backgroundColor: `${cssVars.primary.DEFAULT}15`,
                  }}
                >
                  <Mail className="h-5 w-5" style={{ color: cssVars.primary.DEFAULT }} />
                </div>
                <div>
                  <h3 className="text-base font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                    {t('emailNotifications')}
                  </h3>
                  <p className="text-xs" style={{ color: cssVars.neutral.textSecondary }}>
                    تلقي الإشعارات عبر البريد الإلكتروني
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                {Object.entries(notificationPrefs.email).map(([key, value]) => {
                  const descriptions: Record<string, string> = {
                    requests: 'إشعارات عند استلام طلبات جديدة',
                    offers: 'إشعارات عند استلام عروض جديدة',
                    messages: 'إشعارات عند استلام رسائل جديدة',
                    reviews: 'إشعارات عند تلقي تقييمات جديدة',
                    system: 'إشعارات النظام والتحديثات المهمة',
                  };
                  return (
                    <Switch
                      key={key}
                      id={`email-${key}`}
                      checked={value}
                      onCheckedChange={() => handleNotificationChange('email', key)}
                      label={t(`notifications.${key}`)}
                      description={descriptions[key]}
                      size="md"
                    />
                  );
                })}
              </div>
            </motion.div>

            {/* Push Notifications */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="rounded-xl border p-5"
              style={{
                backgroundColor: cssVars.neutral.surfaceAlt,
                borderColor: cssVars.neutral.border,
              }}
            >
              <div className="mb-4 flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg"
                  style={{
                    backgroundColor: `${cssVars.primary.DEFAULT}15`,
                  }}
                >
                  <Smartphone className="h-5 w-5" style={{ color: cssVars.primary.DEFAULT }} />
                </div>
                <div>
                  <h3 className="text-base font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                    {t('pushNotifications')}
                  </h3>
                  <p className="text-xs" style={{ color: cssVars.neutral.textSecondary }}>
                    تلقي الإشعارات الفورية على جهازك
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                {Object.entries(notificationPrefs.push).map(([key, value]) => {
                  const descriptions: Record<string, string> = {
                    requests: 'إشعارات فورية عند استلام طلبات جديدة',
                    offers: 'إشعارات فورية عند استلام عروض جديدة',
                    messages: 'إشعارات فورية عند استلام رسائل جديدة',
                    reviews: 'إشعارات فورية عند تلقي تقييمات جديدة',
                    system: 'إشعارات فورية للنظام والتحديثات المهمة',
                  };
                  return (
                    <Switch
                      key={key}
                      id={`push-${key}`}
                      checked={value}
                      onCheckedChange={() => handleNotificationChange('push', key)}
                      label={t(`notifications.${key}`)}
                      description={descriptions[key]}
                      size="md"
                    />
                  );
                })}
              </div>
            </motion.div>

            {/* SMS Notifications */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="rounded-xl border p-5"
              style={{
                backgroundColor: cssVars.neutral.surfaceAlt,
                borderColor: cssVars.neutral.border,
              }}
            >
              <div className="mb-4 flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg"
                  style={{
                    backgroundColor: `${cssVars.primary.DEFAULT}15`,
                  }}
                >
                  <MessageSquare className="h-5 w-5" style={{ color: cssVars.primary.DEFAULT }} />
                </div>
                <div>
                  <h3 className="text-base font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                    {t('smsNotifications')}
                  </h3>
                  <p className="text-xs" style={{ color: cssVars.neutral.textSecondary }}>
                    تلقي الإشعارات المهمة عبر الرسائل النصية
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                {Object.entries(notificationPrefs.sms).map(([key, value]) => {
                  const descriptions: Record<string, string> = {
                    important: 'إشعارات مهمة عبر الرسائل النصية',
                    security: 'إشعارات الأمان والتحقق عبر الرسائل النصية',
                  };
                  return (
                    <Switch
                      key={key}
                      id={`sms-${key}`}
                      checked={value}
                      onCheckedChange={() => handleNotificationChange('sms', key)}
                      label={t(`notifications.${key}`)}
                      description={descriptions[key]}
                      size="md"
                    />
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Danger Zone */}
        <div
          className="rounded-2xl border-2 p-6"
          style={{
            backgroundColor: `color-mix(in srgb, ${cssVars.status.error} 10%, transparent)`,
            borderColor: cssVars.status.error,
          }}
        >
          <div className="mb-4 flex items-center gap-3">
            <AlertTriangle className="h-6 w-6" style={{ color: cssVars.status.error }} />
            <h2 className="text-xl font-bold" style={{ color: cssVars.status.error }}>
              {t('dangerZone')}
            </h2>
          </div>
          <p className="mb-4 text-sm" style={{ color: cssVars.neutral.textSecondary }}>
            {t('deleteAccountWarning')}
          </p>
          <Button
            onClick={handleDeleteAccount}
            disabled={deletingAccount}
            variant="outline"
            icon={Trash2}
            style={{
              borderColor: cssVars.status.error,
              color: cssVars.status.error,
            }}
          >
            {deletingAccount ? t('deleting') : t('deleteAccount')}
          </Button>
        </div>
      </div>
    </div>
  );
}
