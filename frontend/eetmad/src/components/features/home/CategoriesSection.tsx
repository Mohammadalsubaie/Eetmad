// src/components/features/home/CategoriesSection.tsx

import PageContainer from '@/components/shared/layouts/PageContainer';
import Section from '@/components/shared/layouts/Section';
import { Button } from '@/components/ui';
import { Building, Car, Home, Laptop, Package, Shirt, Utensils, Wrench } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

interface Category {
  id: string;
  icon: React.ElementType;
  count: number;
  iconColor: string;
}

const CategoriesSection: React.FC = () => {
  const t = useTranslations('home.categories');

  const categories: Category[] = [
    {
      id: 'electronics',
      icon: Laptop,
      count: 234,
      iconColor: 'text-info',
    },
    {
      id: 'furniture',
      icon: Home,
      count: 189,
      iconColor: 'text-primary',
    },
    {
      id: 'clothing',
      icon: Shirt,
      count: 156,
      iconColor: 'text-secondary',
    },
    {
      id: 'food',
      icon: Utensils,
      count: 298,
      iconColor: 'text-warning',
    },
    {
      id: 'automotive',
      icon: Car,
      count: 167,
      iconColor: 'text-destructive',
    },
    {
      id: 'tools',
      icon: Wrench,
      count: 145,
      iconColor: 'text-muted-foreground',
    },
    {
      id: 'supplies',
      icon: Package,
      count: 312,
      iconColor: 'text-success',
    },
    {
      id: 'construction',
      icon: Building,
      count: 203,
      iconColor: 'text-accent',
    },
  ];

  return (
    <Section background="white" padding="xl">
      <PageContainer>
        <div className="mb-16 text-center">
          <h2 className="text-foreground mb-4 text-3xl font-bold lg:text-4xl">{t('title')}</h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">{t('description')}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <button
              key={category.id}
              className="group border-border bg-card hover:border-primary/30 hover:bg-card/80 rounded-xl border-2 p-6 text-start shadow-md transition-all hover:shadow-lg"
            >
              <div className="mb-4 flex items-center justify-between">
                <category.icon className={`h-8 w-8 ${category.iconColor}`} />
                <span className="bg-muted text-muted-foreground rounded-full px-3 py-1 text-sm font-medium">
                  {category.count}
                </span>
              </div>
              <h3 className="text-foreground text-xl font-semibold">{t(`items.${category.id}`)}</h3>
            </button>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline" size="lg">
            {t('viewAll')}
          </Button>
        </div>
      </PageContainer>
    </Section>
  );
};

export default CategoriesSection;
