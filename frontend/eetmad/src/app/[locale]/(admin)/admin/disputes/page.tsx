'use client';

import AdminDataTable from '@/components/shared/admin/AdminDataTable';
import AdminPageHeader from '@/components/shared/admin/AdminPageHeader';
import { adminApi } from '@/lib/api/admin';
import type { Dispute } from '@/lib/types/dispute.types';
import { cssVars } from '@/styles/theme';
import { AlertTriangle, Calendar, CheckCircle, Eye, MessageSquare, XCircle } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';

export default function DisputesPage() {
  const t = useTranslations('admin');
  const tPages = useTranslations('pages');
  const locale = useLocale();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [disputes, setDisputes] = useState<Dispute[]>([]);

  useEffect(() => {
    const fetchDisputes = async () => {
      try {
        setLoading(true);
        const data = await adminApi.getDisputes();
        setDisputes(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Failed to fetch disputes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDisputes();
  }, []);

  // Old inline mock data removed - now using API
  /*
  const [disputes] = useState<Dispute[]>([
    {
      id: '1',
      disputeNumber: 'DSP-2024-001',
      projectId: 'project-1',
      raisedBy: 'user-1',
      against: 'user-2',
      subject: 'تأخر في التسليم',
      description: 'المورد لم يلتزم بموعد التسليم المحدد',
      category: 'delivery',
      status: 'open',
      priority: 'high',
      evidence: [],
      resolution: null,
      resolvedBy: null,
      resolvedAt: null,
      assignedTo: null,
      createdAt: '2024-03-18T10:00:00Z',
      updatedAt: '2024-03-18T10:00:00Z',
    },
    {
      id: '2',
      disputeNumber: 'DSP-2024-002',
      projectId: 'project-2',
      raisedBy: 'user-3',
      against: 'user-4',
      subject: 'جودة العمل غير مطابقة',
      description: 'العمل المسلم لا يطابق المواصفات المتفق عليها',
      category: 'quality',
      status: 'in_review',
      priority: 'medium',
      evidence: [],
      resolution: null,
      resolvedBy: null,
      resolvedAt: null,
      assignedTo: 'admin-2',
      createdAt: '2024-03-17T14:00:00Z',
      updatedAt: '2024-03-18T09:00:00Z',
    },
    {
      id: '3',
      disputeNumber: 'DSP-2024-003',
      projectId: 'project-3',
      raisedBy: 'user-5',
      against: 'user-6',
      subject: 'عدم الدفع',
      description: 'العميل لم يقم بالدفع المتفق عليه',
      category: 'payment',
      status: 'resolved',
      priority: 'high',
      evidence: [],
      resolution: 'تم تسوية النزاع وتم الدفع',
      resolvedBy: 'admin-1',
      resolvedAt: '2024-03-16T16:00:00Z',
      assignedTo: 'admin-1',
      createdAt: '2024-03-15T11:00:00Z',
      updatedAt: '2024-03-16T16:00:00Z',
    },
  ]);
  */

  const columns = [
    {
      key: 'reason',
      header: t('disputes.table.reason'),
      render: (dispute: Dispute) => (
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl"
            style={{
              backgroundColor: `color-mix(in srgb, ${
                dispute.priority === 'high'
                  ? cssVars.status.error
                  : dispute.priority === 'medium'
                    ? cssVars.status.warning
                    : cssVars.status.info
              } 15%, transparent)`,
            }}
          >
            <AlertTriangle
              className="h-5 w-5"
              style={{
                color:
                  dispute.priority === 'high'
                    ? cssVars.status.error
                    : dispute.priority === 'medium'
                      ? cssVars.status.warning
                      : cssVars.status.info,
              }}
            />
          </div>
          <div>
            <div className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
              {dispute.subject}
            </div>
            <div className="text-xs" style={{ color: cssVars.neutral.textMuted }}>
              {dispute.description.substring(0, 50)}...
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 'priority',
      header: t('disputes.table.priority'),
      render: (dispute: Dispute) => (
        <span
          className="inline-flex items-center gap-1 rounded-lg px-3 py-1 text-xs font-bold"
          style={{
            backgroundColor: `color-mix(in srgb, ${
              dispute.priority === 'high'
                ? cssVars.status.error
                : dispute.priority === 'medium'
                  ? cssVars.status.warning
                  : cssVars.status.info
            } 15%, transparent)`,
            color:
              dispute.priority === 'high'
                ? cssVars.status.error
                : dispute.priority === 'medium'
                  ? cssVars.status.warning
                  : cssVars.status.info,
          }}
        >
          {dispute.priority === 'high'
            ? 'عالية'
            : dispute.priority === 'medium'
              ? 'متوسطة'
              : 'منخفضة'}
        </span>
      ),
    },
    {
      key: 'createdAt',
      header: t('disputes.table.date'),
      render: (dispute: Dispute) => (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" style={{ color: cssVars.neutral.textMuted }} />
          <span style={{ color: cssVars.neutral.textSecondary }}>
            {new Date(dispute.createdAt).toLocaleDateString('ar-SA')}
          </span>
        </div>
      ),
    },
    {
      key: 'status',
      header: t('disputes.table.status'),
      render: (dispute: Dispute) => (
        <span
          className="inline-flex items-center gap-1 rounded-lg px-3 py-1 text-xs font-bold"
          style={{
            backgroundColor:
              dispute.status === 'resolved'
                ? `color-mix(in srgb, ${cssVars.status.success} 15%, transparent)`
                : dispute.status === 'closed'
                  ? `color-mix(in srgb, ${cssVars.neutral.textMuted} 15%, transparent)`
                  : dispute.status === 'in_review'
                    ? `color-mix(in srgb, ${cssVars.status.info} 15%, transparent)`
                    : `color-mix(in srgb, ${cssVars.status.warning} 15%, transparent)`,
            color:
              dispute.status === 'resolved'
                ? cssVars.status.success
                : dispute.status === 'closed'
                  ? cssVars.neutral.textMuted
                  : dispute.status === 'in_review'
                    ? cssVars.status.info
                    : cssVars.status.warning,
          }}
        >
          {t(`disputes.statuses.${dispute.status}`)}
        </span>
      ),
    },
    {
      key: 'actions',
      header: t('disputes.table.actions'),
      render: (dispute: Dispute) => (
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/admin/disputes/${dispute.id}`);
            }}
            className="rounded-lg p-2 transition-all hover:bg-opacity-80"
            style={{
              backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 10%, transparent)`,
            }}
          >
            <Eye className="h-4 w-4" style={{ color: cssVars.primary.DEFAULT }} />
          </button>
          <button
            onClick={(e) => e.stopPropagation()}
            className="rounded-lg p-2 transition-all hover:bg-opacity-80"
            style={{
              backgroundColor: `color-mix(in srgb, ${cssVars.status.info} 10%, transparent)`,
            }}
          >
            <MessageSquare className="h-4 w-4" style={{ color: cssVars.status.info }} />
          </button>
          {dispute.status === 'open' && (
            <>
              <button
                onClick={(e) => e.stopPropagation()}
                className="rounded-lg p-2 transition-all hover:bg-opacity-80"
                style={{
                  backgroundColor: `color-mix(in srgb, ${cssVars.status.success} 10%, transparent)`,
                }}
              >
                <CheckCircle className="h-4 w-4" style={{ color: cssVars.status.success }} />
              </button>
              <button
                onClick={(e) => e.stopPropagation()}
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

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: tPages('admin.title'), href: `/${locale}/admin` },
          { label: tPages('disputes.title') },
        ]}
        className="mb-6"
      />

      <AdminPageHeader
        title={t('disputes.title')}
        description={t('disputes.description')}
        icon={AlertTriangle}
      />

      <AdminDataTable
        data={disputes}
        columns={columns}
        searchPlaceholder={t('disputes.search')}
        onRowClick={(dispute) => router.push(`/admin/disputes/${dispute.id}`)}
        isLoading={loading}
        emptyMessage={t('disputes.empty')}
      />
    </div>
  );
}
