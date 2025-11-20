'use client';

import { useParams, useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { cssVars } from '@/styles/theme';
import { ArrowLeft, CreditCard } from 'lucide-react';
import { usePayment } from '@/lib/hooks/usePayments';
import { LoadingSpinner, ErrorMessage } from '@/components/ui';
import AdminPageHeader from '@/components/shared/admin/AdminPageHeader';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';
import PaymentOverviewCard from '@/components/features/payments/PaymentOverviewCard';
import PaymentInfoSection from '@/components/features/payments/PaymentInfoSection';
import PaymentTransactionSection from '@/components/features/payments/PaymentTransactionSection';
import PaymentProjectSection from '@/components/features/payments/PaymentProjectSection';
import PaymentNotesSection from '@/components/features/payments/PaymentNotesSection';
import PaymentFailureSection from '@/components/features/payments/PaymentFailureSection';

export default function PaymentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const t = useTranslations('admin');
  const tPages = useTranslations('pages');
  const locale = useLocale();
  const paymentId = params.id as string;

  const { payment, isLoading, error } = usePayment(paymentId);

  if (isLoading) {
    return (
      <div>
        <Breadcrumbs
          items={[
            { label: tPages('admin.title'), href: `/${locale}/admin` },
            { label: tPages('payments.title'), href: `/${locale}/admin/payments` },
            { label: paymentId },
          ]}
          className="mb-6"
        />
        <div className="flex h-64 items-center justify-center">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  if (error || !payment) {
    return (
      <div>
        <Breadcrumbs
          items={[
            { label: tPages('admin.title'), href: `/${locale}/admin` },
            { label: tPages('payments.title'), href: `/${locale}/admin/payments` },
            { label: paymentId },
          ]}
          className="mb-6"
        />
        <div className="flex h-64 items-center justify-center">
          <ErrorMessage
            error={error?.message || t('payments.notFound')}
            variant="banner"
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: tPages('admin.title'), href: `/${locale}/admin` },
          { label: tPages('payments.title'), href: `/${locale}/admin/payments` },
          { label: payment.transactionId },
        ]}
        className="mb-6"
      />
      {/* Header */}
      <div className="mb-6 flex items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.back()}
          className="rounded-xl p-2 transition-all"
          style={{
            backgroundColor: `color-mix(in srgb, ${cssVars.neutral.border} 30%, transparent)`,
          }}
        >
          <ArrowLeft className="h-5 w-5" style={{ color: cssVars.neutral.textSecondary }} />
        </motion.button>
        <AdminPageHeader
          title={t('payments.detail.title', { id: payment.transactionId })}
          description={t('payments.detail.description')}
          icon={CreditCard}
        />
      </div>

      <PaymentOverviewCard payment={payment} />

      {/* Details Sections */}
      <div className="grid gap-6 lg:grid-cols-2">
        <PaymentInfoSection payment={payment} />
        <PaymentTransactionSection payment={payment} />
        <PaymentProjectSection payment={payment} />
        <PaymentNotesSection payment={payment} />
        <PaymentFailureSection payment={payment} />
      </div>
    </div>
  );
}
