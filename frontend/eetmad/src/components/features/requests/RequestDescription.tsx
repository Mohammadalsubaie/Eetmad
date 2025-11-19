'use client';

import { cssVars } from '@/styles/theme';
import { useTranslations } from 'next-intl';
import type { Request } from '@/lib/types/request.types';

interface RequestDescriptionProps {
  request: Request;
}

export default function RequestDescription({ request }: RequestDescriptionProps) {
  const t = useTranslations('pages.requests');

  return (
    <div
      className="rounded-2xl border-2 p-6"
      style={{
        backgroundColor: cssVars.neutral.surface,
        borderColor: cssVars.neutral.border,
      }}
    >
      <h2 className="mb-4 text-xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
        {t('description')}
      </h2>
      <p className="leading-relaxed" style={{ color: cssVars.neutral.textSecondary }}>
        {request.description}
      </p>
    </div>
  );
}

