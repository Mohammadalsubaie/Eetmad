// src/components/shared/layouts/PageContainer.tsx

import { cn } from '@/lib/utils/cn';
import React from 'react';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}

const maxWidthStyles = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
  '2xl': 'max-w-screen-2xl',
  full: 'max-w-full',
};

const PageContainer: React.FC<PageContainerProps> = ({ children, className, maxWidth = 'xl' }) => {
  return (
    <div className={cn('mx-auto w-full px-4 sm:px-6 lg:px-8', maxWidthStyles[maxWidth], className)}>
      {children}
    </div>
  );
};

export default PageContainer;
