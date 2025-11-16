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
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center gap-2 rounded-xl font-bold shadow-md transition-all disabled:cursor-not-allowed disabled:opacity-50 ${sizeStyles[size]}`}
      style={variantStyles[variant]}
    >
      {Icon && <Icon className="h-5 w-5" />}
      <span>{label}</span>
    </motion.button>
  );
}
