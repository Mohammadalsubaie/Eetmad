'use client';

import { GradientIcon, SectionHeader } from '@/components/ui';
import { cssVars } from '@/styles/theme';
import { motion } from 'framer-motion';
import { Building2, Home, Package, Sparkles, TrendingUp } from 'lucide-react';
import { useTranslations } from 'next-intl';

const stories = [
  {
    key: 'smallBusiness',
    icon: Building2,
    color: cssVars.primary.DEFAULT,
    stat: '12',
    statLabel: 'عرض',
    time: '24',
  },
  {
    key: 'individual',
    icon: Home,
    color: cssVars.status.success,
    stat: '7',
    statLabel: 'عروض',
    time: '48',
  },
  {
    key: 'enterprise',
    icon: Package,
    color: cssVars.accent.primary,
    stat: '15',
    statLabel: 'عرض',
    time: '36',
  },
] as const;

export default function SuccessStoriesSection() {
  const t = useTranslations('biddingPlatform.sections.successStories');

  return (
    <section className="relative py-20" style={{ backgroundColor: cssVars.neutral.bg }}>
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <div
          className="absolute -start-20 top-0 h-96 w-96 rounded-full blur-3xl"
          style={{ background: cssVars.primary.DEFAULT }}
        />
        <div
          className="absolute -end-20 bottom-0 h-96 w-96 rounded-full blur-3xl"
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

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {stories.map((story, index) => (
            <motion.article
              key={story.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative overflow-hidden rounded-3xl border-2 p-8 shadow-lg transition-all duration-300 hover:shadow-2xl"
              style={{
                backgroundColor: cssVars.neutral.surface,
                borderColor: cssVars.neutral.border,
              }}
            >
              {/* Gradient background on hover */}
              <div
                className="absolute inset-0 translate-y-full opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-5"
                style={{
                  background: `linear-gradient(135deg, ${story.color} 0%, transparent 100%)`,
                }}
              />

              {/* Top corner decoration */}
              <div
                className="absolute -end-6 -top-6 h-24 w-24 rounded-full opacity-20 blur-2xl transition-all duration-500 group-hover:scale-150"
                style={{ background: story.color }}
              />

              <div className="relative">
                {/* Icon */}
                <div className="mb-6">
                  <GradientIcon
                    icon={story.icon}
                    background={`linear-gradient(135deg, ${story.color} 0%, color-mix(in srgb, ${story.color} 60%, transparent) 100%)`}
                    size="md"
                    animated={false}
                  />
                </div>

                {/* Story title */}
                <h3
                  className="mb-4 text-2xl font-bold leading-tight"
                  style={{ color: cssVars.secondary.DEFAULT }}
                >
                  {t(`stories.${story.key}.title`)}
                </h3>

                {/* Story description */}
                <p
                  className="mb-6 text-base leading-relaxed"
                  style={{ color: cssVars.neutral.textSecondary }}
                >
                  {t(`stories.${story.key}.description`)}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-4">
                  <div
                    className="flex items-center gap-2 rounded-2xl border-2 px-5 py-3"
                    style={{
                      backgroundColor: cssVars.neutral.bg,
                      borderColor: `color-mix(in srgb, ${story.color} 30%, transparent)`,
                    }}
                  >
                    <span className="text-3xl font-black" style={{ color: story.color }}>
                      {story.stat}
                    </span>
                    <span
                      className="text-sm font-bold"
                      style={{ color: cssVars.neutral.textSecondary }}
                    >
                      {story.statLabel}
                    </span>
                  </div>

                  <div
                    className="flex items-center gap-2 rounded-2xl px-4 py-2"
                    style={{
                      backgroundColor: `color-mix(in srgb, ${story.color} 10%, transparent)`,
                    }}
                  >
                    <TrendingUp className="h-4 w-4" style={{ color: story.color }} />
                    <span className="text-sm font-bold" style={{ color: story.color }}>
                      {t('withinHours', { hours: story.time })}
                    </span>
                  </div>
                </div>

                {/* Bottom accent line */}
                <div
                  className="mt-6 h-1 w-0 rounded-full transition-all duration-500 group-hover:w-full"
                  style={{ backgroundColor: story.color }}
                />
              </div>
            </motion.article>
          ))}
        </div>

        {/* Bottom stats banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 overflow-hidden rounded-3xl border-2 p-8 text-center shadow-xl"
          style={{
            background: cssVars.gradient.gold,
            borderColor: cssVars.accent.primary,
          }}
        >
          <div className="flex flex-col items-center gap-6 md:flex-row md:justify-around">
            <div>
              <p className="text-4xl font-black" style={{ color: cssVars.secondary.DEFAULT }}>
                500+
              </p>
              <p className="text-base font-bold" style={{ color: cssVars.neutral.textSecondary }}>
                {t('totalProjects')}
              </p>
            </div>
            <div
              className="hidden h-16 w-px md:block"
              style={{ backgroundColor: cssVars.neutral.textMuted }}
            />
            <div>
              <p className="text-4xl font-black" style={{ color: cssVars.secondary.DEFAULT }}>
                95%
              </p>
              <p className="text-base font-bold" style={{ color: cssVars.neutral.textSecondary }}>
                {t('satisfactionRate')}
              </p>
            </div>
            <div
              className="hidden h-16 w-px md:block"
              style={{ backgroundColor: cssVars.neutral.textMuted }}
            />
            <div>
              <p className="text-4xl font-black" style={{ color: cssVars.secondary.DEFAULT }}>
                48
              </p>
              <p className="text-base font-bold" style={{ color: cssVars.neutral.textSecondary }}>
                {t('avgResponseTime')}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
