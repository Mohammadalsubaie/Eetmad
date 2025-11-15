import { cssVars } from '@/styles/theme';
import { LucideIcon } from 'lucide-react';
import React from 'react';

export type IconContainerVariant = 'primary' | 'accent' | 'ghost';
export type IconContainerSize = 'sm' | 'md' | 'lg' | 'xl';

export interface IconContainerProps {
  icon: LucideIcon;
  variant?: IconContainerVariant;
  size?: IconContainerSize;
  className?: string;
}

const IconContainer: React.FC<IconContainerProps> = ({
  icon: Icon,
  variant = 'primary',
  size = 'md',
  className = '',
}) => {
  const sizeStyles = {
    sm: 'h-10 w-10',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
    xl: 'h-24 w-24',
  };

  const iconSizes = {
    sm: 'h-5 w-5',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12',
  };

  const baseStyles =
    'relative flex items-center justify-center overflow-hidden rounded-2xl shadow-md';

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return { background: cssVars.gradient.primary };
      case 'accent':
        return { background: cssVars.gradient.gold };
      case 'ghost':
        return { backgroundColor: `${cssVars.neutral.textMuted}26` };
      default:
        return {};
    }
  };

  const getIconColor = () => {
    switch (variant) {
      case 'primary':
        return cssVars.neutral.bg;
      case 'accent':
        return cssVars.secondary.DEFAULT;
      case 'ghost':
        return cssVars.neutral.textMuted;
      default:
        return cssVars.neutral.textMuted;
    }
  };

  return (
    <div className={`${baseStyles} ${sizeStyles[size]} ${className}`} style={getVariantStyles()}>
      <Icon className={`relative z-10 ${iconSizes[size]}`} style={{ color: getIconColor() }} />
      {variant === 'primary' && (
        <div
          className="absolute inset-0 opacity-20"
          style={{ background: `radial-gradient(circle, ${cssVars.accent.primary}, transparent)` }}
        />
      )}
    </div>
  );
};

export default IconContainer;
