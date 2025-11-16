'use client';

import { motion } from 'framer-motion';
import { cssVars } from '@/styles/theme';
import { LucideIcon } from 'lucide-react';

interface StatsSummaryItem {
  id: string;
  label: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
}

interface AdminStatsSummaryProps {
  items: StatsSummaryItem[];
}

export default function AdminStatsSummary({ items }: AdminStatsSummaryProps) {
  return (
    <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <motion.div
          key={item.id}
          whileHover={{ y: -4 }}
          className="rounded-2xl border-2 p-6 shadow-md"
          style={{
            backgroundColor: cssVars.neutral.surface,
            borderColor: cssVars.neutral.border,
          }}
        >
          <div className="mb-4 flex items-center gap-3">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-xl"
              style={{ backgroundColor: `color-mix(in srgb, ${item.color} 15%, transparent)` }}
            >
              <item.icon className="h-6 w-6" style={{ color: item.color }} />
            </div>
            <div>
              <div className="text-2xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                {item.value}
              </div>
              <div
                className="text-sm font-semibold"
                style={{ color: cssVars.neutral.textSecondary }}
              >
                {item.label}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
