// src/components/ui/badge.tsx

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils/cn';
import { X } from 'lucide-react';

const badgeVariants = cva(
  'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80',
        success: 'border-transparent bg-green-500 text-white shadow hover:bg-green-600',
        warning: 'border-transparent bg-yellow-500 text-white shadow hover:bg-yellow-600',
        info: 'border-transparent bg-blue-500 text-white shadow hover:bg-blue-600',
        outline: 'text-foreground border-border',
        ghost: 'border-transparent hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-0.5 text-xs',
        lg: 'px-3 py-1 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  removable?: boolean;
  onRemove?: () => void;
  icon?: React.ReactNode;
  dot?: boolean;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  (
    {
      className,
      variant,
      size,
      removable = false,
      onRemove,
      icon,
      dot = false,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div ref={ref} className={cn(badgeVariants({ variant, size }), className)} {...props}>
        {dot && <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />}
        {icon && <span className="mr-1.5">{icon}</span>}
        {children}
        {removable && (
          <button
            type="button"
            onClick={onRemove}
            className="ml-1.5 inline-flex h-3 w-3 items-center justify-center rounded-full hover:bg-black/10 focus:ring-1 focus:ring-current focus:outline-none"
          >
            <X className="h-2.5 w-2.5" />
            <span className="sr-only">Remove</span>
          </button>
        )}
      </div>
    );
  }
);

Badge.displayName = 'Badge';

// Badge Group Component
export interface BadgeGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  max?: number;
}

const BadgeGroup = React.forwardRef<HTMLDivElement, BadgeGroupProps>(
  ({ className, children, max, ...props }, ref) => {
    const childrenArray = React.Children.toArray(children);
    const displayChildren = max ? childrenArray.slice(0, max) : childrenArray;
    const remainingCount = max ? childrenArray.length - max : 0;

    return (
      <div ref={ref} className={cn('flex flex-wrap gap-1.5', className)} {...props}>
        {displayChildren}
        {remainingCount > 0 && <Badge variant="outline">+{remainingCount}</Badge>}
      </div>
    );
  }
);

BadgeGroup.displayName = 'BadgeGroup';

// Notification Badge Component
export interface NotificationBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  count?: number;
  max?: number;
  showZero?: boolean;
  dot?: boolean;
  variant?: 'default' | 'destructive' | 'success' | 'warning' | 'info';
}

const NotificationBadge = React.forwardRef<HTMLSpanElement, NotificationBadgeProps>(
  (
    {
      className,
      count = 0,
      max = 99,
      showZero = false,
      dot = false,
      variant = 'destructive',
      children,
      ...props
    },
    ref
  ) => {
    const displayCount = count > max ? `${max}+` : count;
    const shouldShow = showZero || count > 0;

    if (!shouldShow && !children) return null;

    const badgeContent = dot ? null : displayCount;

    return (
      <span ref={ref} className={cn('relative inline-flex', className)} {...props}>
        {children}
        {shouldShow && (
          <span
            className={cn(
              'absolute flex items-center justify-center rounded-full text-xs font-bold text-white',
              dot ? 'top-0 right-0 h-2 w-2' : '-top-1 -right-1 h-5 min-w-[1.25rem] px-1',
              variant === 'default' && 'bg-primary',
              variant === 'destructive' && 'bg-red-500',
              variant === 'success' && 'bg-green-500',
              variant === 'warning' && 'bg-yellow-500',
              variant === 'info' && 'bg-blue-500'
            )}
          >
            {badgeContent}
          </span>
        )}
      </span>
    );
  }
);

NotificationBadge.displayName = 'NotificationBadge';

// Status Badge Component
export interface StatusBadgeProps extends Omit<BadgeProps, 'variant'> {
  status: 'online' | 'offline' | 'away' | 'busy';
}

const StatusBadge = React.forwardRef<HTMLDivElement, StatusBadgeProps>(
  ({ status, className, children, ...props }, ref) => {
    const statusConfig = {
      online: { variant: 'success' as const, label: 'متصل' },
      offline: { variant: 'outline' as const, label: 'غير متصل' },
      away: { variant: 'warning' as const, label: 'في انتظار' },
      busy: { variant: 'destructive' as const, label: 'مشغول' },
    };

    const config = statusConfig[status];

    return (
      <Badge ref={ref} variant={config.variant} dot className={className} {...props}>
        {children || config.label}
      </Badge>
    );
  }
);

StatusBadge.displayName = 'StatusBadge';

export { Badge, BadgeGroup, NotificationBadge, StatusBadge, badgeVariants };
export default Badge;
