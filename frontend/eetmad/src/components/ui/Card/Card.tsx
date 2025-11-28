import { animationDuration, easing, hoverProps } from '@/lib/theme/animation-standards';
import { cssVars } from '@/styles/theme';
import { motion } from 'framer-motion';
import React from 'react';

export type CardVariant = 'default' | 'featured' | 'urgent';

export interface CardProps {
  variant?: CardVariant;
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  onClick?: () => void;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  role?: 'article' | 'region' | 'group';
}

const Card: React.FC<CardProps> = ({
  variant = 'default',
  children,
  className = '',
  hoverable = false,
  onClick,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  role = onClick ? 'button' : 'article',
  ...props
}) => {
  const baseStyles = 'relative overflow-hidden rounded-3xl border-2 shadow-lg transition-all';

  const getVariantStyles = () => {
    return {
      backgroundColor: cssVars.neutral.surface,
      borderColor:
        variant === 'featured'
          ? cssVars.accent.secondary
          : variant === 'urgent'
            ? cssVars.status.error
            : cssVars.neutral.border,
    };
  };

  const CardComponent = hoverable ? motion.div : 'div';
  const cardHoverProps = hoverable
    ? {
        ...hoverProps.lift,
        transition: { duration: animationDuration.normal, ease: easing.easeOut },
      }
    : {};

  return (
    <CardComponent
      className={`${baseStyles} ${hoverable ? 'cursor-pointer hover:shadow-2xl' : ''} ${className}`}
      style={getVariantStyles()}
      onClick={onClick}
      role={onClick ? 'button' : role}
      aria-label={onClick && !ariaLabel && !ariaLabelledBy ? 'Card' : ariaLabel}
      aria-labelledby={ariaLabelledBy}
      tabIndex={onClick ? 0 : undefined}
      {...cardHoverProps}
      {...props}
    >
      {variant === 'featured' && (
        <div
          className="absolute inset-x-0 top-0 h-1"
          style={{ background: cssVars.gradient.gold }}
        />
      )}
      {children}
    </CardComponent>
  );
};

export default Card;
