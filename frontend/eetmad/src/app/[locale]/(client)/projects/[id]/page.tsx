'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Calendar,
  DollarSign,
  TrendingUp,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
} from 'lucide-react';
import { cssVars } from '@/styles/theme';
import { projectsApi } from '@/lib/api/projects';
import type { Project } from '@/lib/types/project.types';
import { Badge } from '@/components/ui';
import { Button } from '@/components/ui/Button';

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const t = useTranslations('pages.projects');
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProject = useCallback(
    async (projectId: string) => {
      try {
        setLoading(true);
        setError(null);
        const data = await projectsApi.getById(projectId);
        setProject(data);
      } catch (err) {
        console.error('Failed to fetch project:', err);
        setError(t('fetchError'));
      } finally {
        setLoading(false);
      }
    },
    [t]
  );

  useEffect(() => {
    if (id) {
      fetchProject(id);
    }
  }, [id, fetchProject]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatCurrency = (amount: number) => {
    return `${amount.toLocaleString()} ${t('currency')}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return cssVars.status.success;
      case 'pending_contract':
        return cssVars.status.warning;
      case 'completed':
        return cssVars.primary.DEFAULT;
      case 'cancelled':
      case 'disputed':
        return cssVars.status.error;
      case 'on_hold':
        return cssVars.neutral.textSecondary;
      default:
        return cssVars.neutral.textSecondary;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return CheckCircle2;
      case 'active':
        return TrendingUp;
      case 'pending_contract':
      case 'on_hold':
        return Clock;
      case 'cancelled':
      case 'disputed':
        return AlertCircle;
      default:
        return Clock;
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
        <div className="flex items-center justify-center py-12">
          <div className="text-lg font-medium" style={{ color: cssVars.neutral.textSecondary }}>
            {t('loading')}
          </div>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
        <div
          className="rounded-2xl border-2 p-8 text-center"
          style={{ borderColor: cssVars.status.error }}
        >
          <p style={{ color: cssVars.status.error }}>{error || t('notFound')}</p>
          <Button
            onClick={() => router.push('/projects')}
            className="mt-4"
            style={{
              background: cssVars.gradient.gold,
              color: cssVars.secondary.DEFAULT,
            }}
          >
            {t('backToProjects')}
          </Button>
        </div>
      </div>
    );
  }

  const StatusIcon = getStatusIcon(project.status);

  return (
    <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
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
      <div
        className="mb-8 rounded-2xl border-2 p-6"
        style={{ backgroundColor: cssVars.neutral.surface, borderColor: cssVars.neutral.border }}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="mb-2 flex items-center gap-2">
              <Badge
                style={{
                  backgroundColor: `color-mix(in srgb, ${getStatusColor(project.status)} 15%, transparent)`,
                  color: getStatusColor(project.status),
                  borderColor: getStatusColor(project.status),
                }}
              >
                <StatusIcon className="mr-1 h-3 w-3" />
                {t(`status.${project.status}`)}
              </Badge>
              {project.projectNumber && (
                <span className="text-sm font-medium" style={{ color: cssVars.neutral.textMuted }}>
                  {project.projectNumber}
                </span>
              )}
            </div>
            <h1 className="mb-4 text-3xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
              {t('projectTitle')} #{project.id}
            </h1>
          </div>
        </div>

        {/* Progress Bar */}
        {project.status === 'active' && (
          <div className="mb-4">
            <div className="mb-2 flex items-center justify-between">
              <span
                className="text-sm font-medium"
                style={{ color: cssVars.neutral.textSecondary }}
              >
                {t('progress')}
              </span>
              <span className="text-sm font-bold" style={{ color: cssVars.primary.DEFAULT }}>
                {project.progress}%
              </span>
            </div>
            <div
              className="h-3 w-full overflow-hidden rounded-full"
              style={{
                backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 20%, transparent)`,
              }}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${project.progress}%` }}
                transition={{ duration: 0.5 }}
                className="h-full rounded-full"
                style={{ background: cssVars.gradient.primary }}
              />
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" style={{ color: cssVars.primary.DEFAULT }} />
            <div>
              <p className="text-xs" style={{ color: cssVars.neutral.textMuted }}>
                {t('totalAmount')}
              </p>
              <p className="text-sm font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                {formatCurrency(project.totalAmount)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5" style={{ color: cssVars.primary.DEFAULT }} />
            <div>
              <p className="text-xs" style={{ color: cssVars.neutral.textMuted }}>
                {t('startDate')}
              </p>
              <p className="text-sm font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                {formatDate(project.startDate)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5" style={{ color: cssVars.primary.DEFAULT }} />
            <div>
              <p className="text-xs" style={{ color: cssVars.neutral.textMuted }}>
                {t('expectedEndDate')}
              </p>
              <p className="text-sm font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                {formatDate(project.expectedEndDate)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5" style={{ color: cssVars.primary.DEFAULT }} />
            <div>
              <p className="text-xs" style={{ color: cssVars.neutral.textMuted }}>
                {t('milestones')}
              </p>
              <p className="text-sm font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                {project.milestones?.length || 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-6 md:col-span-2">
          {/* Milestones */}
          {project.milestones && project.milestones.length > 0 && (
            <div
              className="rounded-2xl border-2 p-6"
              style={{
                backgroundColor: cssVars.neutral.surface,
                borderColor: cssVars.neutral.border,
              }}
            >
              <h2 className="mb-4 text-xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                {t('milestones')}
              </h2>
              <div className="space-y-4">
                {project.milestones.map((milestone) => (
                  <div
                    key={milestone.id}
                    className="rounded-xl border-2 p-4"
                    style={{ borderColor: cssVars.neutral.border }}
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                        {milestone.title}
                      </h3>
                      <Badge
                        style={{
                          backgroundColor: `color-mix(in srgb, ${cssVars.status.success} 15%, transparent)`,
                          color: cssVars.status.success,
                          borderColor: cssVars.status.success,
                        }}
                      >
                        {t(`milestoneStatus.${milestone.status}`)}
                      </Badge>
                    </div>
                    <p className="mb-2 text-sm" style={{ color: cssVars.neutral.textSecondary }}>
                      {milestone.description}
                    </p>
                    <div
                      className="flex items-center gap-4 text-xs"
                      style={{ color: cssVars.neutral.textMuted }}
                    >
                      <span>{formatCurrency(milestone.amount)}</span>
                      <span>{formatDate(milestone.dueDate)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Payment Info */}
          <div
            className="rounded-2xl border-2 p-6"
            style={{
              backgroundColor: cssVars.neutral.surface,
              borderColor: cssVars.neutral.border,
            }}
          >
            <h3 className="mb-4 text-lg font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
              {t('paymentInfo')}
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm" style={{ color: cssVars.neutral.textMuted }}>
                  {t('depositAmount')}
                </span>
                <span className="text-sm font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                  {formatCurrency(project.depositAmount)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm" style={{ color: cssVars.neutral.textMuted }}>
                  {t('finalAmount')}
                </span>
                <span className="text-sm font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                  {formatCurrency(project.finalAmount)}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          {project.status === 'active' && (
            <Button
              onClick={() => router.push(`/projects/${id}/milestones`)}
              className="w-full"
              style={{
                background: cssVars.gradient.gold,
                color: cssVars.secondary.DEFAULT,
              }}
            >
              {t('viewMilestones')}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
