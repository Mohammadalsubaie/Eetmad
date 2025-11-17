'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import { useTranslations } from 'next-intl';
import type { FAQ } from '@/lib/types/content.types';

interface FAQItemProps {
  faq: FAQ;
}

export default function FAQItem({ faq }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('faq'); // Assuming 'faq' namespace for translations

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <motion.div
      initial={false}
      animate={{ backgroundColor: isOpen ? cssVars.neutral.surfaceAlt : cssVars.neutral.surface }}
      transition={{ duration: 0.3 }}
      className="rounded-lg border mb-4 overflow-hidden"
      style={{
        borderColor: cssVars.neutral.border,
      }}
    >
      <button
        className="flex justify-between items-center w-full p-4 text-left"
        onClick={toggleOpen}
        style={{ color: cssVars.secondary.DEFAULT }}
      >
        <h3 className="font-semibold text-lg">
          {t.raw(`questions.${faq.id}`) || faq.questionEn}
        </h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown size={24} color={cssVars.neutral.textMuted} />
        </motion.div>
      </button>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <div className="p-4 pt-0" style={{ color: cssVars.neutral.textSecondary }}>
          <p>{t.raw(`answers.${faq.id}`) || faq.answerEn}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
