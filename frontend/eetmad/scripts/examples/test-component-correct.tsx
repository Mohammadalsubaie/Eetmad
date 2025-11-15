/**
 * ملف مثال صحيح يتبع جميع قواعد البناء
 * يستخدم cssVars و useTranslations و framer-motion
 */

'use client';

import { useState } from 'react';
import { cssVars } from '@/styles/theme';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

interface TestComponentProps {
  title?: string;
  description?: string;
}

export default function TestComponentCorrect({ 
  title, 
  description 
}: TestComponentProps) {
  const t = useTranslations('test');
  const [count, setCount] = useState(0);

  return (
    <div
      className="container mx-auto p-4"
      // ✅ صحيح: استخدام cssVars
      style={{
        backgroundColor: cssVars.neutral.bg,
        color: cssVars.secondary.DEFAULT,
      }}
    >
      {/* ✅ صحيح: استخدام useTranslations */}
      <h1 
        className="mb-4 text-4xl font-bold"
        style={{ color: cssVars.secondary.DEFAULT }}
      >
        {title || t('welcomeTitle')}
      </h1>
      
      {/* ✅ صحيح: استخدام useTranslations */}
      <p 
        className="text-lg"
        style={{ color: cssVars.neutral.textSecondary }}
      >
        {description || t('welcomeDescription')}
      </p>

      <div
        // ✅ صحيح: استخدام color-mix للشفافية
        style={{
          backgroundColor: `color-mix(in srgb, ${cssVars.secondary.DEFAULT} 95%, transparent)`,
          padding: '20px',
          borderRadius: '1rem',
          borderColor: cssVars.neutral.border,
        }}
      >
        {/* ✅ صحيح: استخدام logical properties (ms/me) */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="ms-4 me-2 rounded-xl px-6 py-3"
          style={{
            backgroundColor: cssVars.primary.DEFAULT,
            color: cssVars.neutral.bg,
          }}
          onClick={() => setCount(count + 1)}
        >
          {t('clickButton')}
        </motion.button>

        {/* ✅ صحيح: استخدام cssVars */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-4"
          style={{
            backgroundColor: cssVars.neutral.surface,
            color: cssVars.secondary.DEFAULT,
            borderRadius: '0.5rem',
          }}
        >
          <span>{t('countLabel', { count })}</span>
        </motion.div>
      </div>

      {/* ✅ صحيح: استخدام gradient من cssVars */}
      <motion.div
        whileHover={{ y: -8 }}
        className="mt-6 rounded-2xl p-6"
        style={{
          background: cssVars.gradient.gold,
          color: cssVars.secondary.DEFAULT,
        }}
      >
        <p>{t('featureDescription')}</p>
      </motion.div>
    </div>
  );
}

