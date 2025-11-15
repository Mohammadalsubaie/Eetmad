'use client';

import { cssVars } from '@/styles/theme';
import { motion } from 'framer-motion';
import {
  Activity,
  ArrowRight,
  Building2,
  DollarSign,
  Play,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

const HeroSection: React.FC = () => {
  const t = useTranslations('home.hero');

  const stats = [
    { key: 'activeProjects', icon: Activity },
    { key: 'totalValue', icon: DollarSign },
    { key: 'government', icon: Building2 },
    { key: 'successRate', icon: TrendingUp },
  ];

  return (
    <section
      className="relative overflow-hidden py-20"
      style={{
        background: `linear-gradient(180deg, ${cssVars.primary.DEFAULT} 0%, ${cssVars.primary.dark} 100%)`,
      }}
    >
      {/* Background Decorative Blurs */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute right-20 top-20 h-96 w-96 rounded-full blur-3xl"
          style={{ background: cssVars.accent.warm }}
        ></div>
        <div
          className="absolute bottom-20 left-20 h-96 w-96 rounded-full blur-3xl"
          style={{ background: cssVars.primary.dark }}
        ></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <div
              className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2"
              style={{
                backgroundColor: `color-mix(in srgb, ${cssVars.accent.warm} 15%, transparent)`,
                border: `1px solid color-mix(in srgb, ${cssVars.accent.warm} 30%, transparent)`,
              }}
            >
              <Sparkles className="h-4 w-4" style={{ color: cssVars.accent.warm }} />
              <span className="text-sm font-bold" style={{ color: cssVars.accent.warm }}>
                {t('badge')}
              </span>
            </div>

            {/* Main Heading */}
            <h1
              className="mb-6 text-5xl font-bold leading-tight lg:text-6xl xl:text-7xl"
              style={{ color: cssVars.neutral.bg }}
            >
              {t('title')} <span style={{ color: cssVars.accent.warm }}>{t('titleHighlight')}</span>{' '}
              {t('titleEnd')}
            </h1>

            {/* Subtitle */}
            <p
              className="mb-10 text-xl leading-relaxed lg:text-2xl"
              style={{ color: cssVars.accent.DEFAULT }}
            >
              {t('subtitle')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 rounded-2xl px-10 py-4 text-lg font-bold shadow-2xl transition-all"
                style={{
                  background: cssVars.gradient.gold,
                  color: cssVars.primary.DEFAULT,
                }}
              >
                {t('exploreButton')}
                <ArrowRight className="h-6 w-6" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 rounded-2xl border-2 px-10 py-4 text-lg font-bold transition-all"
                style={{
                  borderColor: cssVars.accent.DEFAULT,
                  color: cssVars.neutral.bg,
                  backgroundColor: 'transparent',
                }}
              >
                <Play className="h-6 w-6" />
                {t('videoButton')}
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="rounded-2xl border p-6 backdrop-blur-sm"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderColor: `color-mix(in srgb, ${cssVars.accent.DEFAULT} 20%, transparent)`,
                }}
              >
                <div className="mb-4 flex items-center justify-between">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{
                      backgroundColor: `color-mix(in srgb, ${cssVars.accent.warm} 20%, transparent)`,
                    }}
                  >
                    <Icon className="h-6 w-6" style={{ color: cssVars.accent.warm }} />
                  </div>
                  <div
                    className="flex items-center gap-1 rounded-lg px-2.5 py-1"
                    style={{
                      backgroundColor: `color-mix(in srgb, ${cssVars.status.success} 20%, transparent)`,
                    }}
                  >
                    <TrendingUp className="h-3.5 w-3.5" style={{ color: cssVars.status.success }} />
                    <span className="text-xs font-bold" style={{ color: cssVars.status.success }}>
                      {t(`stats.${stat.key}.change`)}
                    </span>
                  </div>
                </div>
                <div className="mb-1 text-3xl font-bold" style={{ color: cssVars.neutral.bg }}>
                  {t(`stats.${stat.key}.value`)}
                </div>
                <div className="text-sm font-semibold" style={{ color: cssVars.accent.DEFAULT }}>
                  {t(`stats.${stat.key}.label`)}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
