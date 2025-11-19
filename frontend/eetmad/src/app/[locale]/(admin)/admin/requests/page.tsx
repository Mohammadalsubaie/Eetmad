'use client';

import AdminDataTable from '@/components/shared/admin/AdminDataTable';
import AdminPageHeader from '@/components/shared/admin/AdminPageHeader';
import StatusBadge from '@/components/shared/badges/StatusBadge';
import { requestsApi } from '@/lib/api/requests';
import type { Request } from '@/lib/types/request.types';
import { cssVars } from '@/styles/theme';
import { Calendar, DollarSign, Eye, FileText } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';

export default function RequestsManagementPage() {
  const t = useTranslations('admin');
  const tPages = useTranslations('pages');
  const locale = useLocale();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [requests, setRequests] = useState<Request[]>([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        const data = await requestsApi.getAll();
        setRequests(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Failed to fetch requests:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  // Old inline mock data removed - now using API
  /*
  const [requests] = useState<Request[]>([
    {
      id: '1',
      requestNumber: 'REQ-2024-001',
      clientId: 'client-1',
      title: 'تطوير موقع إلكتروني متكامل',
      description: 'نحتاج لتطوير موقع إلكتروني احترافي',
      categoryId: 'cat-1',
      budgetMin: 50000,
      budgetMax: 80000,
      expectedDuration: 45,
      deadline: '2024-04-30',
      preferredStartDate: null,
      status: 'open',
      attachments: [],
      viewsCount: 245,
      offersCount: 12,
      requiresOnSiteVisit: false,
      location: null,
      selectedOfferId: null,
      createdAt: '2024-03-10T10:00:00Z',
      updatedAt: '2024-03-18T14:00:00Z',
      publishedAt: '2024-03-10T11:00:00Z',
      closedAt: null,
    },
    {
      id: '2',
      requestNumber: 'REQ-2024-002',
      clientId: 'client-2',
      title: 'تصميم هوية بصرية متكاملة',
      description: 'تصميم شعار وهوية بصرية كاملة',
      categoryId: 'cat-2',
      budgetMin: 15000,
      budgetMax: 25000,
      expectedDuration: 20,
      deadline: '2024-04-15',
      preferredStartDate: null,
      status: 'open',
      attachments: [],
      viewsCount: 189,
      offersCount: 23,
      requiresOnSiteVisit: false,
      location: null,
      selectedOfferId: null,
      createdAt: '2024-03-12T09:00:00Z',
      updatedAt: '2024-03-18T10:00:00Z',
      publishedAt: '2024-03-12T10:00:00Z',
      closedAt: null,
    },
  ]);
  */

  const columns = [
    {
      key: 'title',
      header: t('requests.table.title'),
      render: (request: Request) => (
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl"
            style={{
              backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 15%, transparent)`,
            }}
          >
            <FileText className="h-5 w-5" style={{ color: cssVars.primary.DEFAULT }} />
          </div>
          <div>
            <div className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
              {request.title}
            </div>
            <div className="text-xs" style={{ color: cssVars.neutral.textMuted }}>
              {request.offersCount} عرض • {request.viewsCount} مشاهدة
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 'budgetMin',
      header: t('requests.table.budget'),
      render: (request: Request) => (
        <div className="flex items-center gap-2">
          <DollarSign className="h-4 w-4" style={{ color: cssVars.status.success }} />
          <span className="font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
            {request.budgetMin?.toLocaleString('ar-SA') ?? 0} -{' '}
            {request.budgetMax?.toLocaleString('ar-SA') ?? 0} ر.س
          </span>
        </div>
      ),
    },
    {
      key: 'deadline',
      header: t('requests.table.deadline'),
      render: (request: Request) => (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" style={{ color: cssVars.neutral.textMuted }} />
          <span style={{ color: cssVars.neutral.textSecondary }}>
            {new Date(request.deadline).toLocaleDateString('ar-SA')}
          </span>
        </div>
      ),
    },
    {
      key: 'status',
      header: t('requests.table.status'),
      render: (request: Request) => (
        <StatusBadge
          status={request.status}
          labels={{
            draft: t('requests.statuses.draft'),
            open: t('requests.statuses.active'),
            in_progress: t('projects.statuses.in_progress'),
            completed: t('projects.statuses.completed'),
            closed: t('requests.statuses.closed'),
            cancelled: t('requests.statuses.cancelled'),
          }}
        />
      ),
    },
    {
      key: 'actions',
      header: t('requests.table.actions'),
      render: (request: Request) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/admin/requests/${request.id}`);
          }}
          className="rounded-lg p-2 transition-all hover:bg-opacity-80"
          style={{
            backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 10%, transparent)`,
          }}
        >
          <Eye className="h-4 w-4" style={{ color: cssVars.primary.DEFAULT }} />
        </button>
      ),
    },
  ];

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: tPages('admin.title'), href: `/${locale}/admin` },
          { label: tPages('requests.title') },
        ]}
        className="mb-6"
      />

      <AdminPageHeader
        title={t('requests.title')}
        description={t('requests.description')}
        icon={FileText}
      />

      <AdminDataTable
        data={requests}
        columns={columns}
        searchPlaceholder={t('requests.search')}
        onRowClick={(request) => router.push(`/admin/requests/${request.id}`)}
        isLoading={loading}
        emptyMessage={t('requests.empty')}
      />
    </div>
  );
}
