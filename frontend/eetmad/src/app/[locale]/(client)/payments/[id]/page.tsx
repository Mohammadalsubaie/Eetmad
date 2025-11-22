'use client';

import { useParams, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Clock, XCircle, Download, RefreshCw } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import { usePayment, useRefundPayment, useCancelPayment } from '@/lib/hooks/usePayments';
import { LoadingSpinner, ErrorMessage, Button, Badge } from '@/components/ui';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';
import StatusBadge from '@/components/shared/badges/StatusBadge';

export default function PaymentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const locale = useLocale();
  const id = params.id as string;
  const t = useTranslations('pages.payments');
  const { data: payment, isLoading, error } = usePayment(id);
  const { mutate: refundPayment, isLoading: refunding } = useRefundPayment();
  const { mutate: cancelPayment, isLoading: cancelling } = useCancelPayment();

  const handleRefund = () => {
    const reason = prompt(t('refundReasonPrompt'));
    if (reason) {
      refundPayment(id, { reason });
    }
  };

  const handleCancel = () => {
    if (confirm(t('confirmCancel'))) {
      cancelPayment(id);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
        <Breadcrumbs
          items={[{ label: t('title'), href: `/${locale}/payments` }, { label: id }]}
          className="mb-6"
        />
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  if (error || !payment) {
    return (
      <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
        <Breadcrumbs
          items={[{ label: t('title'), href: `/${locale}/payments` }, { label: id }]}
          className="mb-6"
        />
        <ErrorMessage error={error?.message || t('paymentNotFound')} variant="banner" />
      </div>
    );
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return t('notAvailable');
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatCurrency = (amount: number, currency: string) => {
    return `${amount.toLocaleString()} ${currency}`;
  };

  return (
    <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
      <Breadcrumbs
        items={[
          { label: t('title'), href: `/${locale}/payments` },
          { label: payment.transactionId || id },
        ]}
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
        <div className="mb-4 flex items-center gap-2">
          <StatusBadge
            status={payment.status}
            labels={{
              pending: t('status.pending'),
              processing: t('status.processing'),
              completed: t('status.completed'),
              failed: t('status.failed'),
              cancelled: t('status.cancelled'),
              refunded: t('status.refunded'),
            }}
            colorMap={{
              completed: cssVars.status.success,
              pending: cssVars.status.warning,
              processing: cssVars.status.warning,
              failed: cssVars.status.error,
              cancelled: cssVars.status.error,
              refunded: cssVars.neutral.textMuted,
            }}
          />
          <Badge
            style={{
              backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 15%, transparent)`,
              color: cssVars.primary.DEFAULT,
              borderColor: cssVars.primary.DEFAULT,
            }}
          >
            {t(`type.${payment.paymentType}`)}
          </Badge>
        </div>
        <h1 className="text-4xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
          {formatCurrency(payment.amount, payment.currency)}
        </h1>
      </div>

      {/* Details */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Payment Info */}
        <div
          className="rounded-2xl border-2 p-6"
          style={{
            backgroundColor: cssVars.neutral.surface,
            borderColor: cssVars.neutral.border,
          }}
        >
          <h2
            className="mb-4 text-xl font-bold"
            style={{ color: cssVars.secondary.DEFAULT }}
          >
            {t('paymentInfo')}
          </h2>
          <div className="space-y-3">
            <div>
              <p className="text-xs font-semibold" style={{ color: cssVars.neutral.textMuted }}>
                {t('transactionId')}
              </p>
              <p className="text-sm font-mono font-medium" style={{ color: cssVars.secondary.DEFAULT }}>
                {payment.transactionId}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold" style={{ color: cssVars.neutral.textMuted }}>
                {t('paymentMethod')}
              </p>
              <p className="text-sm font-medium" style={{ color: cssVars.secondary.DEFAULT }}>
                {t(`method.${payment.paymentMethod}`)}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold" style={{ color: cssVars.neutral.textMuted }}>
                {t('paymentGateway')}
              </p>
              <p className="text-sm font-medium" style={{ color: cssVars.secondary.DEFAULT }}>
                {payment.paymentGateway}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold" style={{ color: cssVars.neutral.textMuted }}>
                {t('amount')}
              </p>
              <p className="text-lg font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                {formatCurrency(payment.amount, payment.currency)}
              </p>
            </div>
            {payment.platformFee > 0 && (
              <div>
                <p className="text-xs font-semibold" style={{ color: cssVars.neutral.textMuted }}>
                  {t('platformFee')}
                </p>
                <p className="text-sm font-medium" style={{ color: cssVars.neutral.textSecondary }}>
                  {formatCurrency(payment.platformFee, payment.currency)}
                </p>
              </div>
            )}
            {payment.netAmount > 0 && (
              <div>
                <p className="text-xs font-semibold" style={{ color: cssVars.neutral.textMuted }}>
                  {t('netAmount')}
                </p>
                <p className="text-lg font-bold" style={{ color: cssVars.status.success }}>
                  {formatCurrency(payment.netAmount, payment.currency)}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Timeline */}
        <div
          className="rounded-2xl border-2 p-6"
          style={{
            backgroundColor: cssVars.neutral.surface,
            borderColor: cssVars.neutral.border,
          }}
        >
          <h2
            className="mb-4 text-xl font-bold"
            style={{ color: cssVars.secondary.DEFAULT }}
          >
            {t('timeline')}
          </h2>
          <div className="space-y-3">
            <div>
              <p className="text-xs font-semibold" style={{ color: cssVars.neutral.textMuted }}>
                {t('createdAt')}
              </p>
              <p className="text-sm font-medium" style={{ color: cssVars.secondary.DEFAULT }}>
                {formatDate(payment.createdAt)}
              </p>
            </div>
            {payment.completedAt && (
              <div>
                <p className="text-xs font-semibold" style={{ color: cssVars.neutral.textMuted }}>
                  {t('completedAt')}
                </p>
                <p className="text-sm font-medium" style={{ color: cssVars.secondary.DEFAULT }}>
                  {formatDate(payment.completedAt)}
                </p>
              </div>
            )}
            {payment.refundedAt && (
              <div>
                <p className="text-xs font-semibold" style={{ color: cssVars.neutral.textMuted }}>
                  {t('refundedAt')}
                </p>
                <p className="text-sm font-medium" style={{ color: cssVars.secondary.DEFAULT }}>
                  {formatDate(payment.refundedAt)}
                </p>
              </div>
            )}
            {payment.failureReason && (
              <div>
                <p className="text-xs font-semibold" style={{ color: cssVars.status.error }}>
                  {t('failureReason')}
                </p>
                <p className="text-sm font-medium" style={{ color: cssVars.status.error }}>
                  {payment.failureReason}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 flex gap-4">
        {payment.status === 'pending' && (
          <Button
            onClick={handleCancel}
            disabled={cancelling}
            variant="outline"
            icon={XCircle}
            style={{
              borderColor: cssVars.status.error,
              color: cssVars.status.error,
            }}
          >
            {t('cancel')}
          </Button>
        )}
        {payment.status === 'completed' && (
          <Button
            onClick={handleRefund}
            disabled={refunding}
            variant="outline"
            icon={RefreshCw}
            style={{
              borderColor: cssVars.status.warning,
              color: cssVars.status.warning,
            }}
          >
            {t('requestRefund')}
          </Button>
        )}
      </div>
    </div>
  );
}

