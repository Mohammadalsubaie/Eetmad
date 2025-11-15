import { cssVars } from '@/styles/theme';
import { LucideIcon } from 'lucide-react';
import React from 'react';

export type BadgeVariant = 'success' | 'error' | 'warning' | 'info' | 'featured';

export interface BadgeProps {
  variant?: BadgeVariant;
  icon?: LucideIcon;
  children: React.ReactNode;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  variant = 'info',
  icon: Icon,
  children,
  className = '',
}) => {
  const baseStyles = 'inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold';

  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return {
          backgroundColor: cssVars.status.success,
          color: cssVars.neutral.surface,
        };
      case 'error':
        return {
          backgroundColor: cssVars.status.error,
          color: cssVars.neutral.surface,
        };
      case 'warning':
        return {
          backgroundColor: cssVars.status.warning,
          color: cssVars.secondary.DEFAULT,
        };
      case 'info':
        return {
          backgroundColor: cssVars.neutral.surfaceAlt,
          color: cssVars.secondary.DEFAULT,
        };
      case 'featured':
        return {
          background: cssVars.gradient.gold,
          color: cssVars.secondary.DEFAULT,
        };
      default:
        return {};
    }
  };

  return (
    <div className={`${baseStyles} ${className}`} style={getVariantStyles()}>
      {Icon && <Icon className="h-3.5 w-3.5" />}
      {children}
    </div>
  );
};

export default Badge;
