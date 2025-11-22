'use client';

import { useParams, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowLeft, Play } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import { useProject, useStartProject } from '@/lib/hooks/useProjects';
import { LoadingSpinner, ErrorMessage, Button } from '@/components/ui';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';

export default function StartProjectPage() {
  const params = useParams();
  const router = useRouter();
  const locale = useLocale();
  const id = params.id as string;
  const t = useTranslations('pages.projects');
  const { data: project, isLoading: projectLoading } = useProject(id);
  const { mutate: startProject, isLoading: starting, error } = useStartProject();

  const handleStart = async () => {
    if (confirm(t('confirmStart'))) {
      try {
        await startProject(id);
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
            { label: t('start') },
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
            { label: t('start') },
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
          { label: t('start') },
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
        <h1 className="mb-2 text-4xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
          {t('startProject')}
        </h1>
        <p className="text-base" style={{ color: cssVars.neutral.textSecondary }}>
          {t('startProjectDescription')}
        </p>
      </div>

      {/* Project Info */}
      <div
        className="mb-8 rounded-2xl border-2 p-6"
        style={{
          backgroundColor: cssVars.neutral.surface,
          borderColor: cssVars.neutral.border,
        }}
      >
        <h2 className="mb-4 text-xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
          {project.projectNumber}
        </h2>
        <p className="text-sm" style={{ color: cssVars.neutral.textSecondary }}>
          {t('startProjectInfo')}
        </p>
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
            onClick={handleStart}
            disabled={starting || project.status !== 'pending_contract'}
            className="w-full"
            icon={Play}
            style={{
              background: cssVars.gradient.gold,
              color: cssVars.secondary.DEFAULT,
            }}
          >
            {starting ? t('starting') : t('start')}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
