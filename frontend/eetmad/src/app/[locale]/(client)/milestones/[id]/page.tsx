'use client';

import { useParams, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Edit,
  CheckCircle2,
  XCircle,
  DollarSign,
  Calendar,
  Download,
  FileText,
  Clock,
} from 'lucide-react';
import { cssVars } from '@/styles/theme';
import {
  useMilestone,
  useApproveMilestone,
  useRejectMilestone,
  useCompleteMilestone,
} from '@/lib/hooks/useMilestones';
import { LoadingSpinner, ErrorMessage, Button } from '@/components/ui';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';
import StatusBadge from '@/components/shared/badges/StatusBadge';

export default function MilestoneDetailPage() {
  const params = useParams();
  const router = useRouter();
  const locale = useLocale();
  const id = params.id as string;
  const t = useTranslations('pages.projects');
  const { data: milestone, isLoading, error } = useMilestone(id);
  const { mutate: approveMilestone, isLoading: approving } = useApproveMilestone();
  const { mutate: rejectMilestone, isLoading: rejecting } = useRejectMilestone();
  const { mutate: completeMilestone, isLoading: completing } = useCompleteMilestone();

  const handleApprove = async () => {
    if (confirm(t('milestonesSection.confirmApprove'))) {
      try {
        await approveMilestone(id);
      } catch (err) {
        // Error handled by hook
      }
    }
  };

  const handleReject = async () => {
    const reason = prompt(t('milestonesSection.rejectReasonPrompt'));
    if (reason) {
      try {
        await rejectMilestone(id, reason);
      } catch (err) {
        // Error handled by hook
      }
    }
  };

  const handleComplete = async () => {
    const notes = prompt(t('milestonesSection.completeNotesPrompt'));
    try {
      await completeMilestone(id, notes || undefined);
    } catch (err) {
      // Error handled by hook
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
        <Breadcrumbs
          items={[
            { label: t('milestonesSection.title'), href: `/${locale}/milestones` },
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

  if (error || !milestone) {
    return (
      <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
        <Breadcrumbs
          items={[
            { label: t('milestonesSection.title'), href: `/${locale}/milestones` },
            { label: id },
          ]}
          className="mb-6"
        />
        <ErrorMessage error={error?.message || t('milestonesSection.notFound')} variant="banner" />
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatCurrency = (amount: number) => {
    return `${amount.toLocaleString()} ${t('milestonesSection.currency')}`;
  };

  return (
    <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
      <Breadcrumbs
        items={[
          { label: t('title'), href: `/${locale}/projects` },
          { label: milestone.projectId, href: `/${locale}/projects/${milestone.projectId}` },
          {
            label: t('milestonesSection.title'),
            href: `/${locale}/projects/${milestone.projectId}/milestones`,
          },
          { label: milestone.title },
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

      {/* Header */}
      <div className="mb-8">
        <div className="mb-4 flex items-center gap-2">
          <StatusBadge
            status={milestone.status}
            labels={{
              pending: t('milestonesSection.statuses.pending'),
              in_progress: t('milestonesSection.statuses.in_progress'),
              completed: t('milestonesSection.statuses.completed'),
              approved: t('milestonesSection.statuses.approved'),
              rejected: t('milestonesSection.statuses.rejected'),
            }}
            colorMap={{
              approved: cssVars.status.success,
              completed: cssVars.status.info,
              in_progress: cssVars.status.warning,
              pending: cssVars.neutral.textMuted,
              rejected: cssVars.status.error,
            }}
          />
          <div
            className="flex h-12 w-12 items-center justify-center rounded-xl font-bold"
            style={{
              backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 15%, transparent)`,
              color: cssVars.primary.DEFAULT,
            }}
          >
            {milestone.milestoneNumber}
          </div>
        </div>
        <h1 className="text-4xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
          {milestone.title}
        </h1>
        <p className="mt-2 text-base" style={{ color: cssVars.neutral.textSecondary }}>
          {milestone.description}
        </p>
      </div>

      {/* Content Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-6 md:col-span-2">
          {/* Details */}
          <div
            className="rounded-2xl border-2 p-6"
            style={{
              backgroundColor: cssVars.neutral.surface,
              borderColor: cssVars.neutral.border,
            }}
          >
            <h2 className="mb-4 text-xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
              {t('milestonesSection.details')}
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-xs font-semibold" style={{ color: cssVars.neutral.textMuted }}>
                  {t('milestonesSection.amount')}
                </p>
                <div className="mt-1 flex items-center gap-2">
                  <DollarSign className="h-4 w-4" style={{ color: cssVars.status.success }} />
                  <p className="text-lg font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                    {formatCurrency(milestone.amount)}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold" style={{ color: cssVars.neutral.textMuted }}>
                  {t('milestonesSection.dueDate')}
                </p>
                <div className="mt-1 flex items-center gap-2">
                  <Calendar className="h-4 w-4" style={{ color: cssVars.neutral.textMuted }} />
                  <p className="text-sm font-medium" style={{ color: cssVars.secondary.DEFAULT }}>
                    {formatDate(milestone.dueDate)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Deliverables */}
          {milestone.deliverables && (
            <div
              className="rounded-2xl border-2 p-6"
              style={{
                backgroundColor: cssVars.neutral.surface,
                borderColor: cssVars.neutral.border,
              }}
            >
              <h2 className="mb-4 text-xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                {t('milestonesSection.deliverables')}
              </h2>
              <p
                className="text-sm leading-relaxed"
                style={{ color: cssVars.neutral.textSecondary }}
              >
                {milestone.deliverables}
              </p>
            </div>
          )}

          {/* Attachments */}
          {milestone.attachments && milestone.attachments.length > 0 && (
            <div
              className="rounded-2xl border-2 p-6"
              style={{
                backgroundColor: cssVars.neutral.surface,
                borderColor: cssVars.neutral.border,
              }}
            >
              <h2 className="mb-4 text-xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                {t('milestonesSection.attachments')}
              </h2>
              <div className="space-y-2">
                {milestone.attachments.map((attachment) => (
                  <a
                    key={attachment.id}
                    href={attachment.filePath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-lg border-2 p-3 transition-all hover:shadow-md"
                    style={{
                      backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 10%, transparent)`,
                      borderColor: cssVars.primary.DEFAULT,
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" style={{ color: cssVars.primary.DEFAULT }} />
                      <span
                        className="text-sm font-medium"
                        style={{ color: cssVars.secondary.DEFAULT }}
                      >
                        {attachment.filePath.split('/').pop()}
                      </span>
                    </div>
                    <Download className="h-4 w-4" style={{ color: cssVars.primary.DEFAULT }} />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Notes */}
          {milestone.notes && (
            <div
              className="rounded-2xl border-2 p-6"
              style={{
                backgroundColor: cssVars.neutral.surface,
                borderColor: cssVars.neutral.border,
              }}
            >
              <h2 className="mb-4 text-xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                {t('milestonesSection.notes')}
              </h2>
              <p
                className="text-sm leading-relaxed"
                style={{ color: cssVars.neutral.textSecondary }}
              >
                {milestone.notes}
              </p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Actions */}
          <div className="space-y-3">
            {milestone.status === 'completed' && (
              <>
                <Button
                  onClick={handleApprove}
                  disabled={approving}
                  variant="primary"
                  icon={CheckCircle2}
                  fullWidth
                  style={{
                    background: cssVars.gradient.gold,
                    color: cssVars.secondary.DEFAULT,
                  }}
                >
                  {t('milestonesSection.actions.approve')}
                </Button>
                <Button
                  onClick={handleReject}
                  disabled={rejecting}
                  variant="outline"
                  icon={XCircle}
                  fullWidth
                  style={{
                    borderColor: cssVars.status.error,
                    color: cssVars.status.error,
                  }}
                >
                  {t('milestonesSection.actions.reject')}
                </Button>
              </>
            )}
            {milestone.status === 'pending' && (
              <Button
                onClick={handleComplete}
                disabled={completing}
                variant="primary"
                icon={CheckCircle2}
                fullWidth
                style={{
                  background: cssVars.gradient.gold,
                  color: cssVars.secondary.DEFAULT,
                }}
              >
                {t('milestonesSection.complete')}
              </Button>
            )}
            <Button
              onClick={() => router.push(`/${locale}/milestones/${id}/edit`)}
              variant="outline"
              icon={Edit}
              fullWidth
            >
              {t('milestonesSection.edit')}
            </Button>
          </div>

          {/* Payment Status */}
          <div
            className="rounded-2xl border-2 p-6"
            style={{
              backgroundColor: cssVars.neutral.surface,
              borderColor: cssVars.neutral.border,
            }}
          >
            <h3 className="mb-4 text-lg font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
              {t('milestonesSection.paymentStatus')}
            </h3>
            <div className="flex items-center gap-2">
              {milestone.paymentReleased ? (
                <>
                  <CheckCircle2 className="h-5 w-5" style={{ color: cssVars.status.success }} />
                  <span className="font-semibold" style={{ color: cssVars.status.success }}>
                    {t('milestonesSection.paid')}
                  </span>
                </>
              ) : (
                <>
                  <Clock className="h-5 w-5" style={{ color: cssVars.status.warning }} />
                  <span className="font-semibold" style={{ color: cssVars.status.warning }}>
                    {t('milestonesSection.pending')}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
