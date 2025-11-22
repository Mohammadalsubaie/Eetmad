'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from 'recharts';
import { useTranslations } from 'next-intl';
import { cssVars } from '@/styles/theme';

interface ProjectsByCategoryChartProps {
  data: Array<{ category: string; projects: number }>;
}

const COLORS = [
  cssVars.primary.DEFAULT,
  cssVars.status.success,
  cssVars.status.info,
  cssVars.accent.primary,
  cssVars.status.warning,
  cssVars.secondary.DEFAULT,
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value?: number;
    payload?: { total?: number };
  }>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const value = payload[0].value;
    const total = payload[0].payload.total || value;
    const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;

    return (
      <div
        style={{
          backgroundColor: cssVars.neutral.surface,
          border: `2px solid ${payload[0].color}`,
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
        <p
          style={{
            color: payload[0].color,
            fontSize: '16px',
            fontWeight: 'bold',
            margin: '4px 0',
          }}
        >
          {value.toLocaleString()} مشروع
        </p>
        <p
          style={{
            color: cssVars.neutral.textSecondary,
            fontSize: '12px',
            marginTop: '4px',
          }}
        >
          {percentage}% من إجمالي المشاريع
        </p>
      </div>
    );
  }
  return null;
};

export default function ProjectsByCategoryChart({ data }: ProjectsByCategoryChartProps) {
  const t = useTranslations('admin.analytics.charts.projectsByCategoryDetails');
  const total = data.reduce((sum, item) => sum + item.projects, 0);
  const dataWithTotal = data.map((item) => ({ ...item, total }));

  return (
    <ResponsiveContainer width="100%" height={550}>
      <BarChart data={dataWithTotal} margin={{ top: 10, right: 20, left: 0, bottom: 100 }}>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke={cssVars.neutral.border}
          opacity={0.2}
          vertical={false}
        />
        <XAxis
          dataKey="category"
          tick={{
            fill: cssVars.neutral.textSecondary,
            fontSize: 13,
            fontWeight: 500,
          }}
          stroke={cssVars.neutral.border}
          tickLine={{ stroke: cssVars.neutral.border }}
          axisLine={{ stroke: cssVars.neutral.border }}
          angle={-60}
          textAnchor="end"
          height={120}
          interval={0}
          dy={14}
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
          width={70}
          dx={-5}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          wrapperStyle={{ paddingTop: '16px', fontSize: '16px' }}
          iconSize={22}
          formatter={(value) => (
            <span style={{ color: cssVars.neutral.darker, fontSize: '16px', fontWeight: 500 }}>
              {value}
            </span>
          )}
        />
        <Bar
          dataKey="projects"
          name={t('label')}
          radius={[12, 12, 0, 0]}
          animationDuration={1000}
          animationEasing="ease-out"
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
              style={{
                transition: 'opacity 0.3s',
              }}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
