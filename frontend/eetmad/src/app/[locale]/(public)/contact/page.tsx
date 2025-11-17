'use client';

import { useTranslations } from 'next-intl';
import { cssVars } from '@/styles/theme';
import ContactForm from '@/components/features/contact/ContactForm';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const t = useTranslations('pages.contact');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: cssVars.neutral.bg }}
    >
      <div className="max-w-md w-full space-y-8">
        <h1
          className="text-5xl font-extrabold text-center"
          style={{ color: cssVars.primary.DEFAULT }}
        >
          {t('pageTitle')}
        </h1>
        <p
          className="mt-2 text-center text-lg"
          style={{ color: cssVars.neutral.textSecondary }}
        >
          {t('pageDescription')}
        </p>
        <ContactForm />
      </div>
    </motion.div>
  );
}