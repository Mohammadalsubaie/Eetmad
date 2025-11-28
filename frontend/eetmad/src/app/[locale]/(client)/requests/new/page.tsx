'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import RequestForm from '@/components/features/requests/RequestForm';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';

export default function NewRequestPage() {
  const t = useTranslations('pages.requests');
  const tPages = useTranslations('pages');
  const locale = useLocale();
  const router = useRouter();

  return (
    <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
      <Breadcrumbs
        items={[{ label: t('title'), href: `/${locale}/requests` }, { label: tPages('new.title') }]}
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
          {t('createRequest')}
        </h1>
        <p className="text-base" style={{ color: cssVars.neutral.textSecondary }}>
          {t('createRequestSubtitle')}
        </p>
      </div>

      {/* Form Card */}
      <div
        className="rounded-2xl border-2 p-8"
        style={{ backgroundColor: cssVars.neutral.surface, borderColor: cssVars.neutral.border }}
      >
        <RequestForm />
      </div>
    </div>
  );
}
