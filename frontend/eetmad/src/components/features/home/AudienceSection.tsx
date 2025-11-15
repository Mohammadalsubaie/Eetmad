'use client';

import { cssVars } from '@/styles/theme';
import { motion } from 'framer-motion';
import { Building2, CheckCircle2, Sparkles, UserRound } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { SectionHeader, GradientIcon } from '@/components/ui';

const segments = [
  { key: 'individuals', icon: UserRound, gradient: cssVars.gradient.primary, accentColor: cssVars.primary.DEFAULT },
  { key: 'businesses', icon: Building2, gradient: cssVars.gradient.gold, accentColor: cssVars.secondary.DEFAULT },
] as const;

const listKeys = {
  individuals: ['furniture', 'design', 'events', 'maintenance', 'customNeeds'],
  businesses: ['tech', 'supply', 'office', 'eventManagement', 'retainer'],
} as const;

export default function AudienceSection() {
  const t = useTranslations('biddingPlatform.sections.audience');

  return (
    <section className="relative py-20" style={{ backgroundColor: cssVars.neutral.bg }}>
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <div
          className="absolute -start-32 top-0 h-[32rem] w-[32rem] rounded-full blur-3xl"
          style={{ background: cssVars.primary.DEFAULT }}
        />
        <div
          className="absolute -end-32 bottom-0 h-[32rem] w-[32rem] rounded-full blur-3xl"
          style={{ background: cssVars.accent.primary }}
        />
      </div>

      <div className="container relative">
        <div className="mb-16">
          <SectionHeader
            badge={t('eyebrow')}
            badgeIcon={Sparkles}
            title={t('title')}
            subtitle={t('subtitle')}
            variant="light"
            align="center"
            badgeColor="primary"
          />
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {segments.map((segment, index) => (
            <motion.article
              key={segment.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="group relative overflow-hidden rounded-3xl border-2 p-8 shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl"
              style={{
                backgroundColor: cssVars.neutral.surface,
                borderColor: cssVars.neutral.border,
              }}
            >
              {/* Animated gradient background */}
              <div
                className="absolute inset-0 translate-x-full opacity-0 transition-all duration-700 group-hover:translate-x-0 group-hover:opacity-10"
                style={{
                  background: segment.gradient,
                }}
              />

              {/* Top decorative element */}
              <div
                className="absolute end-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full opacity-20 blur-2xl transition-all duration-500 group-hover:scale-150"
                style={{ background: segment.accentColor }}
              />

              <div className="relative mb-8 flex items-center gap-5">
                <GradientIcon
                  icon={segment.icon}
                  background={segment.gradient}
                  size="lg"
                  animated
                />
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: segment.accentColor }}>
                    {t(`segments.${segment.key}.tagline`)}
                  </p>
                  <h3 className="text-3xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                    {t(`segments.${segment.key}.title`)}
                  </h3>
                </div>
              </div>

              <p className="relative mb-8 text-lg leading-relaxed" style={{ color: cssVars.neutral.textSecondary }}>
                {t(`segments.${segment.key}.description`)}
              </p>

              <div className="relative space-y-3">
                {listKeys[segment.key].map((itemKey, itemIndex) => (
                  <motion.div
                    key={itemKey}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.15 + itemIndex * 0.05 }}
                    className="flex items-start gap-4 rounded-2xl border-2 p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-md"
                    style={{
                      backgroundColor: cssVars.neutral.bg,
                      borderColor: `color-mix(in srgb, ${segment.accentColor} 20%, transparent)`,
                    }}
                  >
                    <div
                      className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full"
                      style={{ backgroundColor: `color-mix(in srgb, ${segment.accentColor} 15%, transparent)` }}
                    >
                      <CheckCircle2 className="h-4 w-4" style={{ color: segment.accentColor }} />
                    </div>
                    <p className="flex-1 text-base font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                      {t(`segments.${segment.key}.items.${itemKey}`)}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Bottom accent line */}
              <div
                className="absolute bottom-0 start-0 h-1 w-0 transition-all duration-700 group-hover:w-full"
                style={{ background: segment.gradient }}
              />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}


