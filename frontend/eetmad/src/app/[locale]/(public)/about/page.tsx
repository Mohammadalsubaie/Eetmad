'use client';

import { useTranslations } from 'next-intl';
import { cssVars } from '@/styles/theme';
import { motion } from 'framer-motion';

export default function AboutPage() {
  const t = useTranslations('biddingPlatform');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-12"
      style={{ backgroundColor: cssVars.neutral.bg, minHeight: '100vh' }}
    >
      <h1
        className="mb-6 text-center text-5xl font-extrabold"
        style={{ color: cssVars.secondary.DEFAULT }}
      >
        {t('about.title')}
      </h1>

      <p
        className="mx-auto mb-8 max-w-3xl text-center text-lg"
        style={{ color: cssVars.neutral.textSecondary }}
      >
        {t('about.description')}
      </p>

      <div className="mt-12 grid gap-10 md:grid-cols-2">
        <motion.div
          whileHover={{ y: -5 }}
          className="rounded-2xl p-8 shadow-lg"
          style={{
            backgroundColor: cssVars.neutral.surface,
            border: `1px solid ${cssVars.neutral.border}`,
          }}
        >
          <h2 className="mb-4 text-3xl font-bold" style={{ color: cssVars.primary.DEFAULT }}>
            {t('about.missionTitle')}
          </h2>
          <p className="text-md" style={{ color: cssVars.neutral.textSecondary }}>
            {t('about.missionDescription')}
          </p>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="rounded-2xl p-8 shadow-lg"
          style={{
            backgroundColor: cssVars.neutral.surface,
            border: `1px solid ${cssVars.neutral.border}`,
          }}
        >
          <h2 className="mb-4 text-3xl font-bold" style={{ color: cssVars.primary.DEFAULT }}>
            {t('about.visionTitle')}
          </h2>
          <p className="text-md" style={{ color: cssVars.neutral.textSecondary }}>
            {t('about.visionDescription')}
          </p>
        </motion.div>
      </div>

      <div className="mt-16 text-center">
        <h2 className="mb-6 text-4xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
          {t('about.ourValuesTitle')}
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="rounded-xl p-6"
            style={{
              background: cssVars.gradient.primary,
              color: cssVars.neutral.bg,
            }}
          >
            <p className="text-lg font-semibold" style={{ color: cssVars.neutral.white }}>
              {t('about.value1')}
            </p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="rounded-xl p-6"
            style={{
              background: cssVars.gradient.primary,
              color: cssVars.neutral.bg,
            }}
          >
            <p className="text-lg font-semibold" style={{ color: cssVars.neutral.white }}>
              {t('about.value2')}
            </p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="rounded-xl p-6"
            style={{
              background: cssVars.gradient.primary,
              color: cssVars.neutral.bg,
            }}
          >
            <p className="text-lg font-semibold" style={{ color: cssVars.neutral.white }}>
              {t('about.value3')}
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
