'use client';

import { useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { cssVars } from '@/styles/theme';
import { ArrowLeft, User as UserIcon } from 'lucide-react';
import AdminPageHeader from '@/components/shared/admin/AdminPageHeader';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';

export default function CreateUserPage() {
  const router = useRouter();
  const t = useTranslations('admin');
  const tPages = useTranslations('pages');
  const locale = useLocale();

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: tPages('admin.title'), href: `/${locale}/admin` },
          { label: tPages('users.title'), href: `/${locale}/admin/users` },
          { label: tPages('new.title') },
        ]}
        className="mb-6"
      />

      {/* Header */}
      <div className="mb-4 flex items-start gap-2 sm:mb-6 sm:items-center sm:gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.back()}
          className="flex-shrink-0 rounded-xl p-2 transition-all"
          style={{
            backgroundColor: `color-mix(in srgb, ${cssVars.neutral.border} 30%, transparent)`,
          }}
        >
          <ArrowLeft
            className="h-4 w-4 sm:h-5 sm:w-5"
            style={{ color: cssVars.neutral.textSecondary }}
          />
        </motion.button>
        <div className="min-w-0 flex-1">
          <AdminPageHeader
            title={t('users.create.title') || t('users.actions.addUser')}
            description={t('users.create.description') || t('users.description')}
            icon={UserIcon}
          />
        </div>
      </div>

      {/* Form Placeholder */}
      <motion.div
        className="rounded-xl border-2 p-4 shadow-md sm:rounded-2xl sm:p-6"
        style={{
          backgroundColor: cssVars.neutral.surface,
          borderColor: cssVars.neutral.border,
        }}
      >
        <p style={{ color: cssVars.neutral.textSecondary }}>
          {/* TODO: Implement user creation form */}
          {t('users.create.comingSoon') || 'User creation form will be implemented here'}
        </p>
      </motion.div>
    </div>
  );
}

