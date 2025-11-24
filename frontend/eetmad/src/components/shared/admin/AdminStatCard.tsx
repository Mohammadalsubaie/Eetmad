'use client';

import { motion } from 'framer-motion';
import { cssVars } from '@/styles/theme';
import { TrendingUp, TrendingDown } from 'lucide-react';
import React from 'react';
import SaudiRiyalIcon from '@/components/shared/icons/SaudiRiyalIcon';

interface AdminStatCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down';
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color?: string;
}

export default function AdminStatCard({
  title,
  value,
  change,
  trend = 'up',
  icon: Icon,
  color = cssVars.primary.DEFAULT,
}: AdminStatCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      className="active:scale-98 touch-manipulation rounded-xl border-2 p-4 shadow-md transition-all sm:rounded-2xl sm:p-6"
      style={{
        backgroundColor: cssVars.neutral.surface,
        borderColor: cssVars.neutral.border,
      }}
    >
      <div className="mb-3 flex items-center justify-between sm:mb-4">
        <div
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl sm:h-12 sm:w-12"
          style={{ backgroundColor: `color-mix(in srgb, ${color} 15%, transparent)` }}
        >
          {Icon === SaudiRiyalIcon ? (
            <SaudiRiyalIcon
              className="h-5 w-5 sm:h-6 sm:w-6"
              style={{ color }}
              width={24}
              height={24}
            />
          ) : (
            <Icon className="h-5 w-5 sm:h-6 sm:w-6" style={{ color }} />
          )}
        </div>
        {change && (
          <div
            className="flex flex-shrink-0 items-center gap-1 rounded-lg px-2 py-0.5 sm:px-2.5 sm:py-1"
            style={{
              backgroundColor: `color-mix(in srgb, ${
                trend === 'up' ? cssVars.status.success : cssVars.status.error
              } 15%, transparent)`,
            }}
          >
            {trend === 'up' ? (
              <TrendingUp
                className="h-3 w-3 sm:h-3.5 sm:w-3.5"
                style={{ color: cssVars.status.success }}
              />
            ) : (
              <TrendingDown
                className="h-3 w-3 sm:h-3.5 sm:w-3.5"
                style={{ color: cssVars.status.error }}
              />
            )}
            <span
              className="text-xs font-bold"
              style={{ color: trend === 'up' ? cssVars.status.success : cssVars.status.error }}
            >
              {change}
            </span>
          </div>
        )}
      </div>
      <div
        className="mb-1 truncate text-xl font-bold sm:text-2xl md:text-3xl"
        style={{ color: cssVars.secondary.DEFAULT }}
      >
        {value}
      </div>
      <div
        className="line-clamp-2 text-xs font-semibold sm:text-sm"
        style={{ color: cssVars.neutral.textSecondary }}
      >
        {title}
      </div>
    </motion.div>
  );
}
