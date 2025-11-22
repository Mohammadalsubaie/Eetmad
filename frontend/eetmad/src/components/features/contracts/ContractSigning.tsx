'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, XCircle, PenTool } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import type { Contract } from '@/lib/types/contract.types';
import { Button, ErrorMessage } from '@/components/ui';
import { useSignContract } from '@/lib/hooks/useContracts';
import Input from '@/components/ui/Input/Input';

interface ContractSigningProps {
  contract: Contract;
  userRole: 'client' | 'supplier';
  onSuccess?: () => void;
}

export default function ContractSigning({ contract, userRole, onSuccess }: ContractSigningProps) {
  const t = useTranslations('pages.contracts');
  const { mutate: signContract, isLoading, error } = useSignContract();
  const [signature, setSignature] = useState('');

  const canSign =
    (userRole === 'client' && !contract.clientSignature) ||
    (userRole === 'supplier' && !contract.supplierSignature);

  const isSigned =
    (userRole === 'client' && contract.clientSignature) ||
    (userRole === 'supplier' && contract.supplierSignature);

  const handleSign = async () => {
    if (!signature.trim()) {
      return;
    }

    try {
      await signContract(contract.id, signature, userRole);
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      // Error handled by hook
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div
      className="rounded-2xl border-2 p-6"
      style={{
        backgroundColor: cssVars.neutral.surface,
        borderColor: cssVars.neutral.border,
      }}
    >
      {/* Header */}
      <div className="mb-6">
        <h3 className="mb-2 text-2xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
          {t('signing.title')}
        </h3>
        <p className="text-sm" style={{ color: cssVars.neutral.textSecondary }}>
          {t('signing.description')}
        </p>
      </div>

      {/* Signature Status */}
      <div className="mb-6 space-y-4">
        {/* Client Signature Status */}
        <div
          className="flex items-center justify-between rounded-xl border-2 p-4"
          style={{
            backgroundColor: `color-mix(in srgb, ${cssVars.neutral.bg} 50%, transparent)`,
            borderColor: contract.clientSignature ? cssVars.status.success : cssVars.neutral.border,
          }}
        >
          <div className="flex items-center gap-3">
            {contract.clientSignature ? (
              <CheckCircle2 className="h-5 w-5" style={{ color: cssVars.status.success }} />
            ) : (
              <Clock className="h-5 w-5" style={{ color: cssVars.status.warning }} />
            )}
            <div>
              <p className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
                {t('signing.clientSignature')}
              </p>
              {contract.clientSignedAt && (
                <p className="text-xs" style={{ color: cssVars.neutral.textMuted }}>
                  {formatDate(contract.clientSignedAt)}
                </p>
              )}
            </div>
          </div>
          {!contract.clientSignature && (
            <span className="text-xs font-medium" style={{ color: cssVars.status.warning }}>
              {t('signing.pending')}
            </span>
          )}
        </div>

        {/* Supplier Signature Status */}
        <div
          className="flex items-center justify-between rounded-xl border-2 p-4"
          style={{
            backgroundColor: `color-mix(in srgb, ${cssVars.neutral.bg} 50%, transparent)`,
            borderColor: contract.supplierSignature
              ? cssVars.status.success
              : cssVars.neutral.border,
          }}
        >
          <div className="flex items-center gap-3">
            {contract.supplierSignature ? (
              <CheckCircle2 className="h-5 w-5" style={{ color: cssVars.status.success }} />
            ) : (
              <Clock className="h-5 w-5" style={{ color: cssVars.status.warning }} />
            )}
            <div>
              <p className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
                {t('signing.supplierSignature')}
              </p>
              {contract.supplierSignedAt && (
                <p className="text-xs" style={{ color: cssVars.neutral.textMuted }}>
                  {formatDate(contract.supplierSignedAt)}
                </p>
              )}
            </div>
          </div>
          {!contract.supplierSignature && (
            <span className="text-xs font-medium" style={{ color: cssVars.status.warning }}>
              {t('signing.pending')}
            </span>
          )}
        </div>
      </div>

      {/* Signing Form */}
      {canSign && (
        <div className="space-y-4">
          <div>
            <label
              htmlFor="signature"
              className="mb-2 block text-sm font-bold"
              style={{ color: cssVars.secondary.DEFAULT }}
            >
              {t('signing.signatureLabel')} *
            </label>
            <Input
              type="text"
              id="signature"
              value={signature}
              onChange={(e) => setSignature(e.target.value)}
              icon={PenTool}
              placeholder={t('signing.signaturePlaceholder')}
              className="w-full"
            />
            <p className="mt-2 text-xs" style={{ color: cssVars.neutral.textMuted }}>
              {t('signing.signatureHint')}
            </p>
          </div>

          {error && <ErrorMessage error={error.message || String(error)} variant="inline" />}

          <Button
            onClick={handleSign}
            disabled={isLoading || !signature.trim()}
            className="w-full"
            style={{
              background: cssVars.gradient.gold,
              color: cssVars.secondary.DEFAULT,
            }}
          >
            {isLoading ? t('signing.signing') : t('signing.sign')}
          </Button>
        </div>
      )}

      {/* Already Signed */}
      {isSigned && (
        <div
          className="flex items-center gap-3 rounded-xl border-2 p-4"
          style={{
            backgroundColor: `color-mix(in srgb, ${cssVars.status.success} 10%, transparent)`,
            borderColor: cssVars.status.success,
          }}
        >
          <CheckCircle2 className="h-5 w-5" style={{ color: cssVars.status.success }} />
          <p className="font-semibold" style={{ color: cssVars.status.success }}>
            {t('signing.alreadySigned')}
          </p>
        </div>
      )}

      {/* Contract Status */}
      {contract.status === 'signed' && (
        <div
          className="mt-4 flex items-center gap-3 rounded-xl border-2 p-4"
          style={{
            backgroundColor: `color-mix(in srgb, ${cssVars.status.success} 10%, transparent)`,
            borderColor: cssVars.status.success,
          }}
        >
          <CheckCircle2 className="h-6 w-6" style={{ color: cssVars.status.success }} />
          <div>
            <p className="font-bold" style={{ color: cssVars.status.success }}>
              {t('signing.fullySigned')}
            </p>
            <p className="text-xs" style={{ color: cssVars.neutral.textMuted }}>
              {t('signing.fullySignedDescription')}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
