'use client';

import { SectionHeader } from '@/components/ui';
import { cssVars } from '@/styles/theme';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

const faqKeys = ['timelines', 'offers', 'payments', 'quality'] as const;

export default function FAQSection() {
  const t = useTranslations('pages.faq');
  const [activeKey, setActiveKey] = useState<string | null>(faqKeys[0]);
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const toggleKey = (key: string) => {
    setActiveKey((prev) => (prev === key ? null : key));
  };

  return (
    <section
      className="relative overflow-hidden py-20"
      style={{
        background: cssVars.gradient.cta,
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

      <div className="container relative">
        <div className="mb-12">
          <SectionHeader
            badge={t('eyebrow')}
            badgeIcon={HelpCircle}
            title={t('title')}
            subtitle={t('subtitle')}
            variant="dark"
            align={isRTL ? 'right' : 'left'}
            badgeColor="warm"
            className="max-w-xl"
          />
        </div>

        <div className="space-y-4">
          {faqKeys.map((key, index) => {
            const isActive = activeKey === key;
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group overflow-hidden rounded-3xl border-2 shadow-xl backdrop-blur-sm transition-all duration-300 hover:shadow-2xl"
                style={{
                  backgroundColor: `color-mix(in srgb, ${cssVars.neutral.surface} 95%, transparent)`,
                  borderColor: isActive ? cssVars.primary.DEFAULT : cssVars.neutral.border,
                }}
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-8 py-6 text-end transition-all duration-300"
                  onClick={() => toggleKey(key)}
                  style={{
                    backgroundColor: isActive
                      ? `color-mix(in srgb, ${cssVars.primary.DEFAULT} 5%, transparent)`
                      : 'transparent',
                  }}
                >
                  <div className="flex flex-1 items-start gap-4 text-start">
                    <div
                      className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg font-bold transition-all duration-300"
                      style={{
                        backgroundColor: isActive
                          ? cssVars.primary.DEFAULT
                          : cssVars.neutral.surfaceAlt,
                        color: isActive 
                          ? cssVars.neutral.bg 
                          : (isDark ? cssVars.primary.darker : cssVars.primary.DEFAULT),  // في Dark Mode: #a4c5ca على #2d3433
                      }}
                    >
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p
                        className="mb-1 text-xl font-bold transition-colors duration-300"
                        style={{
                          color: isActive 
                            ? (isDark ? cssVars.primary.darker : cssVars.primary.DEFAULT)  // في Dark Mode: #a4c5ca على خلفية داكنة
                            : cssVars.secondary.DEFAULT,
                        }}
                      >
                        {t(`items.${key}.question`)}
                      </p>
                      <p className="text-sm" style={{ color: cssVars.neutral.textSecondary }}>
                        {t(`items.${key}.summary`)}
                      </p>
                    </div>
                  </div>
                  <div
                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl transition-all duration-300"
                    style={{
                      backgroundColor: isActive
                        ? cssVars.primary.DEFAULT
                        : cssVars.neutral.surfaceAlt,
                    }}
                  >
                    {isActive ? (
                      <ChevronUp className="h-5 w-5" style={{ color: cssVars.neutral.bg }} />
                    ) : (
                      <ChevronDown 
                        className="h-5 w-5" 
                        style={{ 
                          color: isDark 
                            ? cssVars.primary.darker  // في Dark Mode: #a4c5ca على #2d3433
                            : cssVars.primary.DEFAULT 
                        }} 
                      />
                    )}
                  </div>
                </button>

                <motion.div
                  initial={false}
                  animate={{
                    height: isActive ? 'auto' : 0,
                    opacity: isActive ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div
                    className="border-t px-8 pb-8 pt-6 text-base leading-relaxed"
                    style={{
                      borderColor: cssVars.neutral.border,
                      color: cssVars.neutral.textSecondary,
                    }}
                  >
                    {t(`items.${key}.answer`)}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
