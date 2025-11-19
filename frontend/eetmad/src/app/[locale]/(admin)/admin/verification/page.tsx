'use client';

import AdminActionButton from '@/components/shared/admin/AdminActionButton';
import AdminDataTable from '@/components/shared/admin/AdminDataTable';
import AdminPageHeader from '@/components/shared/admin/AdminPageHeader';
import AdminStatsSummary from '@/components/shared/admin/AdminStatsSummary';
import { adminApi } from '@/lib/api/admin';
import type { VerificationDocument } from '@/lib/types/verification.types';
import { cssVars } from '@/styles/theme';
import {
  Building2,
  Calendar,
  CheckCircle,
  Download,
  Eye,
  FileText,
  ShieldCheck,
  XCircle,
} from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { useEffect, useState } from 'react';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';

export default function VerificationPage() {
  const t = useTranslations('admin');
  const tPages = useTranslations('pages');
  const locale = useLocale();
  const [loading, setLoading] = useState(false);
  const [documents, setDocuments] = useState<VerificationDocument[]>([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setLoading(true);
        const data = await adminApi.getVerificationQueue();
        setDocuments(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Failed to fetch verification documents:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  // Old inline mock data removed - now using API
  /*
  const [documents] = useState<VerificationDocument[]>([
    {
      id: '1',
      userId: 'user-1',
      documentType: 'commercial_register',
      documentNumber: '1234567890',
      documentUrl: '/documents/cr-1.pdf',
      backDocumentUrl: null,
      status: 'pending',
      submittedAt: '2024-03-15T10:30:00Z',
      reviewedAt: null,
      reviewedBy: null,
      reviewNotes: null,
      rejectionReason: null,
      expiryDate: '2025-12-31',
      metadata: null,
      createdAt: '2024-03-15T10:30:00Z',
      updatedAt: '2024-03-15T10:30:00Z',
    },
    {
      id: '2',
      userId: 'user-2',
      documentType: 'national_id',
      documentNumber: '1098765432',
      documentUrl: '/documents/id-2.pdf',
      backDocumentUrl: null,
      status: 'pending',
      submittedAt: '2024-03-16T14:20:00Z',
      reviewedAt: null,
      reviewedBy: null,
      reviewNotes: null,
      rejectionReason: null,
      expiryDate: '2028-06-30',
      metadata: null,
      createdAt: '2024-03-16T14:20:00Z',
      updatedAt: '2024-03-16T14:20:00Z',
    },
    {
      id: '3',
      userId: 'user-3',
      documentType: 'tax_certificate',
      documentNumber: '300123456789012',
      documentUrl: '/documents/tax-3.pdf',
      backDocumentUrl: null,
      status: 'approved',
      submittedAt: '2024-03-10T09:15:00Z',
      reviewedAt: '2024-03-11T11:00:00Z',
      reviewedBy: 'admin-1',
      reviewNotes: null,
      rejectionReason: null,
      expiryDate: null,
      metadata: null,
      createdAt: '2024-03-10T09:15:00Z',
      updatedAt: '2024-03-11T11:00:00Z',
    },
  ]);
  */

  const handleApprove = async (docId: string) => {
    // API call to approve document
    console.log('Approving document:', docId);
  };

  const handleReject = async (docId: string) => {
    // API call to reject document
    console.log('Rejecting document:', docId);
  };

  const columns = [
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
                  handleApprove(doc.id);
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
                  handleReject(doc.id);
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

  const pendingCount = documents.filter((d) => d.status === 'pending').length;

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: tPages('admin.title'), href: `/${locale}/admin` },
          { label: tPages('verification.title') },
        ]}
        className="mb-6"
      />

      <AdminPageHeader
        title={t('verification.title')}
        description={t('verification.description')}
        icon={ShieldCheck}
        action={
          <AdminActionButton
            label={t('verification.actions.exportReport')}
            icon={Download}
            variant="secondary"
          />
        }
      />

      {/* Stats */}
      <AdminStatsSummary
        items={[
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
            value: documents.filter((d) => d.status === 'approved').length,
            icon: CheckCircle,
            color: cssVars.status.success,
          },
          {
            id: 'rejected',
            label: t('verification.stats.rejected'),
            value: documents.filter((d) => d.status === 'rejected').length,
            icon: XCircle,
            color: cssVars.status.error,
          },
        ]}
      />

      <AdminDataTable
        data={documents}
        columns={columns}
        searchPlaceholder={t('verification.search')}
        isLoading={loading}
        emptyMessage={t('verification.empty')}
      />
    </div>
  );
}
