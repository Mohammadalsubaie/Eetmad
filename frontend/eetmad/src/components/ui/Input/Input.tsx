import { cssVars } from '@/styles/theme';
import { LucideIcon } from 'lucide-react';
import React, { useState } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: LucideIcon;
  error?: boolean;
  fullWidth?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ icon: Icon, error, fullWidth = false, className = '', ...props }, ref) => {
    const baseStyles =
      'h-16 rounded-2xl border-2 text-lg font-semibold transition-all outline-none';
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
      <div className={`relative ${fullWidth ? 'w-full' : ''}`}>
        {Icon && (
          <Icon
            className="absolute right-6 top-1/2 h-6 w-6 -translate-y-1/2"
            style={{ color: cssVars.primary.light }}
          />
        )}
        <input
          ref={ref}
          className={`${baseStyles} ${paddingStyles} ${fullWidth ? 'w-full' : ''} ${className}`}
          style={getInputStyles()}
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
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
