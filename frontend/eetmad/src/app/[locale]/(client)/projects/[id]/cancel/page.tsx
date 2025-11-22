'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowLeft, XCircle } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import { useProject, useCancelProject } from '@/lib/hooks/useProjects';
import { LoadingSpinner, ErrorMessage, Button } from '@/components/ui';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';
import Input from '@/components/ui/Input/Input';

export default function CancelProjectPage() {
  const params = useParams();
  const router = useRouter();
  const locale = useLocale();
  const id = params.id as string;
  const t = useTranslations('pages.projects');
  const { data: project, isLoading: projectLoading } = useProject(id);
  const { mutate: cancelProject, isLoading: cancelling, error } = useCancelProject();
  const [reason, setReason] = useState('');

  const handleCancel = async () => {
    if (!reason.trim()) {
      alert(t('reasonRequired'));
      return;
    }

    if (confirm(t('confirmCancel'))) {
      try {
        await cancelProject(id, reason);
        router.push(`/${locale}/projects/${id}`);
      } catch (err) {
        // Error handled by hook
      }
    }
  };

  if (projectLoading) {
    return (
      <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
        <Breadcrumbs
          items={[
            { label: t('title'), href: `/${locale}/projects` },
            { label: id },
            { label: t('cancel') },
          ]}
          className="mb-6"
        />
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
        <Breadcrumbs
          items={[
            { label: t('title'), href: `/${locale}/projects` },
            { label: id },
            { label: t('cancel') },
          ]}
          className="mb-6"
        />
        <ErrorMessage error={t('projectNotFound')} variant="banner" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
      <Breadcrumbs
        items={[
          { label: t('title'), href: `/${locale}/projects` },
          { label: project.projectNumber || id, href: `/${locale}/projects/${id}` },
          { label: t('cancel') },
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
        <div className="mb-2 flex items-center gap-3">
          <XCircle className="h-8 w-8" style={{ color: cssVars.status.error }} />
          <h1 className="text-4xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
            {t('cancelProject')}
          </h1>
        </div>
        <p className="text-base" style={{ color: cssVars.neutral.textSecondary }}>
          {t('cancelProjectDescription')}
        </p>
      </div>

      {/* Project Info */}
      <div
        className="mb-8 rounded-2xl border-2 p-6"
        style={{
          backgroundColor: cssVars.neutral.surface,
          borderColor: cssVars.status.error,
        }}
      >
        <h2 className="mb-4 text-xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
          {project.projectNumber}
        </h2>
        <p className="text-sm" style={{ color: cssVars.neutral.textSecondary }}>
          {t('cancelProjectWarning')}
        </p>
      </div>

      {/* Reason Input */}
      <div className="mb-8">
        <label
          htmlFor="reason"
          className="mb-2 block text-sm font-bold"
          style={{ color: cssVars.secondary.DEFAULT }}
        >
          {t('cancelReason')} *
        </label>
        <textarea
          id="reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
          rows={6}
          className="w-full rounded-xl border-2 px-4 py-3 text-sm"
          style={{
            backgroundColor: cssVars.neutral.surface,
            borderColor: cssVars.neutral.border,
            color: cssVars.secondary.DEFAULT,
          }}
          placeholder={t('cancelReasonPlaceholder')}
        />
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6">
          <ErrorMessage error={error.message || String(error)} variant="inline" />
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          className="flex-1"
          style={{
            borderColor: cssVars.neutral.border,
            color: cssVars.neutral.textSecondary,
          }}
        >
          {t('cancel')}
        </Button>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
          <Button
            onClick={handleCancel}
            disabled={cancelling || !reason.trim()}
            className="w-full"
            icon={XCircle}
            style={{
              borderColor: cssVars.status.error,
              color: cssVars.status.error,
            }}
            variant="outline"
          >
            {cancelling ? t('cancelling') : t('confirmCancel')}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
