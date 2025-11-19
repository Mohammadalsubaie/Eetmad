'use client';

import AdminDataTable from '@/components/shared/admin/AdminDataTable';
import AdminPageHeader from '@/components/shared/admin/AdminPageHeader';
import { paymentsApi } from '@/lib/api/payments';
import type { Payment } from '@/lib/types/payment.types';
import { cssVars } from '@/styles/theme';
import { Calendar, CheckCircle, Clock, CreditCard, DollarSign, Eye } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';

export default function PaymentsManagementPage() {
  const t = useTranslations('admin');
  const tPages = useTranslations('pages');
  const locale = useLocale();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [payments, setPayments] = useState<Payment[]>([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setLoading(true);
        const data = await paymentsApi.getTransactions();
        setPayments(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Failed to fetch payments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  // Old inline mock data removed - now using API
  /*
  const [payments] = useState<Payment[]>([
    {
      id: '1',
      transactionId: 'TXN123456',
      projectId: 'project-1',
      milestoneId: null,
      payerId: 'client-1',
      receiverId: 'supplier-1',
      amount: 65000,
      currency: 'SAR',
      paymentType: 'final',
      paymentStage: 'completed',
      paymentMethod: 'credit_card',
      paymentGateway: 'moyasar',
      status: 'completed',
      platformFee: 3250,
      netAmount: 61750,
      gatewayResponse: {},
      ipAddress: '192.168.1.1',
      userAgent: 'Mozilla/5.0',
      notes: null,
      failureReason: null,
      completedAt: '2024-03-15T10:05:00Z',
      refundedAt: null,
      refundAmount: null,
      createdAt: '2024-03-15T10:00:00Z',
      updatedAt: '2024-03-15T10:05:00Z',
    },
    {
      id: '2',
      transactionId: 'TXN123457',
      projectId: 'project-2',
      milestoneId: 'milestone-1',
      payerId: 'client-2',
      receiverId: 'supplier-2',
      amount: 18000,
      currency: 'SAR',
      paymentType: 'milestone',
      paymentStage: 'pending',
      paymentMethod: 'bank_transfer',
      paymentGateway: 'bank_transfer',
      status: 'pending',
      platformFee: 900,
      netAmount: 17100,
      gatewayResponse: {},
      ipAddress: '192.168.1.2',
      userAgent: 'Mozilla/5.0',
      notes: null,
      failureReason: null,
      completedAt: null,
      refundedAt: null,
      refundAmount: null,
      createdAt: '2024-03-18T09:00:00Z',
      updatedAt: '2024-03-18T09:00:00Z',
    },
  ]);
  */

  const columns = [
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
            <DollarSign className="h-4 w-4" style={{ color: cssVars.status.success }} />
            <span className="font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
              {payment.amount.toLocaleString('ar-SA')} ر.س
            </span>
          </div>
          <div className="text-xs" style={{ color: cssVars.neutral.textMuted }}>
            {t('payments.labels.netAmount')}: {payment.netAmount.toLocaleString('ar-SA')} ر.س
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

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: tPages('admin.title'), href: `/${locale}/admin` },
          { label: tPages('payments.title') },
        ]}
        className="mb-6"
      />

      <AdminPageHeader
        title={t('payments.title')}
        description={t('payments.description')}
        icon={CreditCard}
      />

      <AdminDataTable
        data={payments}
        columns={columns}
        searchPlaceholder={t('payments.search')}
        onRowClick={(payment) => router.push(`/admin/payments/${payment.id}`)}
        isLoading={loading}
        emptyMessage={t('payments.empty')}
      />
    </div>
  );
}
