import { cssVars } from '@/styles/theme';
import React from 'react';

export interface TagProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary';
  className?: string;
}

const Tag: React.FC<TagProps> = ({ children, variant = 'default', className = '' }) => {
  const baseStyles = 'inline-block rounded-lg px-3 py-2 text-sm font-semibold';

  const variantStyles = {
    default: {
      backgroundColor: cssVars.neutral.surfaceAlt,
      color: cssVars.secondary.DEFAULT,
    },
    primary: {
      backgroundColor: cssVars.primary.DEFAULT,
      color: cssVars.neutral.bg,
    },
  };

  return (
    <span className={`${baseStyles} ${className}`} style={variantStyles[variant]}>
      {children}
    </span>
  );
};

export default Tag;
