'use client';

import { motion } from 'framer-motion';
import { cssVars } from '@/styles/theme';
import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

interface AdminPageHeaderProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  action?: ReactNode;
}

export default function AdminPageHeader({ title, description, icon: Icon, action }: AdminPageHeaderProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        {Icon && (
          <div
            className="flex h-14 w-14 items-center justify-center rounded-2xl shadow-md"
            style={{ background: cssVars.gradient.primary }}
          >
            <Icon className="h-7 w-7" style={{ color: cssVars.neutral.surface }} />
          </div>
        )}
        <div>
          <h1 className="text-3xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
            {title}
          </h1>
          {description && (
            <p className="mt-1 text-base" style={{ color: cssVars.neutral.textSecondary }}>
              {description}
            </p>
          )}
        </div>
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

