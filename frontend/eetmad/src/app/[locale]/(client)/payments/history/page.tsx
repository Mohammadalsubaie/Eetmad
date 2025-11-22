'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import { usePaymentHistory } from '@/lib/hooks/usePayments';
import PaymentCard from '@/components/features/payments/PaymentCard';
import { LoadingSpinner, ErrorMessage, EmptyState } from '@/components/ui';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';
import { ResourceGrid } from '@/components/shared/data-display';

export default function PaymentHistoryPage() {
  const t = useTranslations('pages.payments');
  const locale = useLocale();
  const router = useRouter();
  const { data: payments, isLoading, error } = usePaymentHistory();

  if (isLoading) {
    return (
      <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
        <Breadcrumbs
          items={[{ label: t('title'), href: `/${locale}/payments` }, { label: t('history') }]}
          className="mb-6"
        />
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
        <Breadcrumbs
          items={[{ label: t('title'), href: `/${locale}/payments` }, { label: t('history') }]}
          className="mb-6"
        />
        <ErrorMessage error={error} variant="banner" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
      <Breadcrumbs
        items={[{ label: t('title'), href: `/${locale}/payments` }, { label: t('history') }]}
        className="mb-6"
      />

      {/* Back Button */}
      <motion.button
        whileHover={{ x: -4 }}
        onClick={() => router.back()}
        className="mb-6 flex items-center gap-2 text-sm font-medium"
        style={{ color: cssVars.primary.DEFAULT }}
      >
        <ArrowLeft className="h-4 w-4" />
        {t('back')}
      </motion.button>

      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
          {t('history')}
        </h1>
        <p className="text-base" style={{ color: cssVars.neutral.textSecondary }}>
          {t('historyDescription')}
        </p>
      </div>

      {/* Payments List */}
      {payments.length === 0 ? (
        <EmptyState title={t('noPayments')} description={t('noPaymentsDescription')} />
      ) : (
        <ResourceGrid columns={{ default: 1, md: 2, lg: 3 }}>
          {payments.map((payment) => (
            <PaymentCard key={payment.id} payment={payment} />
          ))}
        </ResourceGrid>
      )}
    </div>
  );
}
