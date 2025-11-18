'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { cssVars } from '@/styles/theme';
import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  Clock,
  CreditCard,
  DollarSign,
  FileText,
  Info,
  XCircle,
  Building2,
  User,
  TrendingUp,
} from 'lucide-react';
import type { Payment } from '@/lib/types/payment.types';
import { paymentsApi } from '@/lib/api/payments';
import AdminPageHeader from '@/components/shared/admin/AdminPageHeader';
import StatusBadge from '@/components/shared/badges/StatusBadge';

export default function PaymentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const t = useTranslations('admin');
  const paymentId = params.id as string;

  const [payment, setPayment] = useState<Payment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        setLoading(true);
        const data = await paymentsApi.getById(paymentId);
        setPayment(data);
      } catch (error) {
        console.error('Failed to fetch payment:', error);
      } finally {
        setLoading(false);
      }
    };

    if (paymentId) {
      fetchPayment();
    }
  }, [paymentId]);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div style={{ color: cssVars.neutral.textSecondary }}>{t('payments.loading')}</div>
      </div>
    );
  }

  if (!payment) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div style={{ color: cssVars.status.error }}>{t('payments.notFound')}</div>
      </div>
    );
  }

  return (
    <div>
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

      {/* Payment Overview Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 rounded-2xl border-2 p-6 shadow-md"
        style={{
          backgroundColor: cssVars.neutral.surface,
          borderColor: cssVars.neutral.border,
        }}
      >
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              className="flex h-16 w-16 items-center justify-center rounded-2xl"
              style={{
                backgroundColor: `color-mix(in srgb, ${cssVars.status.success} 15%, transparent)`,
              }}
            >
              <CreditCard className="h-8 w-8" style={{ color: cssVars.status.success }} />
            </div>
            <div>
              <h2 className="text-2xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                {payment.transactionId}
              </h2>
              <div className="mt-1">
                <StatusBadge
                  status={payment.status}
                  labels={{
                    pending: t('payments.statuses.pending'),
                    processing: t('payments.statuses.processing'),
                    completed: t('payments.statuses.completed'),
                    failed: t('payments.statuses.failed'),
                    cancelled: t('payments.statuses.cancelled'),
                    refunded: t('payments.statuses.refunded'),
                  }}
                />
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
              {payment.amount.toLocaleString('ar-SA')} {t('common.currency')}
            </div>
            <div className="text-sm" style={{ color: cssVars.neutral.textSecondary }}>
              {t('payments.detail.totalAmount')}
            </div>
          </div>
        </div>

        {/* Payment Details Grid */}
        <div
          className="grid gap-6 border-t pt-6 sm:grid-cols-2 lg:grid-cols-3"
          style={{ borderColor: cssVars.neutral.border }}
        >
          <div>
            <div
              className="mb-2 text-xs font-semibold"
              style={{ color: cssVars.neutral.textMuted }}
            >
              {t('payments.detail.netAmount')}
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" style={{ color: cssVars.status.success }} />
              <span className="text-xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                {payment.netAmount.toLocaleString('ar-SA')} {t('common.currency')}
              </span>
            </div>
          </div>

          <div>
            <div
              className="mb-2 text-xs font-semibold"
              style={{ color: cssVars.neutral.textMuted }}
            >
              {t('payments.detail.platformFee')}
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" style={{ color: cssVars.status.warning }} />
              <span className="text-xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                {payment.platformFee.toLocaleString('ar-SA')} {t('common.currency')}
              </span>
            </div>
          </div>

          <div>
            <div
              className="mb-2 text-xs font-semibold"
              style={{ color: cssVars.neutral.textMuted }}
            >
              {t('payments.detail.paymentMethod')}
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" style={{ color: cssVars.primary.DEFAULT }} />
              <span className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
                {t(`payments.methods.${payment.paymentMethod}`)}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Details Sections */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Payment Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border-2 p-6 shadow-md"
          style={{
            backgroundColor: cssVars.neutral.surface,
            borderColor: cssVars.neutral.border,
          }}
        >
          <h3
            className="mb-4 flex items-center gap-2 text-lg font-bold"
            style={{ color: cssVars.secondary.DEFAULT }}
          >
            <Info className="h-5 w-5" />
            {t('payments.detail.sections.paymentInfo')}
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span style={{ color: cssVars.neutral.textSecondary }}>
                {t('payments.detail.paymentType')}
              </span>
              <span className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
                {t(`payments.types.${payment.paymentType}`)}
              </span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: cssVars.neutral.textSecondary }}>
                {t('payments.detail.paymentStage')}
              </span>
              <span className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
                {t(`payments.stages.${payment.paymentStage}`)}
              </span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: cssVars.neutral.textSecondary }}>
                {t('payments.detail.gateway')}
              </span>
              <span className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
                {payment.paymentGateway}
              </span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: cssVars.neutral.textSecondary }}>
                {t('payments.detail.currency')}
              </span>
              <span className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
                {payment.currency}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Transaction Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl border-2 p-6 shadow-md"
          style={{
            backgroundColor: cssVars.neutral.surface,
            borderColor: cssVars.neutral.border,
          }}
        >
          <h3
            className="mb-4 flex items-center gap-2 text-lg font-bold"
            style={{ color: cssVars.secondary.DEFAULT }}
          >
            <FileText className="h-5 w-5" />
            {t('payments.detail.sections.transactionInfo')}
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span style={{ color: cssVars.neutral.textSecondary }}>
                {t('payments.detail.createdAt')}
              </span>
              <span className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
                {new Date(payment.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
            {payment.completedAt && (
              <div className="flex justify-between">
                <span style={{ color: cssVars.neutral.textSecondary }}>
                  {t('payments.detail.completedAt')}
                </span>
                <span className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
                  {new Date(payment.completedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            )}
            <div className="flex justify-between">
              <span style={{ color: cssVars.neutral.textSecondary }}>
                {t('payments.detail.ipAddress')}
              </span>
              <span className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
                {payment.ipAddress}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Project Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl border-2 p-6 shadow-md"
          style={{
            backgroundColor: cssVars.neutral.surface,
            borderColor: cssVars.neutral.border,
          }}
        >
          <h3
            className="mb-4 flex items-center gap-2 text-lg font-bold"
            style={{ color: cssVars.secondary.DEFAULT }}
          >
            <Building2 className="h-5 w-5" />
            {t('payments.detail.sections.projectInfo')}
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span style={{ color: cssVars.neutral.textSecondary }}>
                {t('payments.detail.projectId')}
              </span>
              <span className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
                {payment.projectId}
              </span>
            </div>
            {payment.milestoneId && (
              <div className="flex justify-between">
                <span style={{ color: cssVars.neutral.textSecondary }}>
                  {t('payments.detail.milestoneId')}
                </span>
                <span className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
                  {payment.milestoneId}
                </span>
              </div>
            )}
            <div className="flex justify-between">
              <span style={{ color: cssVars.neutral.textSecondary }}>
                {t('payments.detail.payerId')}
              </span>
              <span className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
                {payment.payerId}
              </span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: cssVars.neutral.textSecondary }}>
                {t('payments.detail.receiverId')}
              </span>
              <span className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
                {payment.receiverId}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Status & Notes */}
        {payment.notes && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-2xl border-2 p-6 shadow-md"
            style={{
              backgroundColor: cssVars.neutral.surface,
              borderColor: cssVars.neutral.border,
            }}
          >
            <h3
              className="mb-4 flex items-center gap-2 text-lg font-bold"
              style={{ color: cssVars.secondary.DEFAULT }}
            >
              <FileText className="h-5 w-5" />
              {t('payments.detail.sections.notes')}
            </h3>
            <p style={{ color: cssVars.secondary.DEFAULT }}>{payment.notes}</p>
          </motion.div>
        )}

        {/* Failure Information */}
        {payment.failureReason && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-2xl border-2 border-l-4 p-6 shadow-md"
            style={{
              backgroundColor: cssVars.neutral.surface,
              borderColor: cssVars.neutral.border,
              borderLeftColor: cssVars.status.error,
            }}
          >
            <h3
              className="mb-4 flex items-center gap-2 text-lg font-bold"
              style={{ color: cssVars.status.error }}
            >
              <XCircle className="h-5 w-5" />
              {t('payments.detail.sections.failureReason')}
            </h3>
            <p style={{ color: cssVars.secondary.DEFAULT }}>{payment.failureReason}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
