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
}

const Card: React.FC<CardProps> = ({
  variant = 'default',
  children,
  className = '',
  hoverable = false,
  onClick,
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
  const hoverProps = hoverable
    ? {
        whileHover: { y: -8 },
        transition: { duration: 0.3 },
      }
    : {};

  return (
    <CardComponent
      className={`${baseStyles} ${hoverable ? 'cursor-pointer hover:shadow-2xl' : ''} ${className}`}
      style={getVariantStyles()}
      onClick={onClick}
      {...hoverProps}
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
