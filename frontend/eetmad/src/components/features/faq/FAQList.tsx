'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { cssVars } from '@/styles/theme';
import { faqApi } from '@/lib/api/faq';
import type { FAQ } from '@/lib/types/content.types';
import FAQItem from './FAQItem';
import EmptyState from '@/components/shared/data-display/EmptyState';

export default function FAQList() {
  const t = useTranslations('faq');
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    try {
      const data = await faqApi.getAll();
      setFaqs(data);
    } catch (err) {
      console.error('Failed to fetch FAQs:', err);
      setError(t('fetchError'));
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div style={{ color: cssVars.neutral.textSecondary }}>{t('loading')}</div>;
  }

  if (error) {
    return <div style={{ color: cssVars.status.error }}>{error}</div>;
  }

  if (faqs.length === 0) {
    return <EmptyState message={t('noFaqsFound')} />;
  }

  return (
    <div className="space-y-4">
      {faqs.map((faq) => (
        <FAQItem key={faq.id} faq={faq} />
      ))}
    </div>
  );
}
