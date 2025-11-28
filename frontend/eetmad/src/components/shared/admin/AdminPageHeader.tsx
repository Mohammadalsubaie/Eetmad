'use client';

import { cssVars } from '@/styles/theme';
import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

interface AdminPageHeaderProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  action?: ReactNode;
}

export default function AdminPageHeader({
  title,
  description,
  icon: Icon,
  action,
}: AdminPageHeaderProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3 sm:gap-4">
        {Icon && (
          <div
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl shadow-md sm:h-12 sm:w-12 sm:rounded-2xl md:h-14 md:w-14"
            style={{ background: cssVars.gradient.primary }}
          >
            <Icon
              className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7"
              style={{ color: cssVars.neutral.surface }}
            />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <h1
            className="truncate text-xl font-bold sm:text-2xl md:text-3xl"
            style={{ color: cssVars.secondary.DEFAULT }}
          >
            {title}
          </h1>
          {description && (
            <p
              className="mt-1 line-clamp-2 text-sm sm:text-base"
              style={{ color: cssVars.neutral.textSecondary }}
            >
              {description}
            </p>
          )}
        </div>
      </div>
      {action && <div className="w-full flex-shrink-0 sm:w-auto">{action}</div>}
    </div>
  );
}
