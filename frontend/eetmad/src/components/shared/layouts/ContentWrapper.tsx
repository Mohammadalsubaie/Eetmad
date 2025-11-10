// src/components/shared/layouts/ContentWrapper.tsx

import { cn } from '@/lib/utils/cn';
import React from 'react';

interface ContentWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const ContentWrapper: React.FC<ContentWrapperProps> = ({ children, className }) => {
  return (
    <div className={cn('rounded-lg border border-border bg-card p-6 shadow-sm', className)}>
      {children}
    </div>
  );
};

export default ContentWrapper;
