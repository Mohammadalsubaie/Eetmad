// src/components/shared/data-display/Avatar.tsx

'use client';

import { cn } from '@/lib/utils/cn';
import { cssVars } from '@/styles/theme';
import { Check, User } from 'lucide-react';
import React from 'react';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: AvatarSize;
  isVerified?: boolean;
  fallbackName?: string;
  className?: string;
}

const sizeStyles: Record<AvatarSize, string> = {
  xs: 'h-6 w-6 text-xs',
  sm: 'h-8 w-8 text-sm',
  md: 'h-10 w-10 text-base',
  lg: 'h-12 w-12 text-lg',
  xl: 'h-16 w-16 text-xl',
};

const verifiedBadgeSize: Record<AvatarSize, string> = {
  xs: 'h-3 w-3',
  sm: 'h-3.5 w-3.5',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
  xl: 'h-6 w-6',
};

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = '',
  size = 'md',
  isVerified = false,
  fallbackName,
  className,
}) => {
  const [imageError, setImageError] = React.useState(false);

  const getInitials = (name?: string) => {
    if (!name) return '';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const initials = getInitials(fallbackName);

  return (
    <div className={cn('relative inline-block', className)}>
      <div
        className={cn(
          'flex items-center justify-center overflow-hidden rounded-full',
          sizeStyles[size]
        )}
        style={{
          backgroundColor: cssVars.neutral.surfaceAlt,
        }}
      >
        {src && !imageError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt}
            className="h-full w-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : initials ? (
          <span className="font-medium" style={{ color: cssVars.neutral.textSecondary }}>
            {initials}
          </span>
        ) : (
          <User className="h-1/2 w-1/2" style={{ color: cssVars.neutral.textSecondary }} />
        )}
      </div>
      {isVerified && (
        <div
          className={cn(
            'absolute -bottom-0.5 -end-0.5 flex items-center justify-center rounded-full p-0.5',
            verifiedBadgeSize[size]
          )}
          style={{
            backgroundColor: cssVars.status.success,
          }}
        >
          <Check className="h-full w-full" style={{ color: cssVars.neutral.bg }} strokeWidth={3} />
        </div>
      )}
    </div>
  );
};

export default Avatar;
