'use client';

import { motion } from 'framer-motion';
import { cssVars } from '@/styles/theme';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface AdminStatCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down';
  icon: LucideIcon;
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
      className="rounded-2xl border-2 p-6 shadow-md transition-all"
      style={{
        backgroundColor: cssVars.neutral.surface,
        borderColor: cssVars.neutral.border,
      }}
    >
      <div className="mb-4 flex items-center justify-between">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-xl"
          style={{ backgroundColor: `color-mix(in srgb, ${color} 15%, transparent)` }}
        >
          <Icon className="h-6 w-6" style={{ color }} />
        </div>
        {change && (
          <div
            className="flex items-center gap-1 rounded-lg px-2.5 py-1"
            style={{
              backgroundColor: `color-mix(in srgb, ${
                trend === 'up' ? cssVars.status.success : cssVars.status.error
              } 15%, transparent)`,
            }}
          >
            {trend === 'up' ? (
              <TrendingUp className="h-3.5 w-3.5" style={{ color: cssVars.status.success }} />
            ) : (
              <TrendingDown className="h-3.5 w-3.5" style={{ color: cssVars.status.error }} />
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
      <div className="mb-1 text-3xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
        {value}
      </div>
      <div className="text-sm font-semibold" style={{ color: cssVars.neutral.textSecondary }}>
        {title}
      </div>
    </motion.div>
  );
}

