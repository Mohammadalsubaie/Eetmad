'use client';

import { GradientIcon, SectionHeader } from '@/components/ui';
import { cssVars } from '@/styles/theme';
import { motion } from 'framer-motion';
import { Award, CheckCircle2, Lightbulb, Rocket, Shield, Zap } from 'lucide-react';
import { useTranslations } from 'next-intl';

const features = [
  { key: 'modern', icon: Rocket, color: cssVars.primary.DEFAULT },
  { key: 'secure', icon: Shield, color: cssVars.status.success },
  { key: 'smart', icon: Lightbulb, color: cssVars.primary.dark },
  { key: 'trusted', icon: Award, color: cssVars.secondary.DEFAULT },
] as const;

const highlights = ['postRequests', 'receiveOffers', 'manageCompetition', 'smartContract'] as const;

export default function PlatformOverviewSection() {
  const t = useTranslations('biddingPlatform.sections.platformOverview');

  return (
    <section
      className="relative overflow-hidden py-20"
      style={{
        background: `linear-gradient(to bottom, ${cssVars.neutral.bg} 0%, ${cssVars.neutral.surface} 100%)`,
      }}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute start-1/4 top-0 h-96 w-96 rounded-full blur-3xl"
          style={{ background: cssVars.primary.DEFAULT }}
        />
        <div
          className="absolute bottom-0 end-1/4 h-96 w-96 rounded-full blur-3xl"
          style={{ background: cssVars.accent.primary }}
        />
      </div>

      {/* Dot pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, ${cssVars.secondary.DEFAULT} 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="container relative">
        <div className="mb-16">
          <SectionHeader
            badge={t('eyebrow')}
            badgeIcon={Zap}
            title={t('title')}
            subtitle={t('subtitle')}
            variant="light"
            align="center"
            badgeColor="primary"
          />
        </div>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Main content card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl border-2 p-8 shadow-2xl lg:p-10"
            style={{
              backgroundColor: cssVars.neutral.surface,
              borderColor: cssVars.neutral.border,
            }}
          >
            {/* Gradient accent */}
            <div
              className="absolute end-0 top-0 h-48 w-48 -translate-y-24 translate-x-24 rounded-full opacity-10 blur-3xl"
              style={{ background: cssVars.gradient.primary }}
            />

            <div className="relative">
              <div className="mb-6 inline-flex items-center gap-3">
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg"
                  style={{ background: cssVars.gradient.gold }}
                >
                  <Lightbulb className="h-7 w-7" style={{ color: cssVars.secondary.DEFAULT }} />
                </div>
                <h3
                  className="text-2xl font-bold lg:text-3xl"
                  style={{ color: cssVars.secondary.DEFAULT }}
                >
                  {t('mainCard.title')}
                </h3>
              </div>

              <p
                className="mb-8 text-lg leading-relaxed"
                style={{ color: cssVars.neutral.textSecondary }}
              >
                {t('mainCard.description')}
              </p>

              {/* Highlights list */}
              <div className="space-y-4">
                {highlights.map((highlight, index) => (
                  <motion.div
                    key={highlight}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4 rounded-2xl border-2 p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-md"
                    style={{
                      backgroundColor: cssVars.neutral.bg,
                      borderColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 20%, transparent)`,
                    }}
                  >
                    <div
                      className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full"
                      style={{
                        backgroundColor: `color-mix(in srgb, ${cssVars.status.success} 20%, transparent)`,
                      }}
                    >
                      <CheckCircle2 className="h-4 w-4" style={{ color: cssVars.status.success }} />
                    </div>
                    <p className="text-base font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                      {t(`mainCard.highlights.${highlight}`)}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Features grid */}
          <div className="grid gap-6 sm:grid-cols-2">
            {features.map((feature, index) => (
              <motion.article
                key={feature.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group relative overflow-hidden rounded-3xl border-2 p-6 shadow-lg transition-all duration-300 hover:shadow-xl"
                style={{
                  backgroundColor: cssVars.neutral.surface,
                  borderColor: cssVars.neutral.border,
                }}
              >
                {/* Gradient overlay on hover */}
                <div
                  className="absolute inset-0 translate-y-full opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-5"
                  style={{
                    background: `linear-gradient(135deg, ${feature.color} 0%, transparent 100%)`,
                  }}
                />

                <div className="relative">
                  <div className="mb-5 transition-transform duration-300 group-hover:scale-110">
                    <GradientIcon
                      icon={feature.icon}
                      background={`linear-gradient(135deg, ${feature.color} 0%, color-mix(in srgb, ${feature.color} 60%, transparent) 100%)`}
                      size="md"
                      animated={false}
                    />
                  </div>

                  <h4
                    className="mb-3 text-xl font-bold"
                    style={{ color: cssVars.secondary.DEFAULT }}
                  >
                    {t(`features.${feature.key}.title`)}
                  </h4>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: cssVars.neutral.textSecondary }}
                  >
                    {t(`features.${feature.key}.description`)}
                  </p>

                  {/* Bottom accent line */}
                  <div
                    className="mt-5 h-1 w-0 rounded-full transition-all duration-500 group-hover:w-full"
                    style={{ backgroundColor: feature.color }}
                  />
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
