// src/components/shared/data-display/LoadingSpinner.tsx

'use client';

import { animationDuration, easing, animationVariants } from '@/lib/theme/animation-standards';
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
      initial={animationVariants.fadeIn.initial}
      animate={animationVariants.fadeIn.animate}
      transition={animationVariants.fadeIn.transition}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <Loader2
          className={cn(sizeStyles[size], className)}
          style={{ color: cssVars.primary.DEFAULT }}
          aria-hidden="true"
        />
      </motion.div>
      {text && (
        <motion.p
          className="text-sm"
          style={{ color: cssVars.neutral.textSecondary }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: animationDuration.normal, ease: easing.easeOut }}
        >
          {text}
        </motion.p>
      )}
    </motion.div>
  );

  if (fullScreen) {
    return <div className="flex min-h-screen items-center justify-center">{spinner}</div>;
  }

  return spinner;
};

export default LoadingSpinner;
