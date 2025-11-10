// src/components/shared/layouts/Section.tsx

import { cn } from '@/lib/utils/cn';
import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  background?: 'white' | 'gray' | 'primary';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

const backgroundStyles = {
  white: 'bg-background',
  gray: 'bg-muted/30',
  primary: 'bg-primary-50 dark:bg-primary-950/20',
};

const paddingStyles = {
  none: '',
  sm: 'py-8',
  md: 'py-12',
  lg: 'py-16',
  xl: 'py-24',
};

const Section: React.FC<SectionProps> = ({
  children,
  className,
  background = 'white',
  padding = 'lg',
}) => {
  return (
    <section className={cn(backgroundStyles[background], paddingStyles[padding], className)}>
      {children}
    </section>
  );
};

export default Section;
