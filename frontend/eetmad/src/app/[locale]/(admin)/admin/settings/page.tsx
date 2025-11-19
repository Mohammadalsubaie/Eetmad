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
      title: 'الإعدادات العامة',
      icon: Globe,
      color: cssVars.primary.DEFAULT,
    },
    {
      id: 'payment',
      title: 'إعدادات الدفع',
      icon: DollarSign,
      color: cssVars.status.success,
    },
    {
      id: 'email',
      title: 'إعدادات البريد',
      icon: Mail,
      color: cssVars.status.info,
    },
    {
      id: 'security',
      title: 'الأمان والخصوصية',
      icon: Shield,
      color: cssVars.status.warning,
    },
    {
      id: 'notifications',
      title: 'الإشعارات',
      icon: Bell,
      color: cssVars.accent.primary,
    },
    {
      id: 'database',
      title: 'قاعدة البيانات',
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
          />
        }
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {settingsSections.map((section) => (
          <motion.div
            key={section.id}
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
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
        className="mt-8 rounded-2xl border-2 p-8 shadow-md"
        style={{
          backgroundColor: cssVars.neutral.surface,
          borderColor: cssVars.neutral.border,
        }}
      >
        <h2 className="mb-6 text-2xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
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
