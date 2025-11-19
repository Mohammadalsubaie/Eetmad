'use client';

import { useMemo } from 'react';
import { CheckCircle, FileText, XCircle } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import { useTranslations } from 'next-intl';
import AdminStatsSummary from '@/components/shared/admin/AdminStatsSummary';
import type { VerificationDocument } from '@/lib/types/verification.types';

interface VerificationStatsProps {
  documents: VerificationDocument[];
}

export default function VerificationStats({ documents }: VerificationStatsProps) {
  const t = useTranslations('admin');

  const stats = useMemo(() => {
    const pendingCount = documents.filter((d) => d.status === 'pending').length;
    const approvedCount = documents.filter((d) => d.status === 'approved').length;
    const rejectedCount = documents.filter((d) => d.status === 'rejected').length;

    return [
      {
        id: 'pending',
        label: t('verification.stats.pending'),
        value: pendingCount,
        icon: FileText,
        color: cssVars.status.warning,
      },
      {
        id: 'approved',
        label: t('verification.stats.approved'),
        value: approvedCount,
        icon: CheckCircle,
        color: cssVars.status.success,
      },
      {
        id: 'rejected',
        label: t('verification.stats.rejected'),
        value: rejectedCount,
        icon: XCircle,
        color: cssVars.status.error,
      },
    ];
  }, [documents, t]);

  return <AdminStatsSummary items={stats} />;
}

