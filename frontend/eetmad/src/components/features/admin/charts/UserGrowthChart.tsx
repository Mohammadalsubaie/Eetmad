'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { useTranslations } from 'next-intl';
import { cssVars } from '@/styles/theme';

interface UserGrowthChartProps {
  data: Array<{ month: string; users: number; growth: number }>;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name?: string;
    value?: number;
    color?: string;
    dataKey?: string;
  }>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: cssVars.neutral.surface,
          border: `2px solid ${cssVars.primary.DEFAULT}`,
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
        {payload.map((entry, index: number) => (
          <p
            key={index}
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
              {entry.dataKey === 'users'
                ? new Intl.NumberFormat('en-US', { numberingSystem: 'latn' }).format(entry.value ?? 0)
                : `${(entry.value ?? 0).toFixed(1)}%`}
            </span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function UserGrowthChart({ data }: UserGrowthChartProps) {
  const t = useTranslations('admin.analytics.charts.userGrowthDetails');

  return (
    <ResponsiveContainer width="100%" height={550}>
      <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 70 }}>
        <defs>
          <linearGradient id="userGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={cssVars.primary.DEFAULT} stopOpacity={0.8} />
            <stop offset="100%" stopColor={cssVars.primary.DEFAULT} stopOpacity={0.1} />
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
          tickFormatter={(value) => new Intl.NumberFormat('en-US', { numberingSystem: 'latn' }).format(value)}
          width={70}
          dx={-5}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          wrapperStyle={{ paddingTop: '16px', fontSize: '16px' }}
          iconType="line"
          iconSize={22}
          formatter={(value) => (
            <span style={{ color: cssVars.neutral.darker, fontSize: '16px', fontWeight: 500 }}>
              {value}
            </span>
          )}
        />
        <Line
          type="monotone"
          dataKey="users"
          stroke={cssVars.primary.DEFAULT}
          strokeWidth={5}
          dot={{
            fill: cssVars.primary.DEFAULT,
            r: 8,
            strokeWidth: 3,
            stroke: cssVars.neutral.surface,
          }}
          activeDot={{
            r: 12,
            strokeWidth: 3,
            stroke: cssVars.neutral.surface,
            fill: cssVars.primary.DEFAULT,
          }}
          name={t('usersLabel')}
          animationDuration={1000}
          animationEasing="ease-out"
        />
        <Line
          type="monotone"
          dataKey="growth"
          stroke={cssVars.status.success}
          strokeWidth={4.5}
          strokeDasharray="6 4"
          dot={{
            fill: cssVars.status.success,
            r: 7,
            strokeWidth: 3,
            stroke: cssVars.neutral.surface,
          }}
          activeDot={{
            r: 11,
            strokeWidth: 3,
            stroke: cssVars.neutral.surface,
            fill: cssVars.status.success,
          }}
          name={t('growthLabel')}
          animationDuration={1200}
          animationEasing="ease-out"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
