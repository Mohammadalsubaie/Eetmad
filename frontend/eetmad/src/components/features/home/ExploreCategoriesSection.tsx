'use client';

import { GradientIcon, SectionHeader } from '@/components/ui';
import { cssVars } from '@/styles/theme';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Factory, Laptop, Megaphone, PenTool } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

const categoryCards = [
  { key: 'techSolutions', icon: Laptop, color: cssVars.primary.DEFAULT },
  { key: 'creative', icon: PenTool, color: cssVars.primary.dark },
  { key: 'operations', icon: Factory, color: cssVars.status.success },
  { key: 'events', icon: Megaphone, color: cssVars.secondary.DEFAULT },
] as const;

export default function ExploreCategoriesSection() {
  const t = useTranslations('biddingPlatform.sections.exploreCategories');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  return (
    <section className="relative py-20" style={{ backgroundColor: cssVars.neutral.bg }}>
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <div
          className="absolute -end-20 top-0 h-96 w-96 rounded-full blur-3xl"
          style={{ background: cssVars.accent.primary }}
        />
        <div
          className="absolute -start-20 bottom-0 h-96 w-96 rounded-full blur-3xl"
          style={{ background: cssVars.primary.DEFAULT }}
        />
      </div>

      <div className="container relative">
        <div className="mb-16 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <SectionHeader
              badge={t('eyebrow')}
              title={t('title')}
              subtitle={t('subtitle')}
              variant="light"
              align={isRTL ? 'right' : 'left'}
              badgeColor="primary"
              badgeAnimated
            />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-3xl p-8 text-center shadow-2xl"
            style={{
              background: cssVars.gradient.primary,
              border: `2px solid ${cssVars.primary.light}`,
            }}
          >
            <div className="absolute inset-0 opacity-10">
              <div
                className="absolute end-0 top-0 h-24 w-24 rounded-full sm:h-32 sm:w-32"
                style={{ background: cssVars.neutral.bg }}
              />
            </div>
            <p
              className="relative text-sm font-bold uppercase tracking-[0.2em]"
              style={{ color: cssVars.neutral.textMuted }}
            >
              {t('insight.title')}
            </p>
            <h3 className="relative my-4 text-5xl font-black" style={{ color: cssVars.neutral.bg }}>
              {t('insight.value')}
            </h3>
            <p
              className="relative text-base font-semibold"
              style={{ color: cssVars.neutral.textMuted }}
            >
              {t('insight.description')}
            </p>
          </motion.div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {categoryCards.map((category, index) => (
            <motion.article
              key={category.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative flex h-full flex-col overflow-hidden rounded-3xl border-2 p-6 shadow-lg transition-all duration-300"
              style={{
                backgroundColor: cssVars.neutral.surface,
                borderColor: cssVars.neutral.border,
              }}
            >
              {/* Hover gradient effect */}
              <div
                className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-5"
                style={{
                  background: `linear-gradient(135deg, ${category.color} 0%, transparent 100%)`,
                }}
              />

              <div className="relative">
                <div className="mb-6 transition-all duration-300 group-hover:scale-110">
                  <GradientIcon
                    icon={category.icon}
                    background={`linear-gradient(135deg, ${category.color} 0%, color-mix(in srgb, ${category.color} 70%, transparent) 100%)`}
                    size="md"
                    animated={false}
                  />
                </div>
                <h3
                  className="mb-3 text-2xl font-bold"
                  style={{ color: cssVars.secondary.DEFAULT }}
                >
                  {t(`items.${category.key}.title`)}
                </h3>
                <p
                  className="flex-1 text-sm leading-relaxed"
                  style={{ color: cssVars.neutral.textSecondary }}
                >
                  {t(`items.${category.key}.description`)}
                </p>
                <div
                  className="mt-6 flex items-center justify-between rounded-2xl border-2 px-5 py-3 text-sm font-bold transition-all duration-300 group-hover:border-opacity-100"
                  style={{
                    backgroundColor: cssVars.neutral.bg,
                    borderColor: `color-mix(in srgb, ${category.color} 30%, transparent)`,
                    color: category.color,
                  }}
                >
                  <span>{t(`items.${category.key}.stat`)}</span>
                  {isRTL ? (
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  ) : (
                    <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
