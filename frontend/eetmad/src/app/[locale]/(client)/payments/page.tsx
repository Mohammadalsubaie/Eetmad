'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Plus, Wallet, History } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import { usePayments, usePendingPayments } from '@/lib/hooks/usePayments';
import PaymentCard from '@/components/features/payments/PaymentCard';
import { Button, EmptyState, LoadingSpinner, ErrorMessage } from '@/components/ui';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';
import { ResourceGrid } from '@/components/shared/data-display';

export default function PaymentsPage() {
  const t = useTranslations('pages.payments');
  const locale = useLocale();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'all' | 'pending'>('all');

  // Always call both hooks to avoid conditional hook calls
  const { data: allPayments, isLoading: isLoadingAll, error: errorAll } = usePayments();

  const {
    data: pendingPayments,
    isLoading: isLoadingPending,
    error: errorPending,
  } = usePendingPayments();

  // Select data based on active tab
  const payments = activeTab === 'pending' ? pendingPayments : allPayments;
  const isLoading = activeTab === 'pending' ? isLoadingPending : isLoadingAll;
  const error = activeTab === 'pending' ? errorPending : errorAll;

  if (isLoading) {
    return (
      <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
        <Breadcrumbs items={[{ label: t('title') }]} className="mb-6" />
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
        <Breadcrumbs items={[{ label: t('title') }]} className="mb-6" />
        <ErrorMessage error={error} variant="banner" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
      <Breadcrumbs items={[{ label: t('title') }]} className="mb-6" />

      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="mb-2 text-4xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
            {t('title')}
          </h1>
          <p className="text-base" style={{ color: cssVars.neutral.textSecondary }}>
            {t('subtitle')}
          </p>
        </div>
        <div className="flex gap-2">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => router.push(`/${locale}/payments/wallet`)}
              variant="outline"
              icon={Wallet}
            >
              {t('wallet')}
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => router.push(`/${locale}/payments/initiate`)}
              className="flex items-center gap-2"
              style={{
                background: cssVars.gradient.gold,
                color: cssVars.secondary.DEFAULT,
              }}
              icon={Plus}
            >
              {t('initiatePayment')}
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-2 border-b-2" style={{ borderColor: cssVars.neutral.border }}>
        <button
          onClick={() => setActiveTab('all')}
          className="relative px-4 py-2 font-semibold transition-colors"
          style={{
            color: activeTab === 'all' ? cssVars.primary.DEFAULT : cssVars.neutral.textMuted,
          }}
        >
          {t('all')}
          {activeTab === 'all' && (
            <motion.div
              layoutId="activeTab"
              className="absolute bottom-0 left-0 right-0 h-0.5"
              style={{ backgroundColor: cssVars.primary.DEFAULT }}
            />
          )}
        </button>
        <button
          onClick={() => setActiveTab('pending')}
          className="relative px-4 py-2 font-semibold transition-colors"
          style={{
            color: activeTab === 'pending' ? cssVars.primary.DEFAULT : cssVars.neutral.textMuted,
          }}
        >
          {t('pending')}
          {activeTab === 'pending' && (
            <motion.div
              layoutId="activeTab"
              className="absolute bottom-0 left-0 right-0 h-0.5"
              style={{ backgroundColor: cssVars.primary.DEFAULT }}
            />
          )}
        </button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => router.push(`/${locale}/payments/history`)}
          className="ml-auto flex items-center gap-2 px-4 py-2 font-semibold transition-colors"
          style={{ color: cssVars.primary.DEFAULT }}
        >
          <History className="h-4 w-4" />
          {t('history')}
        </motion.button>
      </div>

      {/* Payments List */}
      {payments.length === 0 ? (
        <EmptyState
          title={activeTab === 'pending' ? t('noPendingPayments') : t('noPayments')}
          description={t('noPaymentsDescription')}
        />
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
