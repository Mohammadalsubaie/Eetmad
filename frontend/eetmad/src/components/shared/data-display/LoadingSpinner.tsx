// src/components/shared/data-display/LoadingSpinner.tsx

import { cn } from '@/lib/utils/cn';
import { Loader2 } from 'lucide-react';
import React from 'react';

type SpinnerSize = 'sm' | 'md' | 'lg' | 'xl';

interface LoadingSpinnerProps {
  size?: SpinnerSize;
  className?: string;
  fullScreen?: boolean;
  text?: string;
}

const sizeStyles: Record<SpinnerSize, string> = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
  xl: 'h-12 w-12',
};

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  className,
  fullScreen = false,
  text,
}) => {
  const spinner = (
    <div className="flex flex-col items-center gap-3">
      <Loader2 className={cn('text-primary-600 animate-spin', sizeStyles[size], className)} />
      {text && <p className="text-sm text-gray-600">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return <div className="flex min-h-screen items-center justify-center">{spinner}</div>;
  }

  return spinner;
};

export default LoadingSpinner;
