'use client';

import { useTranslations, useLocale } from 'next-intl';
import { cssVars } from '@/styles/theme';
import ContactForm from '@/components/features/contact/ContactForm';
import { motion } from 'framer-motion';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';

export default function ContactPage() {
  const t = useTranslations('pages.contact');
  const tPages = useTranslations('pages');
  const locale = useLocale();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="flex min-h-screen flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8"
      style={{ backgroundColor: cssVars.neutral.bg }}
    >
      <Breadcrumbs items={[{ label: t('title') }]} className="mb-6" />

      <div className="w-full max-w-md space-y-8">
        <h1
          className="text-center text-5xl font-extrabold"
          style={{ color: cssVars.primary.DEFAULT }}
        >
          {t('pageTitle')}
        </h1>
        <p className="mt-2 text-center text-lg" style={{ color: cssVars.neutral.textSecondary }}>
          {t('pageDescription')}
        </p>
        <ContactForm />
      </div>
    </motion.div>
  );
}
