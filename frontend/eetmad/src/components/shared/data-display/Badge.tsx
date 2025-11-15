// src/components/shared/data-display/Badge.tsx

'use client';

import { cn } from '@/lib/utils/cn';
import { cssVars } from '@/styles/theme';
import React from 'react';

type BadgeVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';

type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
  dot?: boolean;
}

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
  lg: 'px-3 py-1.5 text-base',
};

const getVariantStyles = (variant: BadgeVariant): React.CSSProperties => {
  switch (variant) {
    case 'primary':
      return {
        backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 15%, transparent)`,
        color: cssVars.primary.DEFAULT,
        borderColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 30%, transparent)`,
      };
    case 'secondary':
      return {
        backgroundColor: `color-mix(in srgb, ${cssVars.secondary.DEFAULT} 10%, transparent)`,
        color: cssVars.secondary.DEFAULT,
        borderColor: `color-mix(in srgb, ${cssVars.secondary.DEFAULT} 20%, transparent)`,
      };
    case 'success':
      return {
        backgroundColor: `color-mix(in srgb, ${cssVars.status.success} 15%, transparent)`,
        color: cssVars.status.success,
        borderColor: `color-mix(in srgb, ${cssVars.status.success} 30%, transparent)`,
      };
    case 'warning':
      return {
        backgroundColor: `color-mix(in srgb, ${cssVars.status.warning} 15%, transparent)`,
        color: cssVars.status.warning,
        borderColor: `color-mix(in srgb, ${cssVars.status.warning} 30%, transparent)`,
      };
    case 'danger':
      return {
        backgroundColor: `color-mix(in srgb, ${cssVars.status.error} 15%, transparent)`,
        color: cssVars.status.error,
        borderColor: `color-mix(in srgb, ${cssVars.status.error} 30%, transparent)`,
      };
    case 'info':
      return {
        backgroundColor: `color-mix(in srgb, ${cssVars.status.info} 15%, transparent)`,
        color: cssVars.status.info,
        borderColor: `color-mix(in srgb, ${cssVars.status.info} 30%, transparent)`,
      };
    default:
      return {
        backgroundColor: cssVars.neutral.surfaceAlt,
        color: cssVars.neutral.textSecondary,
        borderColor: cssVars.neutral.border,
      };
  }
};

const getDotColor = (variant: BadgeVariant): string => {
  switch (variant) {
    case 'primary':
      return cssVars.primary.DEFAULT;
    case 'success':
      return cssVars.status.success;
    case 'warning':
      return cssVars.status.warning;
    case 'danger':
      return cssVars.status.error;
    case 'info':
      return cssVars.status.info;
    default:
      return cssVars.neutral.textSecondary;
  }
};

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className,
  dot = false,
}) => {
  return (
    <span
      className={cn('inline-flex items-center gap-1.5 rounded-full border font-medium', sizeStyles[size], className)}
      style={getVariantStyles(variant)}
    >
      {dot && (
        <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: getDotColor(variant) }} />
      )}
      {children}
    </span>
  );
};

export default Badge;
