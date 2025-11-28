'use client';

import { cn } from '@/lib/utils/cn';
import React from 'react';

interface ResourceGridProps {
  children: React.ReactNode;
  columns?: {
    default?: 1 | 2 | 3 | 4;
    sm?: 1 | 2 | 3 | 4;
    md?: 1 | 2 | 3 | 4;
    lg?: 1 | 2 | 3 | 4;
    xl?: 1 | 2 | 3 | 4;
  };
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

const gapClasses = {
  sm: 'gap-4',
  md: 'gap-6',
  lg: 'gap-8',
};

const gridColClasses = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
};

const ResourceGrid: React.FC<ResourceGridProps> = ({
  children,
  columns = { default: 1, md: 2, lg: 3 },
  gap = 'md',
  className,
}) => {
  const gridClasses = [
    'grid',
    gapClasses[gap],
    columns.default && gridColClasses[columns.default],
    columns.sm && `sm:${gridColClasses[columns.sm]}`,
    columns.md && `md:${gridColClasses[columns.md]}`,
    columns.lg && `lg:${gridColClasses[columns.lg]}`,
    columns.xl && `xl:${gridColClasses[columns.xl]}`,
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={cn(gridClasses, className)}>{children}</div>;
};

export default ResourceGrid;
