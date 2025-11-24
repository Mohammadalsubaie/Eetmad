'use client';

import { cn } from '@/lib/utils/cn';

interface CurrencyDisplayProps {
  amount: number | string;
  className?: string;
  iconSize?: number;
  iconClassName?: string;
  showIcon?: boolean;
  locale?: string;
}

/**
 * Component to display currency amount with Saudi Riyal icon
 * Replaces text currency indicators (ر.س, SAR, ريال) with icon
 */
export default function CurrencyDisplay({
  amount,
  className,
  iconSize = 16,
  iconClassName,
  showIcon = true,
  locale = 'ar-SA',
}: CurrencyDisplayProps) {
  const formattedAmount = typeof amount === 'number' ? amount.toLocaleString(locale) : amount;

  return (
    <span className={cn('inline-flex items-center', className)}>
      <span>{formattedAmount}</span>
    </span>
  );
}
