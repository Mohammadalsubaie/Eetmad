'use client';

import PageContainer from '@/components/shared/layouts/PageContainer';
import Section from '@/components/shared/layouts/Section';
import Badge from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, MapPin, TrendingUp } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

interface Request {
  id: string;
  titleKey: string;
  categoryKey: string;
  location: string;
  quotesCount: number;
  createdAt: Date;
  budget?: string;
  status: 'active' | 'closed';
}

const RecentRequestsSection: React.FC = () => {
  const t = useTranslations('home.recentRequests');

  const recentRequests: Request[] = [
    {
      id: '1',
      titleKey: 'mockData.request1.title',
      categoryKey: 'mockData.request1.category',
      location: 'الرياض',
      quotesCount: 12,
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      budget: '50,000 - 100,000 ر.س',
      status: 'active',
    },
    {
      id: '2',
      titleKey: 'mockData.request2.title',
      categoryKey: 'mockData.request2.category',
      location: 'جدة',
      quotesCount: 8,
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
      budget: '200,000 - 300,000 ر.س',
      status: 'active',
    },
  ];

  return (
    <Section background="gray" padding="xl">
      <PageContainer>
        <div className="mb-12 flex items-center justify-between">
          <div>
            <h2 className="text-foreground mb-2 text-3xl font-bold lg:text-4xl">{t('title')}</h2>
            <p className="text-muted-foreground text-lg">{t('description')}</p>
          </div>
          <Button variant="outline" className="hidden gap-2 lg:flex">
            <span>{t('viewAll')}</span>
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {recentRequests.map((request) => (
            <div
              key={request.id}
              className="group border-border bg-card hover:border-primary/20 cursor-pointer rounded-xl border p-6 shadow-md transition-all hover:shadow-lg"
            >
              <div className="mb-4 flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-foreground group-hover:text-primary mb-2 text-xl font-semibold">
                    {t(request.titleKey)}
                  </h3>
                  <div className="text-muted-foreground flex flex-wrap items-center gap-2 text-sm">
                    <Badge variant="secondary">{t(request.categoryKey)}</Badge>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {request.location}
                    </span>
                  </div>
                </div>
                <Badge variant={request.status === 'active' ? 'success' : 'default'}>
                  {t(`status.${request.status}`)}
                </Badge>
              </div>

              {request.budget && (
                <div className="bg-muted mb-4 rounded-lg p-3">
                  <div className="text-muted-foreground text-sm">{t('budget')}</div>
                  <div className="text-foreground font-semibold">{request.budget}</div>
                </div>
              )}

              <div className="border-border flex items-center justify-between border-t pt-4">
                <div className="text-muted-foreground flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                  </span>
                  <span className="text-primary flex items-center gap-1 font-medium">
                    <TrendingUp className="h-4 w-4" />
                    {t('offers', { count: request.quotesCount })}
                  </span>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  className="group-hover:bg-primary/5 group-hover:text-primary gap-2"
                >
                  <span>{t('viewDetails')}</span>
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center lg:hidden">
          <Button variant="outline" className="gap-2">
            <span>{t('viewAll')}</span>
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </div>
      </PageContainer>
    </Section>
  );
};

export default RecentRequestsSection;
