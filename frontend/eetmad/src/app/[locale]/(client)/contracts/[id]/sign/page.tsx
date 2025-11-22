'use client';

import { useParams, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import { useContract } from '@/lib/hooks/useContracts';
import { LoadingSpinner, ErrorMessage } from '@/components/ui';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';
import ContractSigning from '@/components/features/contracts/ContractSigning';

export default function SignContractPage() {
  const params = useParams();
  const router = useRouter();
  const locale = useLocale();
  const id = params.id as string;
  const t = useTranslations('pages.contracts');
  const { data: contract, isLoading, error } = useContract(id);

  // TODO: Get actual user role from auth context
  const userRole: 'client' | 'supplier' = 'client';

  if (isLoading) {
    return (
      <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
        <Breadcrumbs
          items={[
            { label: t('title'), href: `/${locale}/contracts` },
            { label: id },
            { label: t('sign') },
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
            { label: t('sign') },
          ]}
          className="mb-6"
        />
        <ErrorMessage error={error?.message || t('notFound')} variant="banner" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
      <Breadcrumbs
        items={[
          { label: t('title'), href: `/${locale}/contracts` },
          { label: contract.contractNumber || id, href: `/${locale}/contracts/${id}` },
          { label: t('sign') },
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
          {t('signContract')}
        </h1>
        <p className="text-base" style={{ color: cssVars.neutral.textSecondary }}>
          {t('signContractDescription')}
        </p>
      </div>

      {/* Contract Preview */}
      <div
        className="mb-6 rounded-2xl border-2 p-6"
        style={{
          backgroundColor: cssVars.neutral.surface,
          borderColor: cssVars.neutral.border,
        }}
      >
        <h2
          className="mb-2 text-xl font-bold"
          style={{ color: cssVars.secondary.DEFAULT }}
        >
          {contract.contractNumber}
        </h2>
        <p
          className="line-clamp-3 text-sm"
          style={{ color: cssVars.neutral.textSecondary }}
        >
          {contract.contractText}
        </p>
      </div>

      {/* Signing Component */}
      <ContractSigning
        contract={contract}
        userRole={userRole}
        onSuccess={() => router.push(`/${locale}/contracts/${id}`)}
      />
    </div>
  );
}

