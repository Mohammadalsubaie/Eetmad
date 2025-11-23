'use client';

import { GradientIcon, SectionHeader } from '@/components/ui';
import { cssVars } from '@/styles/theme';
import { motion } from 'framer-motion';
import { CheckCircle2, FileCheck, Lock, Shield, Star, UserCheck } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useTheme } from '@/contexts/ThemeContext';

const features = [
  { key: 'ratings', icon: Star, color: cssVars.accent.primary },
  { key: 'management', icon: FileCheck, color: cssVars.primary.DEFAULT },
  { key: 'documentation', icon: Lock, color: cssVars.status.success },
  { key: 'verification', icon: UserCheck, color: cssVars.secondary.DEFAULT },
] as const;

export default function TransparencySection() {
  const t = useTranslations('biddingPlatform.sections.transparency');
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section
      className="relative overflow-hidden py-20"
      style={{
        background: cssVars.gradient.hero,
      }}
    >
      {/* Background decorations */}
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

      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, ${cssVars.neutral.bg} 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="container relative">
        {/* Header */}
        <div className="mb-16">
          <SectionHeader
            badge={t('eyebrow')}
            badgeIcon={Shield}
            title={t('title')}
            subtitle={t('subtitle')}
            variant="dark"
            align="center"
            badgeColor="primary"
          />
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Main Content Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl border-2 p-10 shadow-2xl backdrop-blur-sm lg:col-span-2"
            style={{
              backgroundColor: `color-mix(in srgb, ${cssVars.neutral.surface} 95%, transparent)`,
              borderColor: `color-mix(in srgb, ${cssVars.neutral.bg} 40%, transparent)`,
            }}
          >
            {/* Gradient accent */}
            <div
              className="absolute end-0 top-0 h-64 w-64 -translate-y-32 translate-x-32 rounded-full opacity-10 blur-3xl"
              style={{ background: cssVars.gradient.gold }}
            />

            <div className="relative">
              <div className="mb-8 flex items-center gap-4">
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-2xl shadow-xl"
                  style={{ background: cssVars.gradient.gold }}
                >
                  <Shield
                    className="h-8 w-8"
                    style={{
                      color: isDark
                        ? cssVars.neutral.darker // في Dark Mode: #f0f5f4 (فاتح جداً) على gradient.gold
                        : cssVars.secondary.DEFAULT, // في Light Mode: #536765 (داكن) على gradient.gold
                    }}
                  />
                </div>
                <h3
                  className="text-3xl font-bold lg:text-4xl"
                  style={{
                    color: isDark
                      ? cssVars.neutral.darker // في Dark Mode: #f0f5f4 (فاتح جداً) على neutral.surface (داكن)
                      : cssVars.secondary.DEFAULT, // في Light Mode: #536765 (داكن) على neutral.surface (فاتح)
                  }}
                >
                  {t('mainCard.title')}
                </h3>
              </div>

              <p
                className="mb-8 text-xl leading-relaxed"
                style={{ color: cssVars.neutral.textSecondary }}
              >
                {t('mainCard.description')}
              </p>

              {/* Key Points */}
              <div className="grid gap-4 sm:grid-cols-2">
                {['point1', 'point2', 'point3', 'point4'].map((point, index) => (
                  <motion.div
                    key={point}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 rounded-2xl border-2 p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-md"
                    style={{
                      backgroundColor: cssVars.neutral.bg,
                      borderColor: `color-mix(in srgb, ${cssVars.status.success} 20%, transparent)`,
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
                    <p
                      className="text-base font-bold"
                      style={{
                        color: isDark
                          ? cssVars.neutral.darker // في Dark Mode: #f0f5f4 (فاتح جداً) على neutral.bg (داكن)
                          : cssVars.secondary.DEFAULT, // في Light Mode: #536765 (داكن) على neutral.bg (فاتح)
                      }}
                    >
                      {t(`mainCard.points.${point}`)}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Features Grid */}
          {features.map((feature, index) => (
            <motion.article
              key={feature.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group relative overflow-hidden rounded-3xl border-2 p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-2xl"
              style={{
                backgroundColor: `color-mix(in srgb, ${cssVars.neutral.surface} 90%, transparent)`,
                borderColor: `color-mix(in srgb, ${cssVars.neutral.bg} 30%, transparent)`,
              }}
            >
              {/* Gradient overlay */}
              <div
                className="absolute inset-0 translate-x-full opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-5"
                style={{
                  background: `linear-gradient(135deg, ${feature.color} 0%, transparent 100%)`,
                }}
              />

              <div className="relative">
                {/* Icon */}
                <div className="mb-6 transition-transform duration-300 group-hover:scale-110">
                  <GradientIcon
                    icon={feature.icon}
                    background={`linear-gradient(135deg, ${feature.color} 0%, color-mix(in srgb, ${feature.color} 60%, transparent) 100%)`}
                    size="md"
                    animated={false}
                  />
                </div>

                <h4
                  className="mb-3 text-xl font-bold"
                  style={{
                    color: isDark
                      ? cssVars.neutral.darker // في Dark Mode: #f0f5f4 (فاتح جداً) على neutral.surface (داكن)
                      : cssVars.secondary.DEFAULT, // في Light Mode: #536765 (داكن) على neutral.surface (فاتح)
                  }}
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
                  className="mt-6 h-1 w-0 rounded-full transition-all duration-500 group-hover:w-full"
                  style={{ backgroundColor: feature.color }}
                />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
