'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { cssVars } from '@/styles/theme';

interface CompletionRateChartProps {
  data: Array<{ name: string; value: number; color?: string }>;
}

const DEFAULT_COLORS = [
  cssVars.status.success,
  cssVars.status.warning,
  cssVars.status.error,
  cssVars.neutral.textMuted,
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div
        style={{
          backgroundColor: cssVars.neutral.surface,
          border: `2px solid ${data.payload.color || data.color}`,
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
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              width: '12px',
              height: '12px',
              backgroundColor: data.payload.color || data.color,
              borderRadius: '50%',
            }}
          />
          {data.name}
        </p>
        <p
          style={{
            color: data.payload.color || data.color,
            fontSize: '18px',
            fontWeight: 'bold',
            margin: '4px 0',
          }}
        >
          {data.value.toFixed(1)}%
        </p>
      </div>
    );
  }
  return null;
};

export default function CompletionRateChart({ data }: CompletionRateChartProps) {
  const chartData = data.map((item, index) => ({
    ...item,
    color: item.color || DEFAULT_COLORS[index % DEFAULT_COLORS.length],
  }));

  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, payload }: any) => {
    if (percent < 0.08) return null; // Don't show label for very small slices
    
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill={cssVars.neutral.surface}
        textAnchor="middle"
        dominantBaseline="central"
        style={{ 
          fontSize: '18px', 
          fontWeight: 'bold',
          textShadow: `0 1px 3px color-mix(in srgb, ${cssVars.neutral.darker} 50%, transparent)`,
        }}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={550}>
      <PieChart margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
        <Pie
          data={chartData}
          cx="50%"
          cy="45%"
          labelLine={false}
          label={renderCustomLabel}
          outerRadius={150}
          innerRadius={95}
          fill={cssVars.primary.DEFAULT}
          dataKey="value"
          animationDuration={1000}
          animationEasing="ease-out"
          startAngle={90}
          endAngle={-270}
        >
          {chartData.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={entry.color}
              style={{
                filter: `drop-shadow(0 2px 4px color-mix(in srgb, ${cssVars.neutral.darker} 10%, transparent))`,
              }}
            />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend
          wrapperStyle={{ paddingTop: '16px', fontSize: '16px' }}
          iconType="circle"
          iconSize={16}
          layout="vertical"
          verticalAlign="bottom"
          align="center"
          formatter={(value, entry: any) => (
            <span style={{ 
              color: cssVars.neutral.darker, 
              fontSize: '16px', 
              fontWeight: 500,
            }}>
              {value}: {entry.payload.value.toFixed(1)}%
            </span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

