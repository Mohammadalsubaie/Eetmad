'use client';

import { animationDuration, easing } from '@/lib/theme/animation-standards';
import { cssVars } from '@/styles/theme';
import { motion } from 'framer-motion';
import React from 'react';

export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      checked = false,
      onCheckedChange,
      label,
      description,
      disabled = false,
      size = 'md',
      className = '',
      onChange,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || `switch-${Math.random().toString(36).substr(2, 9)}`;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;
      const newChecked = e.target.checked;
      onCheckedChange?.(newChecked);
      onChange?.(e);
    };

    const sizeStyles = {
      sm: {
        track: 'h-5 w-9',
        thumb: 'h-4 w-4',
        translateX: '1rem', // w-9 (36px) - w-4 (16px) - 0.125rem (2px) = 18px ≈ 1rem
      },
      md: {
        track: 'h-6 w-11',
        thumb: 'h-5 w-5',
        translateX: '1.375rem', // w-11 (44px) - w-5 (20px) - 0.125rem (2px) = 22px = 1.375rem
      },
      lg: {
        track: 'h-7 w-14',
        thumb: 'h-6 w-6',
        translateX: '1.875rem', // w-14 (56px) - w-6 (24px) - 0.125rem (2px) = 30px = 1.875rem
      },
    };

    const currentSize = sizeStyles[size];

    return (
      <div className={`flex items-start gap-3 ${className}`}>
        <div className="relative flex items-center pt-0.5">
          <input
            ref={ref}
            type="checkbox"
            role="switch"
            id={inputId}
            checked={checked}
            onChange={handleChange}
            disabled={disabled}
            className="sr-only"
            aria-label={label || props['aria-label']}
            {...props}
          />
          <label
            htmlFor={inputId}
            className={`relative inline-flex cursor-pointer items-center rounded-full transition-colors ${
              disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
            } ${currentSize.track}`}
            style={{
              backgroundColor: checked ? cssVars.primary.DEFAULT : cssVars.neutral.border,
            }}
          >
            <motion.span
              className={`pointer-events-none absolute rounded-full bg-white shadow-md ${currentSize.thumb}`}
              animate={{
                x: checked ? currentSize.translateX : '0.125rem',
              }}
              transition={{
                duration: animationDuration.fast,
                ease: easing.easeOut,
              }}
              style={{
                left: '0.125rem',
                willChange: 'transform',
              }}
            />
          </label>
        </div>
        {(label || description) && (
          <div className="flex-1">
            {label && (
              <label
                htmlFor={inputId}
                className={`block text-sm font-semibold ${
                  disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                }`}
                style={{ color: cssVars.secondary.DEFAULT }}
              >
                {label}
              </label>
            )}
            {description && (
              <p className="mt-0.5 text-xs" style={{ color: cssVars.neutral.textSecondary }}>
                {description}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Switch.displayName = 'Switch';

export default Switch;
