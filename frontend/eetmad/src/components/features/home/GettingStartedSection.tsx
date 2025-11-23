'use client';

import { GradientIcon, SectionHeader } from '@/components/ui';
import { cssVars } from '@/styles/theme';
import { motion } from 'framer-motion';
import { ArrowLeft, ClipboardList, Handshake, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useTheme } from '@/contexts/ThemeContext';

const cards = [
  {
    key: 'owners',
    icon: ClipboardList,
    gradient: cssVars.gradient.primary,
    accentColor: cssVars.primary.DEFAULT,
  },
  {
    key: 'providers',
    icon: Handshake,
    gradient: cssVars.gradient.cta,
    accentColor: cssVars.secondary.DEFAULT,
  },
] as const;

const stepKeys = ['step1', 'step2', 'step3', 'step4'] as const;

export default function GettingStartedSection() {
  const t = useTranslations('biddingPlatform.sections.gettingStarted');
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section
      className="relative overflow-hidden py-20"
      style={{
        background: cssVars.gradient.hero,
      }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute start-1/4 top-0 h-96 w-96 rounded-full blur-3xl"
          style={{ background: cssVars.accent.primary }}
        />
        <div
          className="absolute bottom-0 end-1/4 h-96 w-96 rounded-full blur-3xl"
          style={{ background: cssVars.accent.warm }}
        />
      </div>

      <div className="container relative">
        <div className="mb-16">
          <SectionHeader
            badge={t('eyebrow')}
            badgeIcon={Sparkles}
            title={t('title')}
            subtitle={t('subtitle')}
            variant="dark"
            align="center"
            badgeColor="accent"
          />
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {cards.map((card, index) => (
            <motion.article
              key={card.key}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="hover:shadow-3xl group relative overflow-hidden rounded-3xl border-2 p-8 shadow-2xl backdrop-blur-sm transition-all duration-300"
              style={{
                backgroundColor: `color-mix(in srgb, ${cssVars.neutral.surface} 90%, transparent)`,
                borderColor: `color-mix(in srgb, ${cssVars.neutral.bg} 30%, transparent)`,
              }}
            >
              {/* Gradient overlay on hover */}
              <div
                className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-10"
                style={{
                  background: card.gradient,
                }}
              />

              <div className="relative mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <GradientIcon icon={card.icon} background={card.gradient} size="md" animated />
                  <div>
                    <p
                      className="text-xs font-bold uppercase tracking-[0.3em]"
                      style={{ 
                        color: isDark 
                          ? cssVars.primary.darker  // في Dark Mode: #a4c5ca (فاتح) على #242929 (داكن)
                          : cssVars.primary.DEFAULT  // في Light Mode: #34656d (داكن) على #ffffff (فاتح)
                      }}
                    >
                      {t(`cards.${card.key}.tagline`)}
                    </p>
                    <h3
                      className="text-2xl font-bold lg:text-3xl"
                      style={{ color: cssVars.secondary.DEFAULT }}
                    >
                      {t(`cards.${card.key}.title`)}
                    </h3>
                  </div>
                </div>
                <div
                  className="inline-flex items-center gap-2 rounded-full border-2 px-5 py-2 text-sm font-bold shadow-lg"
                  style={{
                    backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 15%, transparent)`,
                    borderColor: cssVars.primary.DEFAULT,
                    color: isDark 
                      ? cssVars.primary.darker  // في Dark Mode: #a4c5ca (فاتح) على خلفية داكنة
                      : cssVars.primary.DEFAULT,  // في Light Mode: #34656d (داكن) على خلفية فاتحة
                  }}
                >
                  <div
                    className="h-2 w-2 animate-pulse rounded-full"
                    style={{ 
                      backgroundColor: isDark 
                        ? cssVars.primary.darker 
                        : cssVars.primary.DEFAULT 
                    }}
                  />
                  {t(`cards.${card.key}.badge`)}
                </div>
              </div>

              <p
                className="relative mb-8 text-base leading-relaxed"
                style={{ color: cssVars.neutral.textSecondary }}
              >
                {t(`cards.${card.key}.description`)}
              </p>

              <div className="relative space-y-3">
                {stepKeys.map((stepKey, stepIndex) => (
                  <motion.div
                    key={stepKey}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.15 + stepIndex * 0.05 }}
                    className="flex items-start gap-4 rounded-2xl border-2 bg-gradient-to-r p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                    style={{
                      borderColor: `color-mix(in srgb, ${card.accentColor} 20%, transparent)`,
                      background: `linear-gradient(to right, ${cssVars.neutral.bg}, ${cssVars.neutral.surface})`,
                    }}
                  >
                    <span
                      className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-base font-bold shadow-md"
                      style={{
                        background: card.gradient,
                        color: cssVars.neutral.bg,
                      }}
                    >
                      {t(`cards.${card.key}.steps.${stepKey}.order`)}
                    </span>
                    <div className="flex-1">
                      <p
                        className="mb-1 text-base font-bold"
                        style={{ color: cssVars.secondary.DEFAULT }}
                      >
                        {t(`cards.${card.key}.steps.${stepKey}.title`)}
                      </p>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: cssVars.neutral.textSecondary }}
                      >
                        {t(`cards.${card.key}.steps.${stepKey}.description`)}
                      </p>
                    </div>
                    <ArrowLeft
                      className="mt-1 h-5 w-5 flex-shrink-0 opacity-50 transition-all duration-300 group-hover:-translate-x-1 group-hover:opacity-100"
                      style={{ color: card.accentColor }}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
