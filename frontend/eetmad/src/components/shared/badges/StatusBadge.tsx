'use client';

import { cssVars } from '@/styles/theme';

interface StatusBadgeProps {
  status: string;
  labels: Record<string, string>;
  colorMap?: Record<string, string>;
}

export default function StatusBadge({ status, labels, colorMap }: StatusBadgeProps) {
  // Default color map
  const defaultColorMap: Record<string, string> = {
    active: cssVars.status.success,
    pending: cssVars.status.warning,
    accepted: cssVars.status.success,
    completed: cssVars.status.success,
    approved: cssVars.status.success,
    inactive: cssVars.neutral.textMuted,
    suspended: cssVars.status.warning,
    banned: cssVars.status.error,
    rejected: cssVars.status.error,
    cancelled: cssVars.neutral.textMuted,
    withdrawn: cssVars.neutral.textMuted,
    draft: cssVars.neutral.textMuted,
    closed: cssVars.neutral.textMuted,
  };

  const colors = colorMap || defaultColorMap;
  const color = colors[status] || cssVars.neutral.textSecondary;
  const label = labels[status] || status;

  return (
    <span
      className="inline-flex items-center rounded-lg px-3 py-1 text-xs font-bold"
      style={{
        backgroundColor: `color-mix(in srgb, ${color} 15%, transparent)`,
        color: color,
      }}
    >
      {label}
    </span>
  );
}
