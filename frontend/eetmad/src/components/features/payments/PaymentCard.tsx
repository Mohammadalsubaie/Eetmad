'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { DollarSign, CreditCard, Building2, Wallet, ArrowRight } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import type { Payment } from '@/lib/types/payment.types';
import { Badge } from '@/components/ui';
import StatusBadge from '@/components/shared/badges/StatusBadge';

interface PaymentCardProps {
  payment: Payment;
  onView?: (id: string) => void;
}

export default function PaymentCard({ payment, onView }: PaymentCardProps) {
  const t = useTranslations('pages.payments');
  const router = useRouter();

  const handleClick = () => {
    if (onView) {
      onView(payment.id);
    } else {
      router.push(`/payments/${payment.id}`);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return t('notCompleted');
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatCurrency = (amount: number, currency: string) => {
    return `${amount.toLocaleString()} ${currency}`;
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'credit_card':
      case 'debit_card':
        return CreditCard;
      case 'bank_transfer':
        return Building2;
      case 'wallet':
        return Wallet;
      default:
        return DollarSign;
    }
  };

  const renderMethodIcon = () => {
    const MethodIconComponent = getMethodIcon(payment.paymentMethod);
    return <MethodIconComponent className="h-4 w-4" style={{ color: cssVars.neutral.textMuted }} />;
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="cursor-pointer rounded-2xl border-2 p-6 shadow-md transition-all hover:shadow-lg"
      style={{
        backgroundColor: cssVars.neutral.surface,
        borderColor: cssVars.neutral.border,
      }}
      onClick={handleClick}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          {/* Header */}
          <div className="mb-3 flex items-center gap-2">
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

          {/* Amount */}
          <div className="mb-3">
            <p className="text-2xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
              {formatCurrency(payment.amount, payment.currency)}
            </p>
            {payment.platformFee > 0 && (
              <p className="text-sm" style={{ color: cssVars.neutral.textMuted }}>
                {t('platformFee')}: {formatCurrency(payment.platformFee, payment.currency)}
              </p>
            )}
            {payment.netAmount > 0 && (
              <p className="text-sm font-semibold" style={{ color: cssVars.status.success }}>
                {t('netAmount')}: {formatCurrency(payment.netAmount, payment.currency)}
              </p>
            )}
          </div>

          {/* Details */}
          <div className="mb-3 space-y-2">
            <div className="flex items-center gap-2">
              {renderMethodIcon()}
              <span className="text-sm" style={{ color: cssVars.neutral.textSecondary }}>
                {t(`method.${payment.paymentMethod}`)}
              </span>
            </div>
            {payment.transactionId && (
              <div className="flex items-center gap-2">
                <span
                  className="text-xs font-semibold"
                  style={{ color: cssVars.neutral.textMuted }}
                >
                  {t('transactionId')}:
                </span>
                <span
                  className="font-mono text-xs"
                  style={{ color: cssVars.neutral.textSecondary }}
                >
                  {payment.transactionId}
                </span>
              </div>
            )}
          </div>

          {/* Footer */}
          <div
            className="flex items-center justify-between border-t pt-3"
            style={{ borderColor: cssVars.neutral.border }}
          >
            <span className="text-xs" style={{ color: cssVars.neutral.textMuted }}>
              {formatDate(payment.completedAt || payment.createdAt)}
            </span>
            <ArrowRight className="h-4 w-4" style={{ color: cssVars.neutral.textMuted }} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
