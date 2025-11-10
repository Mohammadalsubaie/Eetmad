// src/components/shared/cards/StatCard.tsx

import { cn } from '@/lib/utils/cn';
import { LucideIcon } from 'lucide-react';
import React from 'react';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, label, value, trend, className }) => {
  return (
    <div
      className={cn(
        'rounded-xl border border-border bg-card p-6 shadow-md transition-all hover:shadow-lg',
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="mt-2 text-3xl font-bold text-foreground">{value}</p>
          {trend && (
            <p
              className={cn(
                'mt-2 text-sm font-medium',
                trend.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              )}
            >
              {trend.isPositive ? '+' : '-'}
              {Math.abs(trend.value)}%
            </p>
          )}
        </div>
        <div className="bg-primary-50 dark:bg-primary-950/30 flex h-12 w-12 items-center justify-center rounded-lg">
          <Icon className="text-primary-600 dark:text-primary-400 h-6 w-6" />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
