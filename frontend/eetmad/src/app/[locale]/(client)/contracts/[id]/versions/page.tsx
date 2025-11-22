'use client';

import { useParams, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText, Eye } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import { useContract, useContractVersions } from '@/lib/hooks/useContracts';
import { LoadingSpinner, ErrorMessage, Button } from '@/components/ui';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';
import StatusBadge from '@/components/shared/badges/StatusBadge';

export default function ContractVersionsPage() {
  const params = useParams();
  const router = useRouter();
  const locale = useLocale();
  const id = params.id as string;
  const t = useTranslations('pages.contracts');
  const { data: contract, isLoading: contractLoading } = useContract(id);
  const { data: versions, isLoading: versionsLoading, error } = useContractVersions(id);

  const isLoading = contractLoading || versionsLoading;

  if (isLoading) {
    return (
      <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
        <Breadcrumbs
          items={[
            { label: t('title'), href: `/${locale}/contracts` },
            { label: id },
            { label: t('versions') },
          ]}
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
          items={[
            { label: t('title'), href: `/${locale}/contracts` },
            { label: id },
            { label: t('versions') },
          ]}
          className="mb-6"
        />
        <ErrorMessage error={error?.message || t('notFound')} variant="banner" />
      </div>
    );
  }

  const formatDate = (dateString: string) => {
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
      <Breadcrumbs
        items={[
          { label: t('title'), href: `/${locale}/contracts` },
          { label: contract.contractNumber || id, href: `/${locale}/contracts/${id}` },
          { label: t('versions') },
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
        <h1 className="mb-2 text-4xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
          {t('versions')}
        </h1>
        <p className="text-base" style={{ color: cssVars.neutral.textSecondary }}>
          {t('versionsDescription')}
        </p>
      </div>

      {/* Versions List */}
      <div className="space-y-4">
        {versions.length === 0 ? (
          <div
            className="rounded-2xl border-2 p-8 text-center"
            style={{
              backgroundColor: cssVars.neutral.surface,
              borderColor: cssVars.neutral.border,
            }}
          >
            <p style={{ color: cssVars.neutral.textSecondary }}>{t('noVersions')}</p>
          </div>
        ) : (
          versions.map((version) => (
            <motion.div
              key={version.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border-2 p-6"
              style={{
                backgroundColor: cssVars.neutral.surface,
                borderColor:
                  version.id === contract.id ? cssVars.primary.DEFAULT : cssVars.neutral.border,
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-2">
                    <FileText className="h-5 w-5" style={{ color: cssVars.primary.DEFAULT }} />
                    <span className="font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                      {t('version')} {version.version}
                    </span>
                    {version.id === contract.id && (
                      <StatusBadge
                        status="current"
                        labels={{ current: t('currentVersion') }}
                        colorMap={{ current: cssVars.status.success }}
                      />
                    )}
                  </div>
                  <StatusBadge
                    status={version.status}
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
                  <p className="mt-2 text-sm" style={{ color: cssVars.neutral.textMuted }}>
                    {formatDate(version.createdAt)}
                  </p>
                </div>
                <Button
                  onClick={() => router.push(`/${locale}/contracts/${version.id}`)}
                  variant="outline"
                  icon={Eye}
                >
                  {t('view')}
                </Button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
