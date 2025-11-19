// src/components/shared/data-display/LoadingSpinner.tsx

'use client';

import { cn } from '@/lib/utils/cn';
import { cssVars } from '@/styles/theme';
import { motion } from 'framer-motion';
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
    <motion.div
      className="flex flex-col items-center gap-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Loader2
        className={cn('animate-spin', sizeStyles[size], className)}
        style={{ color: cssVars.primary.DEFAULT }}
      />
      {text && (
        <p className="text-sm" style={{ color: cssVars.neutral.textSecondary }}>
          {text}
        </p>
      )}
    </motion.div>
  );

  if (fullScreen) {
    return <div className="flex min-h-screen items-center justify-center">{spinner}</div>;
  }

  return spinner;
};

export default LoadingSpinner;
