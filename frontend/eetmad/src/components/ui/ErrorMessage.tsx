'use client';

import { cn } from '@/lib/utils/cn';
import { cssVars } from '@/styles/theme';
import { AlertCircle, X } from 'lucide-react';
import React from 'react';
import { Button } from './Button';

interface ErrorMessageProps {
  error: Error | string | null;
  title?: string;
  onRetry?: () => void;
  onDismiss?: () => void;
  className?: string;
  variant?: 'default' | 'inline' | 'banner';
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  error,
  title,
  onRetry,
  onDismiss,
  className,
  variant = 'default',
}) => {
  if (!error) return null;

  const errorMessage = typeof error === 'string' ? error : error.message;
  const errorTitle = title || (typeof error === 'string' ? 'Error' : error.name || 'Error');

  if (variant === 'inline') {
    return (
      <div
        className={cn('flex items-start gap-2 rounded-lg border-2 p-3', className)}
        style={{ borderColor: cssVars.status.error }}
      >
        <AlertCircle
          className="mt-0.5 h-5 w-5 flex-shrink-0"
          style={{ color: cssVars.status.error }}
        />
        <div className="flex-1">
          <p className="text-sm font-medium" style={{ color: cssVars.status.error }}>
            {errorTitle}
          </p>
          <p className="mt-1 text-sm" style={{ color: cssVars.neutral.textSecondary }}>
            {errorMessage}
          </p>
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="flex-shrink-0 rounded p-1 hover:bg-muted"
            aria-label="Dismiss error"
          >
            <X className="h-4 w-4" style={{ color: cssVars.neutral.textSecondary }} />
          </button>
        )}
      </div>
    );
  }

  if (variant === 'banner') {
    return (
      <div
        className={cn('rounded-lg border-2 p-4', className)}
        style={{ borderColor: cssVars.status.error, backgroundColor: `${cssVars.status.error}10` }}
      >
        <div className="flex items-start gap-3">
          <AlertCircle
            className="mt-0.5 h-5 w-5 flex-shrink-0"
            style={{ color: cssVars.status.error }}
          />
          <div className="flex-1">
            <p className="font-medium" style={{ color: cssVars.status.error }}>
              {errorTitle}
            </p>
            <p className="mt-1 text-sm" style={{ color: cssVars.neutral.textSecondary }}>
              {errorMessage}
            </p>
          </div>
          {onDismiss && (
            <button
              onClick={onDismiss}
              className="flex-shrink-0 rounded p-1 hover:bg-muted"
              aria-label="Dismiss error"
            >
              <X className="h-4 w-4" style={{ color: cssVars.neutral.textSecondary }} />
            </button>
          )}
        </div>
        {onRetry && (
          <div className="mt-4">
            <Button onClick={onRetry} variant="outline" size="sm">
              Try Again
            </Button>
          </div>
        )}
      </div>
    );
  }

  // Default variant
  return (
    <div
      className={cn('rounded-2xl border-2 p-8 text-center', className)}
      style={{ borderColor: cssVars.status.error }}
    >
      <AlertCircle className="mx-auto mb-4 h-12 w-12" style={{ color: cssVars.status.error }} />
      <h3 className="mb-2 text-lg font-semibold" style={{ color: cssVars.status.error }}>
        {errorTitle}
      </h3>
      <p className="mb-6 text-sm" style={{ color: cssVars.neutral.textSecondary }}>
        {errorMessage}
      </p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline">
          Try Again
        </Button>
      )}
    </div>
  );
};

export default ErrorMessage;
