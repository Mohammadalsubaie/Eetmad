// src/components/shared/layouts/Section.tsx

'use client';

import { cn } from '@/lib/utils/cn';
import { cssVars } from '@/styles/theme';
import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  background?: 'white' | 'gray' | 'primary';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

const paddingStyles = {
  none: '',
  sm: 'py-8',
  md: 'py-12',
  lg: 'py-16',
  xl: 'py-24',
};

const getBackgroundStyle = (background: 'white' | 'gray' | 'primary'): React.CSSProperties => {
  switch (background) {
    case 'primary':
      return {
        backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 5%, transparent)`,
      };
    case 'gray':
      return {
        backgroundColor: cssVars.neutral.surfaceAlt,
      };
    default:
      return {
        backgroundColor: cssVars.neutral.bg,
      };
  }
};

const Section: React.FC<SectionProps> = ({
  children,
  className,
  background = 'white',
  padding = 'lg',
}) => {
  return (
    <section className={cn(paddingStyles[padding], className)} style={getBackgroundStyle(background)}>
      {children}
    </section>
  );
};

export default Section;
