'use client';

import { useParams, useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { cssVars } from '@/styles/theme';
import { ArrowLeft, Target } from 'lucide-react';
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
      <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
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
      <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
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
    <div className="relative min-h-screen" style={{ backgroundColor: cssVars.neutral.bg }}>
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute start-0 top-1/4 h-96 w-96 rounded-full blur-3xl"
          style={{ background: cssVars.accent.primary }}
        />
        <div
          className="absolute bottom-1/4 end-0 h-96 w-96 rounded-full blur-3xl"
          style={{ background: cssVars.primary.DEFAULT }}
        />
      </div>

      <div className="container relative mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: t('title'), href: `/${locale}/projects` },
            { label: project.projectNumber || projectId },
            { label: t('milestonesSection.title') },
          ]}
          className="mb-6"
        />

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="mb-6 flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push(`/${locale}/projects/${projectId}`)}
              className="rounded-xl p-2 transition-all"
              style={{
                backgroundColor: `color-mix(in srgb, ${cssVars.neutral.border} 30%, transparent)`,
              }}
            >
              <ArrowLeft className="h-5 w-5" style={{ color: cssVars.neutral.textSecondary }} />
            </motion.button>
            <div className="flex items-center gap-3">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl"
                style={{
                  backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 15%, transparent)`,
                }}
              >
                <Target className="h-6 w-6" style={{ color: cssVars.primary.DEFAULT }} />
              </div>
              <div>
                <h1
                  className="mb-1 text-3xl font-bold lg:text-4xl"
                  style={{ color: cssVars.secondary.DEFAULT }}
                >
                  {t('milestonesSection.title')}
                </h1>
                <p className="text-base" style={{ color: cssVars.neutral.textSecondary }}>
                  {project.projectNumber || `Project #${projectId}`}
                </p>
              </div>
            </div>
          </div>

          {t('milestonesSection.description') && (
            <p className="text-lg" style={{ color: cssVars.neutral.textSecondary }}>
              {t('milestonesSection.description')}
            </p>
          )}
        </motion.div>

        {/* Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-8"
        >
          <ProjectMilestonesSummary project={project} milestones={milestones} />
        </motion.div>

        {/* Milestones List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="space-y-6"
        >
          {milestones.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <EmptyState
                title={t('milestonesSection.empty')}
                description={t('milestonesSection.emptyDescription')}
              />
            </motion.div>
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
        </motion.div>
      </div>
    </div>
  );
}
