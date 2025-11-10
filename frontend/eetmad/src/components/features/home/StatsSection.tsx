// src/components/features/home/StatsSection.tsx

import PageContainer from '@/components/shared/layouts/PageContainer';
import Section from '@/components/shared/layouts/Section';
import { Package, Star, TrendingUp, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

const StatsSection: React.FC = () => {
  const t = useTranslations('home.stats');

  const stats = [
    {
      icon: Package,
      label: t('requests.label'),
      value: t('requests.value'),
      trend: { value: 12.5, isPositive: true },
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      icon: Users,
      label: t('suppliers.label'),
      value: t('suppliers.value'),
      trend: { value: 8.3, isPositive: true },
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
    },
    {
      icon: TrendingUp,
      label: t('offers.label'),
      value: t('offers.value'),
      trend: { value: 23.1, isPositive: true },
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
    {
      icon: Star,
      label: t('satisfaction.label'),
      value: t('satisfaction.value'),
      trend: { value: 2.4, isPositive: true },
      color: 'text-warning',
      bgColor: 'bg-warning/10',
    },
  ];

  return (
    <Section background="white" padding="lg">
      <PageContainer>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="border-border bg-card rounded-xl border-2 p-6 shadow-md transition-all duration-250 hover:shadow-xl"
            >
              <div className="mb-4 flex items-start justify-between">
                <div
                  className={`${stat.bgColor} ${stat.color} flex h-14 w-14 items-center justify-center rounded-xl`}
                >
                  <stat.icon className="h-7 w-7" />
                </div>
                {stat.trend && (
                  <div className="text-success bg-success/10 flex items-center gap-1 rounded-full px-3 py-1">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm font-bold">+{stat.trend.value}%</span>
                  </div>
                )}
              </div>
              <div className="text-muted-foreground mb-2 text-sm font-medium">{stat.label}</div>
              <div className="text-foreground text-3xl font-bold">{stat.value}</div>
            </div>
          ))}
        </div>
      </PageContainer>
    </Section>
  );
};

export default StatsSection;
