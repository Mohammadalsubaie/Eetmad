'use client';

import { animationDuration, easing } from '@/lib/theme/animation-standards';
import { cssVars } from '@/styles/theme';
import { HTMLMotionProps, motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import React, { useState } from 'react';

// Omit conflicting event handlers that clash with framer-motion
type InputPropsWithoutConflicts = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  | 'onAnimationStart'
  | 'onAnimationEnd'
  | 'onAnimationIteration'
  | 'onDrag'
  | 'onDragStart'
  | 'onDragEnd'
  | 'onDragEnter'
  | 'onDragExit'
  | 'onDragLeave'
  | 'onDragOver'
>;

export interface InputProps
  extends InputPropsWithoutConflicts,
    Omit<HTMLMotionProps<'input'>, keyof React.InputHTMLAttributes<HTMLInputElement>> {
  icon?: LucideIcon;
  error?: boolean;
  fullWidth?: boolean;
  'aria-describedby'?: string;
  errorMessage?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      icon: Icon,
      error,
      fullWidth = false,
      className = '',
      'aria-describedby': ariaDescribedBy,
      errorMessage,
      id,
      ...props
    },
    ref
  ) => {
    const errorId = error && errorMessage ? `${id || 'input'}-error` : undefined;
    const describedBy = [ariaDescribedBy, errorId].filter(Boolean).join(' ') || undefined;
    const baseStyles =
      'h-16 min-h-[44px] rounded-2xl border-2 text-lg font-semibold transition-all outline-none focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-primary';
    const paddingStyles = Icon ? 'pr-16 pl-8' : 'px-8';

    const [isFocused, setIsFocused] = useState(false);

    const getInputStyles = (): React.CSSProperties => {
      const borderColor = error
        ? cssVars.status.error
        : isFocused
          ? cssVars.primary.DEFAULT
          : cssVars.neutral.border;

      return {
        backgroundColor: cssVars.neutral.bg,
        color: cssVars.secondary.DEFAULT,
        borderColor,
      };
    };

    return (
      <motion.div
        className={`relative ${fullWidth ? 'w-full' : ''}`}
        initial={false}
        animate={{
          scale: isFocused ? 1 : 1,
        }}
        transition={{ duration: animationDuration.fast, ease: easing.easeOut }}
      >
        {Icon && (
          <motion.div
            className="absolute right-6 top-1/2 -translate-y-1/2"
            animate={{
              scale: isFocused ? 1.1 : 1,
              color: isFocused ? cssVars.primary.DEFAULT : cssVars.primary.light,
            }}
            transition={{ duration: animationDuration.fast, ease: easing.easeOut }}
          >
            <Icon className="h-6 w-6" aria-hidden="true" />
          </motion.div>
        )}
        <motion.input
          ref={ref}
          id={id}
          className={`${baseStyles} ${paddingStyles} ${fullWidth ? 'w-full' : ''} ${className}`}
          style={getInputStyles()}
          aria-invalid={error}
          aria-describedby={describedBy}
          aria-errormessage={errorId}
          whileFocus={{
            scale: 1.01,
            transition: { duration: animationDuration.fast, ease: easing.easeOut },
          }}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          {...props}
        />
        {error && errorMessage && (
          <motion.div
            id={errorId}
            role="alert"
            className="mt-2 text-sm font-semibold"
            style={{ color: cssVars.status.error }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: animationDuration.normal, ease: easing.easeOut }}
          >
            {errorMessage}
          </motion.div>
        )}
      </motion.div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
