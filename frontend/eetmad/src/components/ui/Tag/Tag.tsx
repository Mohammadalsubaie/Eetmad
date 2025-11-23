import { animationDuration, easing, hoverProps } from '@/lib/theme/animation-standards';
import { cssVars } from '@/styles/theme';
import { motion } from 'framer-motion';
import React from 'react';

export interface TagProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary';
  className?: string;
  'aria-label'?: string;
}

const Tag: React.FC<TagProps> = ({
  children,
  variant = 'default',
  className = '',
  'aria-label': ariaLabel,
  ...props
}) => {
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
    <motion.span
      className={`${baseStyles} ${className}`}
      style={variantStyles[variant]}
      role="status"
      aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: animationDuration.fast, ease: easing.easeOut }}
      {...props}
    >
      {children}
    </motion.span>
  );
};

export default Tag;
