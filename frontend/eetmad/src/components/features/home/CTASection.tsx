// src/components/features/home/CTASection.tsx

'use client';

import PageContainer from '@/components/shared/layouts/PageContainer';
import { cssVars } from '@/styles/theme';
import { motion } from 'framer-motion';
import { ArrowRight, FileText, Gift } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
// test design
const CTASection: React.FC = () => {
  const t = useTranslations('home.cta');
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section
      className="relative overflow-hidden py-24"
      style={{ background: cssVars.gradient.cta }}
    >
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute right-0 top-0 h-96 w-96 rounded-full blur-3xl"
          style={{ background: cssVars.accent.primary }}
        ></div>
        <div
          className="absolute bottom-0 left-0 h-96 w-96 rounded-full blur-3xl"
          style={{ background: cssVars.primary.DEFAULT }}
        ></div>
      </div>

      <PageContainer>
        <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-3xl shadow-2xl"
              style={{ background: cssVars.gradient.gold }}
            >
              <FileText className="h-12 w-12" style={{ color: cssVars.secondary.DEFAULT }} />
            </div>

            <h2 
              className="mb-6 text-5xl font-bold" 
              style={{ 
                color: isDark 
                  ? cssVars.neutral.darker  // في Dark Mode: #f0f5f4 (فاتح جداً) على gradient.cta (فاتح قليلاً)
                  : cssVars.neutral.bg  // في Light Mode: #faf8f1 (فاتح) على gradient.cta (داكن)
              }}
            >
              {t('title')}
            </h2>

            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href="https://docs.google.com/forms/d/1NzAEs7uruIqcHz0NvVa-xstUp14G1hNig0jzmoyUomQ/edit"
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center gap-3 rounded-2xl px-12 py-5 text-xl font-bold shadow-2xl transition-all"
                  style={{
                    background: cssVars.gradient.gold,
                    color: cssVars.secondary.DEFAULT,
                  }}
                >
                  {t('primary')}
                  <ArrowRight className="h-6 w-6" />
                </motion.button>
              </a>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-3 rounded-2xl border-2 px-12 py-5 text-xl font-bold transition-all"
                style={{
                  borderColor: isDark ? cssVars.neutral.darker : cssVars.neutral.bg,
                  color: isDark ? cssVars.neutral.darker : cssVars.neutral.bg,
                  backgroundColor: 'transparent',
                }}
              >
                <Gift className="h-6 w-6" />
                {t('secondary')}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </PageContainer>
    </section>
  );
};

export default CTASection;
