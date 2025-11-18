'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { cssVars } from '@/styles/theme';
import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  FileText,
  TrendingUp,
  XCircle,
  Download,
} from 'lucide-react';
import type { Project, ProjectMilestone } from '@/lib/types/project.types';
import { projectsApi } from '@/lib/api/projects';
import StatusBadge from '@/components/shared/badges/StatusBadge';

export default function ProjectMilestonesPage() {
  const params = useParams();
  const router = useRouter();
  const t = useTranslations('pages.projects');
  const projectId = params.id as string;

  const [project, setProject] = useState<Project | null>(null);
  const [milestones, setMilestones] = useState<ProjectMilestone[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch project and milestones
        const [projectData, milestonesData] = await Promise.all([
          projectsApi.getById(projectId),
          projectsApi.getMilestones(projectId),
        ]);
        setProject(projectData);
        setMilestones(milestonesData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (projectId) {
      fetchData();
    }
  }, [projectId]);

  const handleApprove = async (milestoneId: string) => {
    // TODO: Implement approve milestone
    console.log('Approve milestone:', milestoneId);
  };

  const handleReject = async (milestoneId: string) => {
    // TODO: Implement reject milestone
    console.log('Reject milestone:', milestoneId);
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div style={{ color: cssVars.neutral.textSecondary }}>{t('milestones.loading')}</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div style={{ color: cssVars.status.error }}>{t('milestones.notFound')}</div>
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
            {t('milestones.title')}
          </h1>
          <p className="mt-1 text-base" style={{ color: cssVars.neutral.textSecondary }}>
            {project.projectNumber}
          </p>
        </div>
      </div>

      {/* Project Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 rounded-2xl border-2 p-6 shadow-md"
        style={{
          backgroundColor: cssVars.neutral.surface,
          borderColor: cssVars.neutral.border,
        }}
      >
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <div
              className="mb-2 text-xs font-semibold"
              style={{ color: cssVars.neutral.textMuted }}
            >
              {t('milestones.totalAmount')}
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" style={{ color: cssVars.status.success }} />
              <span className="text-xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                {project.totalAmount.toLocaleString('ar-SA')} {t('milestones.currency')}
              </span>
            </div>
          </div>
          <div>
            <div
              className="mb-2 text-xs font-semibold"
              style={{ color: cssVars.neutral.textMuted }}
            >
              {t('milestones.progress')}
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" style={{ color: cssVars.primary.DEFAULT }} />
              <span className="text-xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                {project.progress}%
              </span>
            </div>
          </div>
          <div>
            <div
              className="mb-2 text-xs font-semibold"
              style={{ color: cssVars.neutral.textMuted }}
            >
              {t('milestones.completedMilestones')}
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" style={{ color: cssVars.status.success }} />
              <span className="text-xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                {
                  milestones.filter((m) => m.status === 'completed' || m.status === 'approved')
                    .length
                }{' '}
                / {milestones.length}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Milestones List */}
      <div className="space-y-4">
        {milestones.length === 0 ? (
          <div
            className="rounded-2xl border-2 p-12 text-center"
            style={{
              backgroundColor: cssVars.neutral.surface,
              borderColor: cssVars.neutral.border,
            }}
          >
            <p style={{ color: cssVars.neutral.textSecondary }}>{t('milestones.empty')}</p>
          </div>
        ) : (
          milestones.map((milestone, index) => (
            <motion.div
              key={milestone.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="rounded-2xl border-2 p-6 shadow-md"
              style={{
                backgroundColor: cssVars.neutral.surface,
                borderColor: cssVars.neutral.border,
              }}
            >
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl font-bold"
                    style={{
                      backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 15%, transparent)`,
                      color: cssVars.primary.DEFAULT,
                    }}
                  >
                    {milestone.milestoneNumber}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                      {milestone.title}
                    </h3>
                    <p className="mt-1 text-sm" style={{ color: cssVars.neutral.textSecondary }}>
                      {milestone.description}
                    </p>
                  </div>
                </div>
                <StatusBadge
                  status={milestone.status}
                  labels={{
                    pending: t('milestones.statuses.pending'),
                    in_progress: t('milestones.statuses.in_progress'),
                    completed: t('milestones.statuses.completed'),
                    approved: t('milestones.statuses.approved'),
                    rejected: t('milestones.statuses.rejected'),
                  }}
                />
              </div>

              {/* Milestone Details */}
              <div
                className="mb-4 grid gap-4 border-t pt-4 sm:grid-cols-3"
                style={{ borderColor: cssVars.neutral.border }}
              >
                <div>
                  <div
                    className="mb-2 text-xs font-semibold"
                    style={{ color: cssVars.neutral.textMuted }}
                  >
                    {t('milestones.amount')}
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" style={{ color: cssVars.status.success }} />
                    <span className="font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                      {milestone.amount.toLocaleString('ar-SA')} {t('milestones.currency')}
                    </span>
                  </div>
                </div>
                <div>
                  <div
                    className="mb-2 text-xs font-semibold"
                    style={{ color: cssVars.neutral.textMuted }}
                  >
                    {t('milestones.dueDate')}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" style={{ color: cssVars.neutral.textMuted }} />
                    <span style={{ color: cssVars.secondary.DEFAULT }}>
                      {new Date(milestone.dueDate).toLocaleDateString('en-US')}
                    </span>
                  </div>
                </div>
                <div>
                  <div
                    className="mb-2 text-xs font-semibold"
                    style={{ color: cssVars.neutral.textMuted }}
                  >
                    {t('milestones.paymentStatus')}
                  </div>
                  <div className="flex items-center gap-2">
                    {milestone.paymentReleased ? (
                      <>
                        <CheckCircle
                          className="h-4 w-4"
                          style={{ color: cssVars.status.success }}
                        />
                        <span style={{ color: cssVars.status.success }}>
                          {t('milestones.paid')}
                        </span>
                      </>
                    ) : (
                      <>
                        <Clock className="h-4 w-4" style={{ color: cssVars.status.warning }} />
                        <span style={{ color: cssVars.status.warning }}>
                          {t('milestones.pending')}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Deliverables */}
              {milestone.deliverables && (
                <div
                  className="mb-4 rounded-xl border-2 p-4"
                  style={{ borderColor: cssVars.neutral.border }}
                >
                  <div
                    className="mb-2 text-xs font-semibold"
                    style={{ color: cssVars.neutral.textMuted }}
                  >
                    {t('milestones.deliverables')}
                  </div>
                  <p style={{ color: cssVars.secondary.DEFAULT }}>{milestone.deliverables}</p>
                </div>
              )}

              {/* Attachments */}
              {milestone.attachments && milestone.attachments.length > 0 && (
                <div className="mb-4">
                  <div
                    className="mb-2 text-xs font-semibold"
                    style={{ color: cssVars.neutral.textMuted }}
                  >
                    {t('milestones.attachments')}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {milestone.attachments.map((attachment) => (
                      <motion.a
                        key={attachment.id}
                        href={attachment.filePath}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-2 rounded-lg border-2 px-3 py-2 transition-all"
                        style={{
                          backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 10%, transparent)`,
                          borderColor: cssVars.primary.DEFAULT,
                        }}
                      >
                        <FileText className="h-4 w-4" style={{ color: cssVars.primary.DEFAULT }} />
                        <span
                          className="text-sm font-semibold"
                          style={{ color: cssVars.secondary.DEFAULT }}
                        >
                          {attachment.filePath.split('/').pop()}
                        </span>
                        <Download className="h-4 w-4" style={{ color: cssVars.primary.DEFAULT }} />
                      </motion.a>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes */}
              {milestone.notes && (
                <div
                  className="mb-4 rounded-xl border-2 p-4"
                  style={{ borderColor: cssVars.neutral.border }}
                >
                  <div
                    className="mb-2 text-xs font-semibold"
                    style={{ color: cssVars.neutral.textMuted }}
                  >
                    {t('milestones.notes')}
                  </div>
                  <p style={{ color: cssVars.secondary.DEFAULT }}>{milestone.notes}</p>
                </div>
              )}

              {/* Actions */}
              {milestone.status === 'completed' && (
                <div
                  className="flex gap-3 border-t pt-4"
                  style={{ borderColor: cssVars.neutral.border }}
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleApprove(milestone.id)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 font-semibold transition-all"
                    style={{
                      background: cssVars.gradient.gold,
                      color: cssVars.secondary.DEFAULT,
                    }}
                  >
                    <CheckCircle className="h-4 w-4" />
                    {t('milestones.actions.approve')}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleReject(milestone.id)}
                    className="flex items-center gap-2 rounded-xl border-2 px-4 py-3 font-semibold transition-all"
                    style={{
                      borderColor: cssVars.status.error,
                      color: cssVars.status.error,
                      backgroundColor: 'transparent',
                    }}
                  >
                    <XCircle className="h-4 w-4" />
                    {t('milestones.actions.reject')}
                  </motion.button>
                </div>
              )}
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
