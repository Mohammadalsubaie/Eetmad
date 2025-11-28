// src/components/shared/cards/StatCard.tsx

'use client';

import { cn } from '@/lib/utils/cn';
import { cssVars } from '@/styles/theme';
import { motion } from 'framer-motion';
import { TrendingDown, TrendingUp } from 'lucide-react';
import React from 'react';
import SaudiRiyalIcon from '@/components/shared/icons/SaudiRiyalIcon';

interface StatCardProps {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  label: string;
  value: string | number | React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, label, value, trend, className }) => {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      className={cn('rounded-xl border p-6 shadow-md transition-shadow hover:shadow-lg', className)}
      style={{
        backgroundColor: cssVars.neutral.surface,
        borderColor: cssVars.neutral.border,
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium" style={{ color: cssVars.neutral.textSecondary }}>
            {label}
          </p>
          <p className="mt-2 text-3xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
            {value}
          </p>
          {trend && (
            <div
              className="mt-2 flex items-center gap-1 text-sm font-medium"
              style={{
                color: trend.isPositive ? cssVars.status.success : cssVars.status.error,
              }}
            >
              {trend.isPositive ? (
                <TrendingUp className="h-4 w-4" />
              ) : (
                <TrendingDown className="h-4 w-4" />
              )}
              <span>
                {trend.isPositive ? '+' : '-'}
                {Math.abs(trend.value)}%
              </span>
            </div>
          )}
        </div>
        <div
          className="flex h-12 w-12 items-center justify-center rounded-lg"
          style={{
            backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 10%, transparent)`,
          }}
        >
          {Icon === SaudiRiyalIcon ? (
            <SaudiRiyalIcon
              className="h-6 w-6"
              style={{ color: cssVars.primary.DEFAULT }}
              width={24}
              height={24}
            />
          ) : (
            <Icon className="h-6 w-6" style={{ color: cssVars.primary.DEFAULT }} />
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;
