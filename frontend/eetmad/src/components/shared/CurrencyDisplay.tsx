'use client';

import SaudiRiyalIcon from '@/components/shared/icons/SaudiRiyalIcon';
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
 * Displays amount followed by the Saudi Riyal icon (according to design guidelines)
 */
export default function CurrencyDisplay({
  amount,
  className,
  iconSize = 16,
  iconClassName,
  showIcon = true,
  locale = 'ar-SA',
}: CurrencyDisplayProps) {
  // Format numbers with English numerals (latn) regardless of locale
  const formattedAmount =
    typeof amount === 'number'
      ? new Intl.NumberFormat('en-US', {
          numberingSystem: 'latn',
        }).format(amount)
      : amount;

  return (
    <span className={cn('inline-flex items-center gap-1', className)}>
      <span>{formattedAmount}</span>
      {showIcon && <SaudiRiyalIcon width={iconSize} height={iconSize} className={iconClassName} />}
    </span>
  );
}
