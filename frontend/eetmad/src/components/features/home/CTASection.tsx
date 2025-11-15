// src/components/features/home/CTASection.tsx

import PageContainer from '@/components/shared/layouts/PageContainer';
import Section from '@/components/shared/layouts/Section';
import { Button } from '@/components/ui';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

const CTASection: React.FC = () => {
  const t = useTranslations('home.cta');

  const benefits = ['free', 'network', 'fast', 'support'];

  return (
    <Section background="primary" padding="xl">
      <PageContainer>
        <div className="bg-primary text-primary-foreground relative overflow-hidden rounded-2xl px-8 py-16 shadow-2xl lg:px-16">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMSI+PHBhdGggZD0iTTM2IDE2YzAtNC40MTggMy41ODItOCA4LThzOCAzLjU4MiA4IDgtMy41ODIgOC04IDgtOC0zLjU4Mi04LTh6bTAgMjRjMC00LjQxOCAzLjU4Mi04IDgtOHM4IDMuNTgyIDggOC0zLjU4MiA4LTggOC04LTMuNTgyLTgtOHpNMTIgMTZjMC00LjQxOCAzLjU4Mi04IDgtOHM4IDMuNTgyIDggOC0zLjU4MiA4LTggOC04LTMuNTgyLTgtOHptMCAyNGMwLTQuNDE4IDMuNTgyLTggOC04czggMy41ODIgOCA4LTMuNTgyIDgtOCA4LTgtMy41ODItOC04eiIvPjwvZz48L2c+PC9zdmc+')] bg-repeat"></div>
          </div>

          <div className="relative grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Content */}
            <div className="text-center lg:text-start">
              <h2 className="mb-4 text-3xl font-bold lg:text-4xl">{t('title')}</h2>
              <p className="mb-8 text-lg opacity-90">{t('description')}</p>

              <div className="mb-8 space-y-3">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center gap-3 lg:justify-start"
                  >
                    <CheckCircle className="text-success h-5 w-5 flex-shrink-0" />
                    <span className="opacity-90">{t(`benefits.${benefit}`)}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 lg:justify-start">
                <Button size="lg" variant="secondary" className="gap-2 shadow-xl">
                  <span>{t('primary')}</span>
                  <ArrowLeft className="h-5 w-5" />
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground hover:border-primary-foreground/40 hover:bg-primary-foreground/20 backdrop-blur-sm"
                >
                  {t('secondary')}
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-primary-foreground/10 rounded-xl p-6 text-center backdrop-blur-sm">
                <div className="mb-2 text-4xl font-bold">+5000</div>
                <div className="text-sm opacity-80">{t('stats.requests')}</div>
              </div>
              <div className="bg-primary-foreground/10 rounded-xl p-6 text-center backdrop-blur-sm">
                <div className="mb-2 text-4xl font-bold">+1200</div>
                <div className="text-sm opacity-80">{t('stats.suppliers')}</div>
              </div>
              <div className="bg-primary-foreground/10 rounded-xl p-6 text-center backdrop-blur-sm">
                <div className="mb-2 text-4xl font-bold">98%</div>
                <div className="text-sm opacity-80">{t('stats.satisfaction')}</div>
              </div>
              <div className="bg-primary-foreground/10 rounded-xl p-6 text-center backdrop-blur-sm">
                <div className="mb-2 text-4xl font-bold">24/7</div>
                <div className="text-sm opacity-80">{t('stats.support')}</div>
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </Section>
  );
};

export default CTASection;
