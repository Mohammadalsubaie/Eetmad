'use client';

import AdminDataTable from '@/components/shared/admin/AdminDataTable';
import AdminPageHeader from '@/components/shared/admin/AdminPageHeader';
import { useProjects } from '@/lib/hooks/useProjects';
import { Briefcase } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';
import { useProjectsTableColumns } from '@/components/features/admin/ProjectsTableColumns';

export default function ProjectsManagementPage() {
  const t = useTranslations('admin');
  const tPages = useTranslations('pages');
  const locale = useLocale();
  const router = useRouter();
  const { data: projects, isLoading } = useProjects();
  const columns = useProjectsTableColumns();

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: tPages('admin.title'), href: `/${locale}/admin` },
          { label: tPages('projects.title') },
        ]}
        className="mb-6"
      />

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
        isLoading={isLoading}
        emptyMessage={t('projects.empty')}
      />
    </div>
  );
}
