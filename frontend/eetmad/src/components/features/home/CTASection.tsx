// src/components/features/home/CTASection.tsx

'use client';

import PageContainer from '@/components/shared/layouts/PageContainer';
import Section from '@/components/shared/layouts/Section';
import { motion } from 'framer-motion';
import { ArrowRight, FileText, Gift } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

const CTASection: React.FC = () => {
  const t = useTranslations('home.cta');

  return (
    <Section background="primary" padding="xl">
      <PageContainer>
        <section
          className="relative overflow-hidden py-24"
          style={{ background: 'linear-gradient(135deg, #34656D 0%, #334443 100%)' }}
        >
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute right-0 top-0 h-96 w-96 rounded-full blur-3xl"
              style={{ background: '#FAEAB1' }}
            ></div>
            <div
              className="absolute bottom-0 left-0 h-96 w-96 rounded-full blur-3xl"
              style={{ background: '#34656D' }}
            ></div>
          </div>

          <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div
                className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-3xl shadow-2xl"
                style={{ background: 'linear-gradient(135deg, #FAEAB1 0%, #F7DD7D 100%)' }}
              >
                <FileText className="h-12 w-12" style={{ color: '#334443' }} />
              </div>

              <h2 className="mb-6 text-5xl font-bold" style={{ color: '#FAF8F1' }}>
                {t('title')}
              </h2>

              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center gap-3 rounded-2xl px-12 py-5 text-xl font-bold shadow-2xl transition-all"
                  style={{
                    background: 'linear-gradient(135deg, #FAEAB1 0%, #F7DD7D 100%)',
                    color: '#334443',
                  }}
                >
                  {t('primary')}
                  <ArrowRight className="h-6 w-6" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center gap-3 rounded-2xl border-2 px-12 py-5 text-xl font-bold transition-all"
                  style={{
                    borderColor: '#FAF8F1',
                    color: '#FAF8F1',
                    backgroundColor: 'transparent',
                  }}
                >
                  <Gift className="h-6 w-6" />
                  {t('secondary')}
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>
      </PageContainer>
    </Section>
  );
};

export default CTASection;
