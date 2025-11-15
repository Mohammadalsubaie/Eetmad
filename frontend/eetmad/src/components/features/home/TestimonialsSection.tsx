'use client';

import PageContainer from '@/components/shared/layouts/PageContainer';
import Section from '@/components/shared/layouts/Section';
import { Avatar } from '@/components/shared/data-display/Avatar';
import { Quote, Star } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

interface Testimonial {
  id: number;
  nameKey: string;
  roleKey: string;
  companyKey: string;
  avatar: string;
  rating: number;
  contentKey: string;
}

const TestimonialsSection: React.FC = () => {
  const t = useTranslations('home.testimonials');

  const testimonials: Testimonial[] = [
    {
      id: 1,
      nameKey: 'items.testimonial1.name',
      roleKey: 'items.testimonial1.role',
      companyKey: 'items.testimonial1.company',
      avatar: 'AS',
      rating: 5,
      contentKey: 'items.testimonial1.content',
    },
    {
      id: 2,
      nameKey: 'items.testimonial2.name',
      roleKey: 'items.testimonial2.role',
      companyKey: 'items.testimonial2.company',
      avatar: 'FZ',
      rating: 5,
      contentKey: 'items.testimonial2.content',
    },
    {
      id: 3,
      nameKey: 'items.testimonial3.name',
      roleKey: 'items.testimonial3.role',
      companyKey: 'items.testimonial3.company',
      avatar: 'KA',
      rating: 5,
      contentKey: 'items.testimonial3.content',
    },
  ];

  return (
    <Section background="gray" padding="xl">
      <PageContainer>
        <div className="mb-16 text-center">
          <h2 className="text-foreground mb-4 text-3xl font-bold lg:text-4xl">{t('title')}</h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">{t('description')}</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="group border-border bg-card hover:border-primary/20 rounded-xl border p-6 shadow-md transition-all hover:shadow-lg"
            >
              {/* Quote Icon */}
              <div className="mb-4 flex justify-between">
                <Quote className="text-primary/20 h-8 w-8" />
                <div className="flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="fill-warning text-warning h-5 w-5" />
                  ))}
                </div>
              </div>

              {/* Content */}
              <p className="text-foreground/90 mb-6 leading-relaxed">
                &ldquo;{t(testimonial.contentKey)}&rdquo;
              </p>

              {/* Author */}
              <div className="border-border flex items-center gap-3 border-t pt-4">
                <Avatar className="bg-primary/10 text-primary h-12 w-12">
                  {testimonial.avatar}
                </Avatar>
                <div>
                  <div className="text-foreground font-semibold">{t(testimonial.nameKey)}</div>
                  <div className="text-muted-foreground text-sm">
                    {t(testimonial.roleKey)} - {t(testimonial.companyKey)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </PageContainer>
    </Section>
  );
};

export default TestimonialsSection;
