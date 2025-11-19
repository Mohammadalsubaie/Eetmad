'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui';
import { cssVars } from '@/styles/theme';
import { Upload } from 'lucide-react';
import type { Project } from '@/lib/types/project.types';

interface ProjectActionsProps {
  project: Project;
  projectId: string;
  variant?: 'client' | 'supplier';
}

export default function ProjectActions({ project, projectId, variant = 'client' }: ProjectActionsProps) {
  const t = useTranslations('pages.projects');
  const router = useRouter();

  if (project.status !== 'active') {
    return null;
  }

  if (variant === 'supplier') {
    return (
      <Button
        onClick={() => {
          /* TODO: Submit milestone */
        }}
        className="flex w-full items-center gap-2"
        variant="primary"
        style={{
          background: cssVars.gradient.gold,
          color: cssVars.secondary.DEFAULT,
        }}
      >
        <Upload className="h-5 w-5" />
        {t('submitMilestone')}
      </Button>
    );
  }

  return (
    <Button
      onClick={() => router.push(`/projects/${projectId}/milestones`)}
      className="w-full"
      variant="primary"
      style={{
        background: cssVars.gradient.gold,
        color: cssVars.secondary.DEFAULT,
      }}
    >
      {t('viewMilestones')}
    </Button>
  );
}

