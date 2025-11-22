'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus, Minus, Wallet, TrendingUp, History } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import { useWallet, useWalletTransactions, useAddFunds } from '@/lib/hooks/usePayments';
import { LoadingSpinner, ErrorMessage, Button } from '@/components/ui';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';

export default function WalletPage() {
  const t = useTranslations('pages.payments');
  const locale = useLocale();
  const router = useRouter();
  const { data: wallet, isLoading: walletLoading } = useWallet();
  const { data: transactions, isLoading: transactionsLoading } = useWalletTransactions();
  const { mutate: addFunds, isLoading: adding } = useAddFunds();

  const handleAddFunds = () => {
    const amount = prompt(t('addFundsAmountPrompt'));
    if (amount) {
      addFunds(parseFloat(amount), 'credit_card');
    }
  };

  if (walletLoading) {
    return (
      <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
        <Breadcrumbs items={[{ label: t('wallet') }]} className="mb-6" />
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  if (!wallet) {
    return (
      <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
        <Breadcrumbs items={[{ label: t('wallet') }]} className="mb-6" />
        <ErrorMessage error={t('walletNotFound')} variant="banner" />
      </div>
    );
  }

  const formatCurrency = (amount: number, currency: string) => {
    return `${amount.toLocaleString()} ${currency}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
      <Breadcrumbs
        items={[{ label: t('title'), href: `/${locale}/payments` }, { label: t('wallet') }]}
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
          {t('wallet')}
        </h1>
        <p className="text-base" style={{ color: cssVars.neutral.textSecondary }}>
          {t('walletDescription')}
        </p>
      </div>

      {/* Balance Card */}
      <div
        className="mb-8 rounded-2xl border-2 p-8"
        style={{
          background: cssVars.gradient.gold,
          borderColor: cssVars.accent.warm,
        }}
      >
        <div className="mb-4 flex items-center gap-3">
          <Wallet className="h-8 w-8" style={{ color: cssVars.secondary.DEFAULT }} />
          <h2 className="text-xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
            {t('balance')}
          </h2>
        </div>
        <p className="text-5xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
          {formatCurrency(wallet.balance, wallet.currency)}
        </p>
        <div className="mt-6 flex gap-3">
          <Button
            onClick={handleAddFunds}
            disabled={adding}
            variant="primary"
            icon={Plus}
            style={{
              background: cssVars.secondary.DEFAULT,
              color: cssVars.neutral.bg,
            }}
          >
            {t('addFunds')}
          </Button>
          <Button
            onClick={() => router.push(`/${locale}/payments/wallet/withdraw`)}
            variant="outline"
            icon={Minus}
            style={{
              borderColor: cssVars.secondary.DEFAULT,
              color: cssVars.secondary.DEFAULT,
            }}
          >
            {t('withdraw')}
          </Button>
        </div>
      </div>

      {/* Transactions */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
            {t('transactions')}
          </h2>
          <Button
            onClick={() => router.push(`/${locale}/payments/history`)}
            variant="outline"
            icon={History}
            size="sm"
          >
            {t('viewAll')}
          </Button>
        </div>

        {transactionsLoading ? (
          <LoadingSpinner />
        ) : transactions.length === 0 ? (
          <div
            className="rounded-2xl border-2 p-8 text-center"
            style={{
              backgroundColor: cssVars.neutral.surface,
              borderColor: cssVars.neutral.border,
            }}
          >
            <p style={{ color: cssVars.neutral.textSecondary }}>{t('noTransactions')}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {transactions.slice(0, 10).map((transaction) => (
              <div
                key={transaction.id}
                className="rounded-xl border-2 p-4"
                style={{
                  backgroundColor: cssVars.neutral.surface,
                  borderColor: cssVars.neutral.border,
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <TrendingUp
                        className={`h-4 w-4 ${
                          transaction.type === 'deposit' || transaction.type === 'refund'
                            ? 'text-green-500'
                            : 'text-red-500'
                        }`}
                      />
                      <span className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
                        {t(`transactionType.${transaction.type}`)}
                      </span>
                    </div>
                    <p className="text-sm" style={{ color: cssVars.neutral.textSecondary }}>
                      {transaction.description}
                    </p>
                    <p className="text-xs" style={{ color: cssVars.neutral.textMuted }}>
                      {formatDate(transaction.createdAt)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-lg font-bold ${
                        transaction.type === 'deposit' || transaction.type === 'refund'
                          ? 'text-green-500'
                          : 'text-red-500'
                      }`}
                    >
                      {transaction.type === 'deposit' || transaction.type === 'refund' ? '+' : '-'}
                      {formatCurrency(Math.abs(transaction.amount), 'SAR')}
                    </p>
                    <p className="text-xs" style={{ color: cssVars.neutral.textMuted }}>
                      {t(`status.${transaction.status}`)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
