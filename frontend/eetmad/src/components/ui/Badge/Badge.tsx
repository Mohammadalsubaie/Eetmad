import { animationDuration, easing, hoverProps } from '@/lib/theme/animation-standards';
import { cssVars } from '@/styles/theme';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import React from 'react';

export type BadgeVariant = 'success' | 'error' | 'warning' | 'info' | 'featured';

export interface BadgeProps {
  variant?: BadgeVariant;
  icon?: LucideIcon;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  'aria-label'?: string;
  role?: 'status' | 'alert';
}

const Badge: React.FC<BadgeProps> = ({
  variant = 'info',
  icon: Icon,
  children,
  className = '',
  style,
  'aria-label': ariaLabel,
  role = variant === 'error' ? 'alert' : 'status',
  ...props
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
    <motion.div
      className={`${baseStyles} ${className}`}
      style={{ ...getVariantStyles(), ...style }}
      role={role}
      aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: animationDuration.fast, ease: easing.easeOut }}
      {...props}
    >
      {Icon && (
        <motion.span
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        >
          <Icon className="h-3.5 w-3.5" aria-hidden="true" />
        </motion.span>
      )}
      {children}
    </motion.div>
  );
};

export default Badge;
