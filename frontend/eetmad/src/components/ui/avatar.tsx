// src/components/ui/avatar.tsx
'use client';
import { cn } from '@/lib/utils/cn';
import { User } from 'lucide-react';
import React from 'react';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

const sizeClasses = {
  xs: 'h-6 w-6 text-xs',
  sm: 'h-8 w-8 text-sm',
  md: 'h-10 w-10 text-base',
  lg: 'h-12 w-12 text-lg',
  xl: 'h-16 w-16 text-xl',
  '2xl': 'h-20 w-20 text-2xl',
};

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt, fallback, size = 'md', children, ...props }, ref) => {
    const [imgError, setImgError] = React.useState(false);

    const showImage = src && !imgError;
    const displayFallback = fallback || (alt ? alt.substring(0, 2).toUpperCase() : '');

    return (
      <div
        ref={ref}
        className={cn(
          'relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-100 font-medium text-gray-600',
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {showImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt || 'Avatar'}
            onError={() => setImgError(true)}
            className="h-full w-full object-cover"
          />
        ) : children ? (
          children
        ) : displayFallback ? (
          <span className="select-none">{displayFallback}</span>
        ) : (
          <User className="h-1/2 w-1/2" />
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

// Avatar Group Component
export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  max?: number;
  size?: AvatarProps['size'];
}

export const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className, children, max = 3, size = 'md', ...props }, ref) => {
    const childrenArray = React.Children.toArray(children);
    const displayChildren = max ? childrenArray.slice(0, max) : childrenArray;
    const remainingCount = childrenArray.length - displayChildren.length;

    return (
      <div ref={ref} className={cn('flex -space-x-2', className)} {...props}>
        {displayChildren.map((child, index) => (
          <div key={index} className="ring-2 ring-white">
            {React.isValidElement<AvatarProps>(child)
              ? React.cloneElement(child, { size } as Partial<AvatarProps>)
              : child}
          </div>
        ))}
        {remainingCount > 0 && (
          <Avatar size={size} className="bg-gray-200 ring-2 ring-white">
            <span className="text-gray-700">+{remainingCount}</span>
          </Avatar>
        )}
      </div>
    );
  }
);

AvatarGroup.displayName = 'AvatarGroup';

// Avatar with Badge Component
export interface AvatarWithBadgeProps extends AvatarProps {
  badgeContent?: React.ReactNode;
  badgeColor?: 'success' | 'warning' | 'danger' | 'primary';
  showBadge?: boolean;
}

const badgeColorClasses = {
  success: 'bg-green-500',
  warning: 'bg-yellow-500',
  danger: 'bg-red-500',
  primary: 'bg-primary-500',
};

export const AvatarWithBadge = React.forwardRef<HTMLDivElement, AvatarWithBadgeProps>(
  ({ badgeContent, badgeColor = 'success', showBadge = true, ...avatarProps }, ref) => {
    return (
      <div ref={ref} className="relative inline-block">
        <Avatar {...avatarProps} />
        {showBadge && (
          <span
            className={cn(
              'absolute bottom-0 left-0 block h-3 w-3 rounded-full ring-2 ring-white',
              badgeColorClasses[badgeColor]
            )}
          >
            {badgeContent && (
              <span className="flex h-full w-full items-center justify-center text-xs text-white">
                {badgeContent}
              </span>
            )}
          </span>
        )}
      </div>
    );
  }
);

AvatarWithBadge.displayName = 'AvatarWithBadge';

// Export default for backward compatibility
export default Avatar;
