'use client';

import AdminDataTable from '@/components/shared/admin/AdminDataTable';
import AdminPageHeader from '@/components/shared/admin/AdminPageHeader';
import StatusBadge from '@/components/shared/badges/StatusBadge';
import { projectsApi } from '@/lib/api/projects';
import type { Project } from '@/lib/types/project.types';
import { cssVars } from '@/styles/theme';
import { Briefcase, Calendar, DollarSign, Eye, TrendingUp } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProjectsManagementPage() {
  const t = useTranslations('admin');
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await projectsApi.getAll();
        setProjects(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Old inline mock data removed - now using API
  /*
  const [projects] = useState<Project[]>([
    {
      id: '1',
      projectNumber: 'PRJ-2024-001',
      requestId: 'request-1',
      offerId: 'offer-1',
      clientId: 'client-1',
      supplierId: 'supplier-1',
      contractId: null,
      totalAmount: 65000,
      depositAmount: 20000,
      finalAmount: 45000,
      status: 'active',
      startDate: '2024-03-01',
      expectedEndDate: '2024-03-31',
      actualEndDate: null,
      deliveryProof: [],
      deliveryNotes: 'Initial setup completed.',
      approvedByClient: false,
      approvalDate: null,
      progress: 45,
      milestones: [],
      createdAt: '2024-03-01T10:00:00Z',
      updatedAt: '2024-03-18T14:00:00Z',
    },
    {
      id: '2',
      projectNumber: 'PRJ-2024-002',
      requestId: 'request-2',
      offerId: 'offer-2',
      clientId: 'client-2',
      supplierId: 'supplier-2',
      contractId: 'CNT-0002',
      totalAmount: 18000,
      depositAmount: 8000,
      finalAmount: 10000,
      status: 'completed',
      startDate: '2024-02-15',
      expectedEndDate: '2024-03-01',
      actualEndDate: '2024-02-28',
      deliveryProof: [],
      deliveryNotes: 'All milestones delivered.',
      approvedByClient: true,
      approvalDate: '2024-02-28T16:00:00Z',
      progress: 100,
      milestones: [],
      createdAt: '2024-02-15T09:00:00Z',
      updatedAt: '2024-02-28T16:00:00Z',
    },
  ]);
  */

  const columns = [
    {
      key: 'projectNumber',
      header: t('projects.table.title'),
      render: (project: Project) => (
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl"
            style={{
              backgroundColor: `color-mix(in srgb, ${cssVars.secondary.DEFAULT} 15%, transparent)`,
            }}
          >
            <Briefcase className="h-5 w-5" style={{ color: cssVars.secondary.DEFAULT }} />
          </div>
          <div>
            <div
              className="text-ellipsis whitespace-nowrap font-semibold"
              style={{ color: cssVars.secondary.DEFAULT }}
            >
              {project.projectNumber}
            </div>
            <div className="text-xs" style={{ color: cssVars.neutral.textMuted }}>
              {t('projects.table.request')}: {project.requestId}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 'totalAmount',
      header: t('projects.table.price'),
      render: (project: Project) => (
        <div className="flex items-center gap-2">
          <DollarSign className="h-4 w-4" style={{ color: cssVars.status.success }} />
          <span className="font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
            {project.totalAmount.toLocaleString('ar-SA')} ر.س
          </span>
        </div>
      ),
    },
    {
      key: 'progress',
      header: t('projects.table.progress'),
      render: (project: Project) => (
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4" style={{ color: cssVars.primary.DEFAULT }} />
          <span className="font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
            {project.progress}%
          </span>
        </div>
      ),
    },
    {
      key: 'expectedEndDate',
      header: t('projects.table.deadline'),
      render: (project: Project) => (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" style={{ color: cssVars.neutral.textMuted }} />
          <span style={{ color: cssVars.neutral.textSecondary }}>
            {new Date(project.expectedEndDate).toLocaleDateString('ar-SA')}
          </span>
        </div>
      ),
    },
    {
      key: 'status',
      header: t('projects.table.status'),
      render: (project: Project) => (
        <StatusBadge
          status={project.status}
          labels={{
            draft: t('projects.statuses.draft'),
            pending_contract: t('projects.statuses.pending_contract'),
            active: t('projects.statuses.active'),
            on_hold: t('projects.statuses.on_hold'),
            completed: t('projects.statuses.completed'),
            cancelled: t('projects.statuses.cancelled'),
            disputed: t('projects.statuses.disputed'),
          }}
        />
      ),
    },
    {
      key: 'actions',
      header: t('projects.table.actions'),
      render: (project: Project) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/admin/projects/${project.id}`);
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
      <AdminPageHeader
        title={t('projects.title')}
        description={t('projects.description')}
        icon={Briefcase}
      />

      <AdminDataTable
        data={projects}
        columns={columns}
        searchPlaceholder={t('projects.search')}
        onRowClick={(project) => router.push(`/admin/projects/${project.id}`)}
        isLoading={loading}
        emptyMessage={t('projects.empty')}
      />
    </div>
  );
}
