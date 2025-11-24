'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Calendar, CheckCircle, Clock, CreditCard, Eye } from 'lucide-react';
import SaudiRiyalIcon from '@/components/shared/icons/SaudiRiyalIcon';
import CurrencyDisplay from '@/components/shared/CurrencyDisplay';
import { cssVars } from '@/styles/theme';
import type { Payment } from '@/lib/types/payment.types';
import type { ColumnConfig } from '@/components/shared/admin/AdminDataTable';

export function usePaymentsTableColumns(): ColumnConfig<Payment>[] {
  const t = useTranslations('admin');
  const router = useRouter();

  return [
    {
      key: 'transactionId',
      header: t('payments.table.transaction'),
      render: (payment: Payment) => (
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl"
            style={{
              backgroundColor: `color-mix(in srgb, ${cssVars.status.success} 15%, transparent)`,
            }}
          >
            <CreditCard className="h-5 w-5" style={{ color: cssVars.status.success }} />
          </div>
          <div>
            <div className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
              {payment.transactionId || t('payments.labels.pending')}
            </div>
            <div className="text-xs" style={{ color: cssVars.neutral.textMuted }}>
              {payment.paymentType === 'milestone'
                ? t('payments.types.milestone_payment')
                : t('payments.types.project_payment')}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 'amount',
      header: t('payments.table.amount'),
      render: (payment: Payment) => (
        <div>
          <div className="flex items-center gap-2">
            <SaudiRiyalIcon
              className="h-4 w-4"
              style={{ color: cssVars.status.success }}
              width={16}
              height={16}
            />
            <CurrencyDisplay
              amount={payment.amount}
              className="font-bold"
              iconSize={16}
              iconClassName="h-4 w-4"
            />
          </div>
          <div className="text-xs" style={{ color: cssVars.neutral.textMuted }}>
            {t('payments.labels.netAmount')}:{' '}
            <CurrencyDisplay amount={payment.netAmount} iconSize={12} />
          </div>
        </div>
      ),
    },
    {
      key: 'method',
      header: t('payments.table.method'),
      render: (payment: Payment) => (
        <span
          className="inline-flex items-center gap-1 rounded-lg px-3 py-1 text-xs font-bold"
          style={{
            backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 15%, transparent)`,
            color: cssVars.primary.DEFAULT,
          }}
        >
          {t(`payments.methods.${payment.paymentMethod}`)}
        </span>
      ),
    },
    {
      key: 'createdAt',
      header: t('payments.table.date'),
      render: (payment: Payment) => (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" style={{ color: cssVars.neutral.textMuted }} />
          <span style={{ color: cssVars.neutral.textSecondary }}>
            {new Date(payment.createdAt).toLocaleDateString('ar-SA')}
          </span>
        </div>
      ),
    },
    {
      key: 'status',
      header: t('payments.table.status'),
      render: (payment: Payment) => (
        <span
          className="inline-flex items-center gap-1 rounded-lg px-3 py-1 text-xs font-bold"
          style={{
            backgroundColor:
              payment.status === 'completed'
                ? `color-mix(in srgb, ${cssVars.status.success} 15%, transparent)`
                : payment.status === 'failed'
                  ? `color-mix(in srgb, ${cssVars.status.error} 15%, transparent)`
                  : `color-mix(in srgb, ${cssVars.status.warning} 15%, transparent)`,
            color:
              payment.status === 'completed'
                ? cssVars.status.success
                : payment.status === 'failed'
                  ? cssVars.status.error
                  : cssVars.status.warning,
          }}
        >
          {payment.status === 'completed' ? (
            <>
              <CheckCircle className="h-3 w-3" />
              {t('payments.statuses.completed')}
            </>
          ) : payment.status === 'failed' ? (
            t('payments.statuses.failed')
          ) : (
            <>
              <Clock className="h-3 w-3" />
              {t('payments.statuses.pending')}
            </>
          )}
        </span>
      ),
    },
    {
      key: 'actions',
      header: t('payments.table.actions'),
      render: (payment: Payment) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/admin/payments/${payment.id}`);
          }}
          className="rounded-lg p-2 transition-all hover:bg-opacity-80"
          style={{
            backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 10%, transparent)`,
          }}
        >
          <Eye className="h-4 w-4" style={{ color: cssVars.primary.DEFAULT }} />
        </button>
      ),
    },
  ];
}
