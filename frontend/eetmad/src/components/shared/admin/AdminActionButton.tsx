'use client';

import { cssVars } from '@/styles/theme';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface AdminActionButtonProps {
  label: string;
  icon?: LucideIcon;
  onClick?: () => void;
  variant?: 'primary' | 'success' | 'danger' | 'warning' | 'secondary';
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function AdminActionButton({
  label,
  icon: Icon,
  onClick,
  variant = 'primary',
  disabled = false,
  size = 'md',
}: AdminActionButtonProps) {
  const variantStyles = {
    primary: {
      backgroundColor: cssVars.primary.DEFAULT,
      color: cssVars.neutral.surface,
    },
    success: {
      backgroundColor: cssVars.status.success,
      color: cssVars.neutral.surface,
    },
    danger: {
      backgroundColor: cssVars.status.error,
      color: cssVars.neutral.surface,
    },
    warning: {
      backgroundColor: cssVars.status.warning,
      color: cssVars.secondary.DEFAULT,
    },
    secondary: {
      backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 10%, transparent)`,
      color: cssVars.primary.DEFAULT,
    },
  };

  const sizeStyles = {
    sm: 'px-4 sm:px-5 py-3 sm:py-2.5 text-xs sm:text-sm min-h-[44px]',
    md: 'px-5 sm:px-7 py-3.5 sm:py-3 text-sm sm:text-base min-h-[48px]',
    lg: 'px-6 sm:px-9 py-4 sm:py-4 text-base sm:text-lg min-h-[52px]',
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className={`flex touch-manipulation items-center justify-center gap-2 whitespace-nowrap rounded-xl font-bold shadow-md transition-all active:shadow-sm disabled:cursor-not-allowed disabled:opacity-50 sm:gap-2.5 ${sizeStyles[size]}`}
      style={variantStyles[variant]}
      title={label}
    >
      {Icon && <Icon className="h-5 w-5 flex-shrink-0 sm:h-5 sm:w-5" />}
      <span className="hidden min-[380px]:inline">{label}</span>
    </motion.button>
  );
}
