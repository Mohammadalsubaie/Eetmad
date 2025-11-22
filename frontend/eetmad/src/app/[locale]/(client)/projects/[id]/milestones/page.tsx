'use client';

import { useParams, useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { cssVars } from '@/styles/theme';
import { ArrowLeft } from 'lucide-react';
import { useProjectMilestones } from '@/lib/hooks/useProjects';
import { useApproveMilestone, useRejectMilestone } from '@/lib/hooks/useMilestones';
import { LoadingSpinner, ErrorMessage, EmptyState } from '@/components/ui';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';
import ProjectMilestonesSummary from '@/components/features/projects/ProjectMilestonesSummary';
import MilestoneCard from '@/components/features/projects/MilestoneCard';

export default function ProjectMilestonesPage() {
  const params = useParams();
  const router = useRouter();
  const t = useTranslations('pages.projects');
  const tPages = useTranslations('pages');
  const locale = useLocale();
  const projectId = params.id as string;

  const { project, milestones, isLoading, error } = useProjectMilestones(projectId);

  const { mutate: approveMilestone, isLoading: approving } = useApproveMilestone();
  const { mutate: rejectMilestone, isLoading: rejecting } = useRejectMilestone();

  const handleApprove = async (milestoneId: string) => {
    if (confirm(t('milestonesSection.confirmApprove'))) {
      try {
        await approveMilestone(milestoneId);
      } catch (err) {
        console.error('Failed to approve milestone:', err);
      }
    }
  };

  const handleReject = async (milestoneId: string) => {
    const reason = prompt(t('milestonesSection.rejectReasonPrompt'));
    if (reason) {
      try {
        await rejectMilestone(milestoneId, reason);
      } catch (err) {
        console.error('Failed to reject milestone:', err);
      }
    }
  };

  if (isLoading) {
    return (
      <div>
        <Breadcrumbs
          items={[
            { label: t('title'), href: `/${locale}/projects` },
            { label: projectId },
            { label: t('milestonesSection.title') },
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
            { label: t('title'), href: `/${locale}/projects` },
            { label: projectId },
            { label: t('milestonesSection.title') },
          ]}
          className="mb-6"
        />
        <div className="flex h-64 items-center justify-center">
          <ErrorMessage
            error={error?.message || t('milestonesSection.notFound')}
            variant="banner"
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push(`/projects/${projectId}`)}
          className="rounded-xl p-2 transition-all"
          style={{
            backgroundColor: `color-mix(in srgb, ${cssVars.neutral.border} 30%, transparent)`,
          }}
        >
          <ArrowLeft className="h-5 w-5" style={{ color: cssVars.neutral.textSecondary }} />
        </motion.button>
        <div>
          <h1 className="text-3xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
            {t('milestonesSection.title')}
          </h1>
          <p className="mt-1 text-base" style={{ color: cssVars.neutral.textSecondary }}>
            {project.projectNumber}
          </p>
        </div>
      </div>

      <ProjectMilestonesSummary project={project} milestones={milestones} />

      {/* Milestones List */}
      <div className="space-y-4">
        {milestones.length === 0 ? (
          <EmptyState title={t('milestonesSection.empty')} description="" />
        ) : (
          milestones.map((milestone, index) => (
            <MilestoneCard
              key={milestone.id}
              milestone={milestone}
              index={index}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          ))
        )}
      </div>
    </div>
  );
}
