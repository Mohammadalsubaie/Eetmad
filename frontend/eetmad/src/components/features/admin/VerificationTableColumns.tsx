'use client';

import { useTranslations } from 'next-intl';
import { Building2, Calendar, CheckCircle, Eye, FileText, XCircle } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import type { VerificationDocument } from '@/lib/types/verification.types';
import type { ColumnConfig } from '@/components/shared/admin/AdminDataTable';

interface VerificationTableColumnsProps {
  onApprove: (docId: string) => void;
  onReject: (docId: string) => void;
}

export function useVerificationTableColumns({
  onApprove,
  onReject,
}: VerificationTableColumnsProps): ColumnConfig<VerificationDocument>[] {
  const t = useTranslations('admin');

  return [
    {
      key: 'documentType',
      header: t('verification.table.documentType'),
      render: (doc: VerificationDocument) => (
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl"
            style={{
              backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 15%, transparent)`,
            }}
          >
            {doc.documentType === 'commercial_register' ? (
              <Building2 className="h-5 w-5" style={{ color: cssVars.primary.DEFAULT }} />
            ) : (
              <FileText className="h-5 w-5" style={{ color: cssVars.primary.DEFAULT }} />
            )}
          </div>
          <div>
            <div className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
              {t(
                `verification.types.${
                  doc.documentType === 'commercial_register'
                    ? 'commercialRegister'
                    : doc.documentType === 'national_id'
                      ? 'nationalId'
                      : doc.documentType === 'tax_certificate'
                        ? 'taxNumber'
                        : 'other'
                }`
              )}
            </div>
            <div className="text-xs" style={{ color: cssVars.neutral.textMuted }}>
              {doc.documentNumber}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 'submittedAt',
      header: t('verification.table.submittedAt'),
      render: (doc: VerificationDocument) => (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" style={{ color: cssVars.neutral.textMuted }} />
          <span style={{ color: cssVars.neutral.textSecondary }}>
            {new Date(doc.submittedAt).toLocaleDateString('ar-SA')}
          </span>
        </div>
      ),
    },
    {
      key: 'expiryDate',
      header: t('verification.table.expiryDate'),
      render: (doc: VerificationDocument) => (
        <span style={{ color: cssVars.neutral.textSecondary }}>
          {doc.expiryDate ? new Date(doc.expiryDate).toLocaleDateString('ar-SA') : '-'}
        </span>
      ),
    },
    {
      key: 'status',
      header: t('verification.table.status'),
      render: (doc: VerificationDocument) => (
        <span
          className="inline-flex items-center gap-1 rounded-lg px-3 py-1 text-xs font-bold"
          style={{
            backgroundColor:
              doc.status === 'approved'
                ? `color-mix(in srgb, ${cssVars.status.success} 15%, transparent)`
                : doc.status === 'rejected'
                  ? `color-mix(in srgb, ${cssVars.status.error} 15%, transparent)`
                  : `color-mix(in srgb, ${cssVars.status.warning} 15%, transparent)`,
            color:
              doc.status === 'approved'
                ? cssVars.status.success
                : doc.status === 'rejected'
                  ? cssVars.status.error
                  : cssVars.status.warning,
          }}
        >
          {t(`verification.statuses.${doc.status}`)}
        </span>
      ),
    },
    {
      key: 'actions',
      header: t('verification.table.actions'),
      render: (doc: VerificationDocument) => (
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              window.open(doc.documentUrl, '_blank');
            }}
            className="rounded-lg p-2 transition-all hover:bg-opacity-80"
            style={{
              backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 10%, transparent)`,
            }}
          >
            <Eye className="h-4 w-4" style={{ color: cssVars.primary.DEFAULT }} />
          </button>
          {doc.status === 'pending' && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onApprove(doc.id);
                }}
                className="rounded-lg p-2 transition-all hover:bg-opacity-80"
                style={{
                  backgroundColor: `color-mix(in srgb, ${cssVars.status.success} 10%, transparent)`,
                }}
              >
                <CheckCircle className="h-4 w-4" style={{ color: cssVars.status.success }} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onReject(doc.id);
                }}
                className="rounded-lg p-2 transition-all hover:bg-opacity-80"
                style={{
                  backgroundColor: `color-mix(in srgb, ${cssVars.status.error} 10%, transparent)`,
                }}
              >
                <XCircle className="h-4 w-4" style={{ color: cssVars.status.error }} />
              </button>
            </>
          )}
        </div>
      ),
    },
  ];
}

