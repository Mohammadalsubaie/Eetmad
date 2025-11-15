// src/components/features/home/HowItWorksSection.tsx

import PageContainer from '@/components/shared/layouts/PageContainer';
import Section from '@/components/shared/layouts/Section';
import { Button } from '@/components/ui';
import { CheckCircle, FileText, MessageCircle, Send } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

interface Step {
  number: number;
  icon: React.ElementType;
  titleKey: string;
  descriptionKey: string;
}

const HowItWorksSection: React.FC = () => {
  const t = useTranslations('home.howItWorks');

  const steps: Step[] = [
    {
      number: 1,
      icon: FileText,
      titleKey: 'write.title',
      descriptionKey: 'write.description',
    },
    {
      number: 2,
      icon: Send,
      titleKey: 'publish.title',
      descriptionKey: 'publish.description',
    },
    {
      number: 3,
      icon: MessageCircle,
      titleKey: 'receive.title',
      descriptionKey: 'receive.description',
    },
    {
      number: 4,
      icon: CheckCircle,
      titleKey: 'choose.title',
      descriptionKey: 'choose.description',
    },
  ];

  return (
    <Section background="white" padding="xl">
      <PageContainer>
        <div className="mb-16 text-center">
          <h2 className="text-foreground mb-4 text-3xl font-bold lg:text-4xl">{t('title')}</h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">{t('description')}</p>
        </div>

        <div className="relative">
          {/* Connection Lines - Hidden on mobile */}
          <div className="absolute top-24 hidden h-1 w-full lg:block ltr:left-0 rtl:right-0">
            <div className="from-primary/20 via-primary/30 to-primary/20 h-full w-full bg-gradient-to-r"></div>
          </div>

          <div className="grid gap-8 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="group border-border bg-card hover:border-primary/30 relative z-10 rounded-xl border-2 p-6 shadow-md transition-all hover:shadow-lg">
                  {/* Step Number */}
                  <div className="mb-4 flex items-center justify-between">
                    <div className="bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground flex h-12 w-12 items-center justify-center rounded-full text-xl font-bold transition-all">
                      {step.number}
                    </div>
                    <div className="bg-muted group-hover:bg-primary/5 flex h-12 w-12 items-center justify-center rounded-full transition-all">
                      <step.icon className="text-muted-foreground group-hover:text-primary h-6 w-6 transition-all" />
                    </div>
                  </div>

                  <h3 className="text-foreground mb-3 text-xl font-semibold">
                    {t(`steps.${step.titleKey}`)}
                  </h3>
                  <p className="text-muted-foreground">{t(`steps.${step.descriptionKey}`)}</p>
                </div>

                {/* Arrow for mobile */}
                {index < steps.length - 1 && (
                  <div className="my-4 flex justify-center lg:hidden">
                    <div className="bg-primary/30 h-8 w-0.5"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-6 text-lg">{t('cta.ready')}</p>
          <Button size="lg" className="shadow-lg hover:shadow-xl">
            {t('cta.button')}
          </Button>
        </div>
      </PageContainer>
    </Section>
  );
};

export default HowItWorksSection;
