'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Calendar, FileText, CheckCircle2, Clock, XCircle } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import type { Contract } from '@/lib/types/contract.types';
import { Badge } from '@/components/ui';
import StatusBadge from '@/components/shared/badges/StatusBadge';

interface ContractCardProps {
  contract: Contract;
  onView?: (id: string) => void;
  showActions?: boolean;
}

export default function ContractCard({ contract, onView }: ContractCardProps) {
  const t = useTranslations('pages.contracts');
  const router = useRouter();

  const handleClick = () => {
    if (onView) {
      onView(contract.id);
    } else {
      router.push(`/contracts/${contract.id}`);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return t('notSigned');
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'signed':
        return cssVars.status.success;
      case 'pending_client_signature':
      case 'pending_supplier_signature':
        return cssVars.status.warning;
      case 'draft':
        return cssVars.neutral.textMuted;
      case 'cancelled':
      case 'expired':
        return cssVars.status.error;
      default:
        return cssVars.neutral.textSecondary;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'signed':
        return CheckCircle2;
      case 'pending_client_signature':
      case 'pending_supplier_signature':
        return Clock;
      case 'cancelled':
      case 'expired':
        return XCircle;
      default:
        return FileText;
    }
  };

  const StatusIcon = getStatusIcon(contract.status);

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="cursor-pointer rounded-2xl border-2 p-6 shadow-lg transition-all hover:shadow-2xl"
      style={{
        backgroundColor: cssVars.neutral.surface,
        borderColor: cssVars.neutral.border,
      }}
      onClick={handleClick}
    >
      {/* Header */}
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="mb-2 flex items-center gap-2">
            <StatusBadge
              status={contract.status}
              labels={{
                draft: t('status.draft'),
                pending_client_signature: t('status.pending_client_signature'),
                pending_supplier_signature: t('status.pending_supplier_signature'),
                signed: t('status.signed'),
                cancelled: t('status.cancelled'),
                expired: t('status.expired'),
              }}
              colorMap={{
                signed: cssVars.status.success,
                pending_client_signature: cssVars.status.warning,
                pending_supplier_signature: cssVars.status.warning,
                draft: cssVars.neutral.textMuted,
                cancelled: cssVars.status.error,
                expired: cssVars.status.error,
              }}
            />
            {contract.contractNumber && (
              <span className="text-xs font-medium" style={{ color: cssVars.neutral.textMuted }}>
                {contract.contractNumber}
              </span>
            )}
            {contract.version > 1 && (
              <Badge
                style={{
                  backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 15%, transparent)`,
                  color: cssVars.primary.DEFAULT,
                  borderColor: cssVars.primary.DEFAULT,
                }}
              >
                v{contract.version}
              </Badge>
            )}
          </div>
          <h3
            className="mb-2 text-xl font-bold leading-tight"
            style={{ color: cssVars.secondary.DEFAULT }}
          >
            {t('contract')} #{contract.id.slice(-6)}
          </h3>
        </div>
        <StatusIcon
          className="h-6 w-6 flex-shrink-0"
          style={{ color: getStatusColor(contract.status) }}
        />
      </div>

      {/* Contract Preview */}
      <p
        className="mb-4 line-clamp-2 text-sm leading-relaxed"
        style={{ color: cssVars.neutral.textSecondary }}
      >
        {contract.contractText.substring(0, 150)}...
      </p>

      {/* Details Grid */}
      <div className="mb-4 grid grid-cols-2 gap-3">
        {/* Client Signature */}
        <div className="flex items-center gap-2">
          <CheckCircle2
            className={`h-4 w-4 ${contract.clientSignature ? '' : 'opacity-30'}`}
            style={{
              color: contract.clientSignature ? cssVars.status.success : cssVars.neutral.textMuted,
            }}
          />
          <div>
            <p className="text-xs" style={{ color: cssVars.neutral.textMuted }}>
              {t('clientSignature')}
            </p>
            <p className="text-xs font-medium" style={{ color: cssVars.neutral.textSecondary }}>
              {formatDate(contract.clientSignedAt)}
            </p>
          </div>
        </div>

        {/* Supplier Signature */}
        <div className="flex items-center gap-2">
          <CheckCircle2
            className={`h-4 w-4 ${contract.supplierSignature ? '' : 'opacity-30'}`}
            style={{
              color: contract.supplierSignature
                ? cssVars.status.success
                : cssVars.neutral.textMuted,
            }}
          />
          <div>
            <p className="text-xs" style={{ color: cssVars.neutral.textMuted }}>
              {t('supplierSignature')}
            </p>
            <p className="text-xs font-medium" style={{ color: cssVars.neutral.textSecondary }}>
              {formatDate(contract.supplierSignedAt)}
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        className="flex items-center justify-between border-t pt-4"
        style={{ borderColor: cssVars.neutral.border }}
      >
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" style={{ color: cssVars.neutral.textMuted }} />
          <span className="text-xs" style={{ color: cssVars.neutral.textMuted }}>
            {formatDate(contract.createdAt)}
          </span>
        </div>
        {contract.templateUsed && (
          <Badge
            style={{
              borderColor: cssVars.accent.warm,
              color: cssVars.accent.warm,
            }}
          >
            {contract.templateUsed}
          </Badge>
        )}
      </div>
    </motion.div>
  );
}
