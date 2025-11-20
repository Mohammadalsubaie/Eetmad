'use client';

import { useParams, useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import { useProject } from '@/lib/hooks/useProjects';
import { LoadingSpinner, ErrorMessage, Button } from '@/components/ui';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';
import ProjectHeader from '@/components/features/projects/ProjectHeader';
import ProjectStats from '@/components/features/projects/ProjectStats';
import ProjectMilestonesList from '@/components/features/projects/ProjectMilestonesList';
import ProjectPaymentInfo from '@/components/features/projects/ProjectPaymentInfo';
import ProjectActions from '@/components/features/projects/ProjectActions';

export default function SupplierProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const t = useTranslations('pages.projects');
  const locale = useLocale();
  const { data: project, isLoading, error } = useProject(id);

  if (isLoading) {
    return (
      <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
        <Breadcrumbs
          items={[
            { label: 'Supplier projects', href: `/${locale}/supplier-projects` },
            { label: id },
          ]}
          className="mb-6"
        />
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
        <Breadcrumbs
          items={[
            { label: 'Supplier projects', href: `/${locale}/supplier-projects` },
            { label: id },
          ]}
          className="mb-6"
        />
        <div className="flex flex-col items-center gap-4">
          <ErrorMessage
            error={error?.message || t('notFound')}
            variant="banner"
          />
          <Button onClick={() => router.push('/supplier-projects')} variant="primary">
            {t('backToProjects')}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
      <Breadcrumbs
        items={[
          { label: 'Supplier projects', href: `/${locale}/supplier-projects` },
          { label: project.projectNumber || `#${id}` },
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

      <ProjectHeader project={project} variant="supplier" />
      <ProjectStats project={project} />

      {/* Content Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-6 md:col-span-2">
          <ProjectMilestonesList project={project} />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <ProjectPaymentInfo project={project} />
          <ProjectActions project={project} projectId={id} variant="supplier" />
        </div>
      </div>
    </div>
  );
}
