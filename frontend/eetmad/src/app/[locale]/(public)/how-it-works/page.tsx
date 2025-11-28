'use client';

import { SectionHeader } from '@/components/ui';
import { cssVars } from '@/styles/theme';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  Inbox,
  Search,
  Send,
  UserPlus,
  Users,
} from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';

export default function HowItWorksPage() {
  const t = useTranslations('biddingPlatform.sections.gettingStarted');
  const tPages = useTranslations('pages');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const ownerSteps = [
    {
      icon: UserPlus,
      order: '1',
      title: t('cards.owners.steps.step1.title'),
      description: t('cards.owners.steps.step1.description'),
    },
    {
      icon: FileText,
      order: '2',
      title: t('cards.owners.steps.step2.title'),
      description: t('cards.owners.steps.step2.description'),
    },
    {
      icon: Inbox,
      order: '3',
      title: t('cards.owners.steps.step3.title'),
      description: t('cards.owners.steps.step3.description'),
    },
    {
      icon: CheckCircle2,
      order: '4',
      title: t('cards.owners.steps.step4.title'),
      description: t('cards.owners.steps.step4.description'),
    },
  ];

  const supplierSteps = [
    {
      icon: Users,
      order: '1',
      title: t('cards.providers.steps.step1.title'),
      description: t('cards.providers.steps.step1.description'),
    },
    {
      icon: ClipboardCheck,
      order: '2',
      title: t('cards.providers.steps.step2.title'),
      description: t('cards.providers.steps.step2.description'),
    },
    {
      icon: Search,
      order: '3',
      title: t('cards.providers.steps.step3.title'),
      description: t('cards.providers.steps.step3.description'),
    },
    {
      icon: Send,
      order: '4',
      title: t('cards.providers.steps.step4.title'),
      description: t('cards.providers.steps.step4.description'),
    },
  ];

  return (
    <div
      className="relative min-h-screen py-20"
      style={{
        backgroundColor: cssVars.neutral.bg,
      }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute start-0 top-1/4 h-96 w-96 rounded-full blur-3xl"
          style={{ background: cssVars.accent.primary }}
        />
        <div
          className="absolute bottom-1/4 end-0 h-96 w-96 rounded-full blur-3xl"
          style={{ background: cssVars.primary.DEFAULT }}
        />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: tPages('howItWorks.title') }]} className="mb-6" />
        {/* Header */}
        <div className="mb-16 text-center">
          <SectionHeader
            badge={t('eyebrow')}
            title={t('title')}
            subtitle={t('subtitle')}
            variant="light"
            align="center"
            badgeColor="warm"
            className="mx-auto max-w-3xl"
          />
        </div>

        {/* Two Column Layout */}
        <div className="grid gap-12 lg:grid-cols-2">
          {/* For Project Owners */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl border-2 p-8 shadow-xl"
            style={{
              backgroundColor: cssVars.neutral.surface,
              borderColor: cssVars.neutral.border,
            }}
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <span
                  className="mb-2 inline-block rounded-full px-4 py-1.5 text-sm font-bold"
                  style={{
                    backgroundColor: `color-mix(in srgb, ${cssVars.accent.warm} 20%, transparent)`,
                    color: cssVars.primary.DEFAULT,
                  }}
                >
                  {t('cards.owners.tagline')}
                </span>
                <h2
                  className="mb-2 text-3xl font-bold"
                  style={{ color: cssVars.secondary.DEFAULT }}
                >
                  {t('cards.owners.title')}
                </h2>
                <p className="text-base" style={{ color: cssVars.neutral.textSecondary }}>
                  {t('cards.owners.description')}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {ownerSteps.map((step, index) => (
                <motion.div
                  key={step.order}
                  initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: isRTL ? -4 : 4 }}
                  className="flex items-start gap-4 rounded-2xl p-4 transition-all"
                  style={{
                    backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 5%, transparent)`,
                  }}
                >
                  <div
                    className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl font-bold"
                    style={{
                      backgroundColor: cssVars.primary.DEFAULT,
                      color: cssVars.neutral.bg,
                    }}
                  >
                    <step.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <span
                        className="text-xs font-bold"
                        style={{ color: cssVars.primary.DEFAULT }}
                      >
                        {step.order}
                      </span>
                      <h3
                        className="text-lg font-bold"
                        style={{ color: cssVars.secondary.DEFAULT }}
                      >
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-sm" style={{ color: cssVars.neutral.textSecondary }}>
                      {step.description}
                    </p>
                  </div>
                  {index < ownerSteps.length - 1 && (
                    <ArrowRight
                      className="mt-2 h-5 w-5 flex-shrink-0"
                      style={{ color: cssVars.primary.DEFAULT }}
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* For Suppliers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-3xl border-2 p-8 shadow-xl"
            style={{
              backgroundColor: cssVars.neutral.surface,
              borderColor: cssVars.neutral.border,
            }}
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <span
                  className="mb-2 inline-block rounded-full px-4 py-1.5 text-sm font-bold"
                  style={{
                    backgroundColor: `color-mix(in srgb, ${cssVars.accent.warm} 20%, transparent)`,
                    color: cssVars.primary.DEFAULT,
                  }}
                >
                  {t('cards.providers.tagline')}
                </span>
                <h2
                  className="mb-2 text-3xl font-bold"
                  style={{ color: cssVars.secondary.DEFAULT }}
                >
                  {t('cards.providers.title')}
                </h2>
                <p className="text-base" style={{ color: cssVars.neutral.textSecondary }}>
                  {t('cards.providers.description')}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {supplierSteps.map((step, index) => (
                <motion.div
                  key={step.order}
                  initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: isRTL ? -4 : 4 }}
                  className="flex items-start gap-4 rounded-2xl p-4 transition-all"
                  style={{
                    backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 5%, transparent)`,
                  }}
                >
                  <div
                    className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl font-bold"
                    style={{
                      backgroundColor: cssVars.primary.DEFAULT,
                      color: cssVars.neutral.bg,
                    }}
                  >
                    <step.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <span
                        className="text-xs font-bold"
                        style={{ color: cssVars.primary.DEFAULT }}
                      >
                        {step.order}
                      </span>
                      <h3
                        className="text-lg font-bold"
                        style={{ color: cssVars.secondary.DEFAULT }}
                      >
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-sm" style={{ color: cssVars.neutral.textSecondary }}>
                      {step.description}
                    </p>
                  </div>
                  {index < supplierSteps.length - 1 && (
                    <ArrowRight
                      className="mt-2 h-5 w-5 flex-shrink-0"
                      style={{ color: cssVars.primary.DEFAULT }}
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
