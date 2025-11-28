'use client';

import { useParams, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowLeft, Edit, FileText, Download, PenTool } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import { useContract } from '@/lib/hooks/useContracts';
import { LoadingSpinner, ErrorMessage, Button } from '@/components/ui';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';
import StatusBadge from '@/components/shared/badges/StatusBadge';
import { contractsApi } from '@/lib/api/contracts';

export default function ContractDetailPage() {
  const params = useParams();
  const router = useRouter();
  const locale = useLocale();
  const id = params.id as string;
  const t = useTranslations('pages.contracts');
  const { data: contract, isLoading, error } = useContract(id);

  const handleDownload = async () => {
    try {
      const blob = await contractsApi.download(id);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `contract-${contract?.contractNumber || id}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Failed to download contract:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
        <Breadcrumbs
          items={[{ label: t('title'), href: `/${locale}/contracts` }, { label: id }]}
          className="mb-6"
        />
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  if (error || !contract) {
    return (
      <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
        <Breadcrumbs
          items={[{ label: t('title'), href: `/${locale}/contracts` }, { label: id }]}
          className="mb-6"
        />
        <div className="flex flex-col items-center gap-4">
          <ErrorMessage error={error?.message || t('notFound')} variant="banner" />
          <Button onClick={() => router.push(`/${locale}/contracts`)} variant="primary">
            {t('backToContracts')}
          </Button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return t('notSigned');
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: t('title'), href: `/${locale}/contracts` },
          { label: contract.contractNumber || id },
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
                <span className="text-sm font-medium" style={{ color: cssVars.neutral.textMuted }}>
                  {contract.contractNumber}
                </span>
              )}
              {contract.version > 1 && (
                <span className="text-sm font-medium" style={{ color: cssVars.neutral.textMuted }}>
                  v{contract.version}
                </span>
              )}
            </div>
            <h1 className="text-4xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
              {t('contractDetails')}
            </h1>
          </div>
          <div className="flex gap-2">
            {contract.status !== 'signed' && (
              <Button
                onClick={() => router.push(`/${locale}/contracts/${id}/edit`)}
                variant="outline"
                icon={Edit}
              >
                {t('edit')}
              </Button>
            )}
            <Button onClick={handleDownload} variant="outline" icon={Download}>
              {t('download')}
            </Button>
            {contract.status !== 'signed' && (
              <Button
                onClick={() => router.push(`/${locale}/contracts/${id}/sign`)}
                variant="primary"
                icon={PenTool}
                style={{
                  background: cssVars.gradient.gold,
                  color: cssVars.secondary.DEFAULT,
                }}
              >
                {t('sign')}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-6 md:col-span-2">
          {/* Contract Text */}
          <div
            className="rounded-2xl border-2 p-6"
            style={{
              backgroundColor: cssVars.neutral.surface,
              borderColor: cssVars.neutral.border,
            }}
          >
            <h2 className="mb-4 text-2xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
              {t('contractText')}
            </h2>
            <div
              className="prose max-w-none whitespace-pre-wrap text-sm leading-relaxed"
              style={{ color: cssVars.neutral.textSecondary }}
            >
              {contract.contractText}
            </div>
          </div>

          {/* Terms and Conditions */}
          <div
            className="rounded-2xl border-2 p-6"
            style={{
              backgroundColor: cssVars.neutral.surface,
              borderColor: cssVars.neutral.border,
            }}
          >
            <h2 className="mb-4 text-2xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
              {t('termsAndConditions')}
            </h2>
            <div
              className="prose max-w-none whitespace-pre-wrap text-sm leading-relaxed"
              style={{ color: cssVars.neutral.textSecondary }}
            >
              {contract.termsAndConditions}
            </div>
          </div>

          {/* Payment Terms */}
          <div
            className="rounded-2xl border-2 p-6"
            style={{
              backgroundColor: cssVars.neutral.surface,
              borderColor: cssVars.neutral.border,
            }}
          >
            <h2 className="mb-4 text-2xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
              {t('paymentTerms')}
            </h2>
            <div
              className="prose max-w-none whitespace-pre-wrap text-sm leading-relaxed"
              style={{ color: cssVars.neutral.textSecondary }}
            >
              {contract.paymentTerms}
            </div>
          </div>

          {/* Deliverables */}
          <div
            className="rounded-2xl border-2 p-6"
            style={{
              backgroundColor: cssVars.neutral.surface,
              borderColor: cssVars.neutral.border,
            }}
          >
            <h2 className="mb-4 text-2xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
              {t('deliverables')}
            </h2>
            <div
              className="prose max-w-none whitespace-pre-wrap text-sm leading-relaxed"
              style={{ color: cssVars.neutral.textSecondary }}
            >
              {contract.deliverables}
            </div>
          </div>

          {/* Warranty Terms */}
          {contract.warrantyTerms && (
            <div
              className="rounded-2xl border-2 p-6"
              style={{
                backgroundColor: cssVars.neutral.surface,
                borderColor: cssVars.neutral.border,
              }}
            >
              <h2 className="mb-4 text-2xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                {t('warrantyTerms')}
              </h2>
              <div
                className="prose max-w-none whitespace-pre-wrap text-sm leading-relaxed"
                style={{ color: cssVars.neutral.textSecondary }}
              >
                {contract.warrantyTerms}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contract Info */}
          <div
            className="rounded-2xl border-2 p-6"
            style={{
              backgroundColor: cssVars.neutral.surface,
              borderColor: cssVars.neutral.border,
            }}
          >
            <h3 className="mb-4 text-xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
              {t('contractInfo')}
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs font-semibold" style={{ color: cssVars.neutral.textMuted }}>
                  {t('contractNumber')}
                </p>
                <p className="text-sm font-medium" style={{ color: cssVars.secondary.DEFAULT }}>
                  {contract.contractNumber}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold" style={{ color: cssVars.neutral.textMuted }}>
                  {t('version')}
                </p>
                <p className="text-sm font-medium" style={{ color: cssVars.secondary.DEFAULT }}>
                  {contract.version}
                </p>
              </div>
              {contract.templateUsed && (
                <div>
                  <p className="text-xs font-semibold" style={{ color: cssVars.neutral.textMuted }}>
                    {t('templateUsed')}
                  </p>
                  <p className="text-sm font-medium" style={{ color: cssVars.secondary.DEFAULT }}>
                    {contract.templateUsed}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Signatures */}
          <div
            className="rounded-2xl border-2 p-6"
            style={{
              backgroundColor: cssVars.neutral.surface,
              borderColor: cssVars.neutral.border,
            }}
          >
            <h3 className="mb-4 text-xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
              {t('signatures')}
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs font-semibold" style={{ color: cssVars.neutral.textMuted }}>
                  {t('clientSignature')}
                </p>
                <p className="text-sm font-medium" style={{ color: cssVars.secondary.DEFAULT }}>
                  {formatDate(contract.clientSignedAt)}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold" style={{ color: cssVars.neutral.textMuted }}>
                  {t('supplierSignature')}
                </p>
                <p className="text-sm font-medium" style={{ color: cssVars.secondary.DEFAULT }}>
                  {formatDate(contract.supplierSignedAt)}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <Button
              onClick={() => router.push(`/${locale}/contracts/${id}/versions`)}
              variant="outline"
              icon={FileText}
              fullWidth
            >
              {t('viewVersions')}
            </Button>
            {contract.status !== 'signed' && (
              <Button
                onClick={() => router.push(`/${locale}/contracts/${id}/clauses`)}
                variant="outline"
                fullWidth
              >
                {t('manageClauses')}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
