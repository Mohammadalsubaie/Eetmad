'use client';

import { useTranslations } from 'next-intl';
import { useFaq } from '@/lib/hooks/useFaq';
import FAQItem from './FAQItem';
import { EmptyState, LoadingSpinner, ErrorMessage } from '@/components/ui';

export default function FAQList() {
  const t = useTranslations('faq');
  const { data: faqs, isLoading, error } = useFaq();

  if (isLoading) {
    return <LoadingSpinner text={t('loading')} />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  if (faqs.length === 0) {
    return <EmptyState title={t('noFaqsFound')} />;
  }

  return (
    <div className="space-y-4">
      {faqs.map((faq) => (
        <FAQItem key={faq.id} faq={faq} />
      ))}
    </div>
  );
}
