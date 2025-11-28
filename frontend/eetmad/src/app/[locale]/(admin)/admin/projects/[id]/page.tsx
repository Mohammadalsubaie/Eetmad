'use client';

import ProjectActions from '@/components/features/projects/ProjectActions';
import ProjectFiles from '@/components/features/projects/ProjectFiles';
import ProjectHeader from '@/components/features/projects/ProjectHeader';
import ProjectMilestonesList from '@/components/features/projects/ProjectMilestonesList';
import ProjectPaymentInfo from '@/components/features/projects/ProjectPaymentInfo';
import ProjectStats from '@/components/features/projects/ProjectStats';
import ProjectTimeline from '@/components/features/projects/ProjectTimeline';
import AdminPageHeader from '@/components/shared/admin/AdminPageHeader';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';
import { ErrorMessage, LoadingSpinner } from '@/components/ui';
import { useProject } from '@/lib/hooks/useProjects';
import { cssVars } from '@/styles/theme';
import { motion } from 'framer-motion';
import { ArrowLeft, Briefcase } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const t = useTranslations('admin');
  const tPages = useTranslations('pages');
  const locale = useLocale();
  const projectId = params.id as string;

  const { data: project, isLoading, error } = useProject(projectId);

  if (isLoading) {
    return (
      <div>
        <Breadcrumbs
          items={[
            { label: tPages('admin.title'), href: `/${locale}/admin` },
            { label: tPages('projects.title'), href: `/${locale}/admin/projects` },
            { label: projectId },
          ]}
          className="mb-6"
        />
        <div className="flex h-64 items-center justify-center">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div>
        <Breadcrumbs
          items={[
            { label: tPages('admin.title'), href: `/${locale}/admin` },
            { label: tPages('projects.title'), href: `/${locale}/admin/projects` },
            { label: projectId },
          ]}
          className="mb-6"
        />
        <div className="flex h-64 items-center justify-center">
          <ErrorMessage error={error?.message || t('projects.notFound')} variant="banner" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: tPages('admin.title'), href: `/${locale}/admin` },
          { label: tPages('projects.title'), href: `/${locale}/admin/projects` },
          { label: project.projectNumber || projectId },
        ]}
        className="mb-6"
      />
      {/* Header */}
      <div className="mb-4 flex items-start gap-2 sm:mb-6 sm:items-center sm:gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.back()}
          className="flex-shrink-0 rounded-xl p-2 transition-all"
          style={{
            backgroundColor: `color-mix(in srgb, ${cssVars.neutral.border} 30%, transparent)`,
          }}
        >
          <ArrowLeft
            className="h-4 w-4 sm:h-5 sm:w-5"
            style={{ color: cssVars.neutral.textSecondary }}
          />
        </motion.button>
        <div className="min-w-0 flex-1">
          <AdminPageHeader
            title={project.projectNumber || t('projects.detail.title')}
            description={t('projects.detail.description')}
            icon={Briefcase}
          />
        </div>
      </div>

      <ProjectHeader project={project} />

      {/* Stats */}
      <ProjectStats project={project} />

      {/* Details Sections */}
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
        <ProjectTimeline />
        <ProjectMilestonesList project={project} />
        <ProjectPaymentInfo project={project} />
        <ProjectFiles />
        <ProjectActions project={project} projectId={projectId} />
      </div>
    </div>
  );
}
