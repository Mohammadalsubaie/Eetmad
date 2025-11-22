'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { useTranslations } from 'next-intl';
import { cssVars } from '@/styles/theme';

interface MonthlyRevenueChartProps {
  data: Array<{ month: string; revenue: number; target: number }>;
}

const CustomTooltip = ({ active, payload, label, t }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: cssVars.neutral.surface,
          border: `2px solid ${cssVars.status.success}`,
          borderRadius: '12px',
          padding: '12px 16px',
          boxShadow: `0 4px 12px color-mix(in srgb, ${cssVars.neutral.darker} 15%, transparent)`,
        }}
      >
        <p
          style={{
            color: cssVars.secondary.DEFAULT,
            fontWeight: 'bold',
            marginBottom: '8px',
            fontSize: '14px',
          }}
        >
          {label}
        </p>
        {payload.map((entry: any, index: number) => {
          const isRevenue = entry.dataKey === 'revenue';
          const percentage = entry.payload.target
            ? ((entry.payload.revenue / entry.payload.target) * 100).toFixed(1)
            : null;
          return (
            <div key={index}>
              <p
                style={{
                  color: entry.color,
                  fontSize: '13px',
                  margin: '4px 0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    width: '10px',
                    height: '10px',
                    backgroundColor: entry.color,
                    borderRadius: '50%',
                  }}
                />
                <span style={{ fontWeight: '600' }}>{entry.name}:</span>
                <span style={{ fontWeight: 'bold' }}>
                  {entry.value.toLocaleString()} {t('currency')}
                </span>
              </p>
              {isRevenue && percentage && (
                <p
                  style={{
                    color: cssVars.neutral.textSecondary,
                    fontSize: '12px',
                    marginTop: '4px',
                    marginRight: '18px',
                  }}
                >
                  {parseFloat(percentage) >= 100 ? '✅' : '📊'} {percentage}% {t('ofTarget')}
                </p>
              )}
            </div>
          );
        })}
      </div>
    );
  }
  return null;
};

export default function MonthlyRevenueChart({ data }: MonthlyRevenueChartProps) {
  const t = useTranslations('admin.analytics.charts.monthlyRevenueDetails');

  return (
    <ResponsiveContainer width="100%" height={550}>
      <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 70 }}>
        <defs>
          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={cssVars.status.success} stopOpacity={0.9} />
            <stop offset="50%" stopColor={cssVars.status.success} stopOpacity={0.4} />
            <stop offset="100%" stopColor={cssVars.status.success} stopOpacity={0.05} />
          </linearGradient>
          <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={cssVars.accent.primary} stopOpacity={0.7} />
            <stop offset="50%" stopColor={cssVars.accent.primary} stopOpacity={0.3} />
            <stop offset="100%" stopColor={cssVars.accent.primary} stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke={cssVars.neutral.border}
          opacity={0.2}
          vertical={false}
        />
        <XAxis
          dataKey="month"
          tick={{
            fill: cssVars.neutral.textSecondary,
            fontSize: 14,
            fontWeight: 500,
          }}
          stroke={cssVars.neutral.border}
          tickLine={{ stroke: cssVars.neutral.border }}
          axisLine={{ stroke: cssVars.neutral.border }}
          interval={0}
          angle={-60}
          textAnchor="end"
          height={90}
          dy={12}
          dx={-5}
        />
        <YAxis
          tick={{
            fill: cssVars.neutral.textSecondary,
            fontSize: 14,
            fontWeight: 500,
          }}
          stroke={cssVars.neutral.border}
          tickLine={{ stroke: cssVars.neutral.border }}
          axisLine={{ stroke: cssVars.neutral.border }}
          tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
          width={70}
          dx={-5}
        />
        <Tooltip content={<CustomTooltip t={t} />} />
        <Legend
          wrapperStyle={{ paddingTop: '16px', fontSize: '16px' }}
          iconSize={22}
          formatter={(value) => (
            <span style={{ color: cssVars.neutral.darker, fontSize: '16px', fontWeight: 500 }}>
              {value}
            </span>
          )}
        />
        <Area
          type="monotone"
          dataKey="revenue"
          stroke={cssVars.status.success}
          strokeWidth={5}
          fillOpacity={1}
          fill="url(#colorRevenue)"
          name={t('revenueLabel')}
          animationDuration={1000}
          animationEasing="ease-out"
        />
        <Area
          type="monotone"
          dataKey="target"
          stroke={cssVars.accent.primary}
          strokeWidth={4.5}
          strokeDasharray="6 4"
          fillOpacity={1}
          fill="url(#colorTarget)"
          name={t('targetLabel')}
          animationDuration={1200}
          animationEasing="ease-out"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
