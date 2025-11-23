'use client';

import { animationDuration, easing, hoverProps } from '@/lib/theme/animation-standards';
import { cssVars } from '@/styles/theme';
import { HTMLMotionProps, motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import React, { useState } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      icon: Icon,
      iconPosition = 'right',
      fullWidth = false,
      children,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center gap-3 font-bold transition-all rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-primary touch-manipulation active:scale-95';

    const variantStyles = {
      primary: 'shadow-2xl',
      secondary: 'shadow-lg hover:shadow-xl',
      outline: 'bg-transparent border-2 transition-colors',
      ghost: 'transition-colors',
    };

    const sizeStyles = {
      sm: 'px-6 py-2 text-sm min-h-[44px] min-w-[44px] md:min-h-0 md:min-w-0',
      md: 'px-8 py-3 text-base min-h-[44px] min-w-[44px] md:min-h-0 md:min-w-0',
      lg: 'px-10 py-4 text-lg min-h-[44px] min-w-[44px] md:min-h-0 md:min-w-0',
      xl: 'px-12 py-5 text-xl min-h-[44px] min-w-[44px] md:min-h-0 md:min-w-0',
    };

    const [isHovered, setIsHovered] = useState(false);

    // تحديد الأنماط حسب الـ variant
    const getVariantStyle = (): React.CSSProperties => {
      switch (variant) {
        case 'primary':
          return {
            background: cssVars.gradient.gold,
            color: cssVars.secondary.DEFAULT,
          };
        case 'secondary':
          return {
            backgroundColor: cssVars.primary.DEFAULT,
            color: cssVars.neutral.bg,
          };
        case 'outline':
          return {
            borderColor: cssVars.primary.DEFAULT,
            color: isHovered ? cssVars.neutral.bg : cssVars.primary.DEFAULT,
            backgroundColor: isHovered ? cssVars.primary.DEFAULT : 'transparent',
          };
        case 'ghost':
          return {
            backgroundColor: isHovered
              ? `color-mix(in srgb, ${cssVars.neutral.textMuted} 25%, transparent)`
              : `color-mix(in srgb, ${cssVars.neutral.textMuted} 15%, transparent)`,
            color: cssVars.neutral.textMuted,
          };
        default:
          return {};
      }
    };

    // تحديد Animation Props حسب الـ variant
    const getAnimationProps = () => {
      if (disabled) return {};

      if (variant === 'outline' || variant === 'ghost') {
        return {
          transition: { duration: animationDuration.fast, ease: easing.easeOut },
        };
      }

      return {
        whileHover: hoverProps.scale.whileHover,
        whileTap: hoverProps.scale.whileTap,
        transition: hoverProps.scale.transition,
      };
    };

    return (
      <motion.button
        ref={ref}
        {...getAnimationProps()}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
        style={getVariantStyle()}
        aria-label={props['aria-label'] || (typeof children === 'string' ? children : undefined)}
        onMouseEnter={(e) => {
          if (!disabled) setIsHovered(true);
          props.onMouseEnter?.(e);
        }}
        onMouseLeave={(e) => {
          if (!disabled) setIsHovered(false);
          props.onMouseLeave?.(e);
        }}
        disabled={disabled}
        {...props}
      >
        {Icon && iconPosition === 'left' && <Icon className="h-5 w-5" />}
        {children}
        {Icon && iconPosition === 'right' && <Icon className="h-5 w-5" />}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
