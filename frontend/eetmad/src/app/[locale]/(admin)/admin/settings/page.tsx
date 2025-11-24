'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { cssVars } from '@/styles/theme';
import { Settings, Save, Globe, DollarSign, Mail, Shield, Bell, Database } from 'lucide-react';
import AdminPageHeader from '@/components/shared/admin/AdminPageHeader';
import AdminActionButton from '@/components/shared/admin/AdminActionButton';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';

export default function AdminSettingsPage() {
  const t = useTranslations('admin');
  const tPages = useTranslations('pages');
  const locale = useLocale();

  const settingsSections = [
    {
      id: 'general',
      title: t('settings.sections.general'),
      icon: Globe,
      color: cssVars.primary.DEFAULT,
    },
    {
      id: 'payment',
      title: t('settings.sections.payment'),
      icon: DollarSign,
      color: cssVars.status.success,
    },
    {
      id: 'email',
      title: t('settings.sections.email'),
      icon: Mail,
      color: cssVars.status.info,
    },
    {
      id: 'security',
      title: t('settings.sections.security'),
      icon: Shield,
      color: cssVars.status.warning,
    },
    {
      id: 'notifications',
      title: t('settings.sections.notifications'),
      icon: Bell,
      color: cssVars.accent.primary,
    },
    {
      id: 'database',
      title: t('settings.sections.database'),
      icon: Database,
      color: cssVars.secondary.DEFAULT,
    },
  ];

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: tPages('admin.title'), href: `/${locale}/admin` },
          { label: tPages('settings.title') },
        ]}
        className="mb-6"
      />

      <AdminPageHeader
        title={t('settings.title')}
        description={t('settings.description')}
        icon={Settings}
        action={
          <AdminActionButton
            label={t('settings.actions.saveChanges')}
            icon={Save}
            variant="primary"
            size="sm"
            onClick={() => {
              // TODO: Implement save settings action
              console.log('Save settings');
            }}
          />
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {settingsSections.map((section) => (
          <motion.div
            key={section.id}
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              // TODO: Implement navigation to specific settings section or open modal
              console.log(`Open ${section.id} settings`);
            }}
            className="cursor-pointer rounded-2xl border-2 p-6 shadow-md transition-all"
            style={{
              backgroundColor: cssVars.neutral.surface,
              borderColor: cssVars.neutral.border,
            }}
          >
            <div className="mb-4 flex items-center gap-4">
              <div
                className="flex h-14 w-14 items-center justify-center rounded-xl shadow-md"
                style={{
                  backgroundColor: `color-mix(in srgb, ${section.color} 15%, transparent)`,
                }}
              >
                <section.icon className="h-7 w-7" style={{ color: section.color }} />
              </div>
              <h3 className="text-lg font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                {section.title}
              </h3>
            </div>
            <p className="text-sm" style={{ color: cssVars.neutral.textSecondary }}>
              إدارة {section.title.toLowerCase()}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Settings Form Placeholder */}
      <motion.div
        className="mt-6 rounded-xl border-2 p-4 shadow-md sm:mt-8 sm:rounded-2xl sm:p-6 lg:p-8"
        style={{
          backgroundColor: cssVars.neutral.surface,
          borderColor: cssVars.neutral.border,
        }}
      >
        <h2
          className="mb-4 text-xl font-bold sm:mb-6 sm:text-2xl"
          style={{ color: cssVars.secondary.DEFAULT }}
        >
          الإعدادات العامة
        </h2>

        <div className="space-y-6">
          <div>
            <label
              className="mb-2 block text-sm font-semibold"
              style={{ color: cssVars.secondary.DEFAULT }}
            >
              اسم المنصة
            </label>
            <input
              type="text"
              defaultValue="منصة اعتماد"
              className="w-full rounded-xl border-2 px-4 py-3 outline-none transition-all focus:border-opacity-100"
              style={{
                backgroundColor: cssVars.neutral.bg,
                borderColor: cssVars.neutral.border,
                color: cssVars.secondary.DEFAULT,
              }}
            />
          </div>

          <div>
            <label
              className="mb-2 block text-sm font-semibold"
              style={{ color: cssVars.secondary.DEFAULT }}
            >
              البريد الإلكتروني للدعم
            </label>
            <input
              type="email"
              defaultValue="support@eetmad.sa"
              className="w-full rounded-xl border-2 px-4 py-3 outline-none transition-all focus:border-opacity-100"
              style={{
                backgroundColor: cssVars.neutral.bg,
                borderColor: cssVars.neutral.border,
                color: cssVars.secondary.DEFAULT,
              }}
            />
          </div>

          <div>
            <label
              className="mb-2 block text-sm font-semibold"
              style={{ color: cssVars.secondary.DEFAULT }}
            >
              رقم الهاتف
            </label>
            <input
              type="tel"
              defaultValue="+966500000000"
              className="w-full rounded-xl border-2 px-4 py-3 outline-none transition-all focus:border-opacity-100"
              style={{
                backgroundColor: cssVars.neutral.bg,
                borderColor: cssVars.neutral.border,
                color: cssVars.secondary.DEFAULT,
              }}
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="maintenance"
              className="h-5 w-5 rounded"
              defaultChecked={false}
            />
            <label
              htmlFor="maintenance"
              className="text-sm font-semibold"
              style={{ color: cssVars.secondary.DEFAULT }}
            >
              تفعيل وضع الصيانة
            </label>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
