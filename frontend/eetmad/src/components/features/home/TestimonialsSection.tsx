'use client';

import PageContainer from '@/components/shared/layouts/PageContainer';
import Section from '@/components/shared/layouts/Section';

import { Quote, Star } from 'lucide-react';
import { useTranslations } from 'next-intl';

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
          <h2 className="mb-4 text-3xl font-bold text-foreground lg:text-4xl">{t('title')}</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">{t('description')}</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="group rounded-xl border border-border bg-card p-6 shadow-md transition-all hover:border-primary/20 hover:shadow-lg"
            >
              {/* Quote Icon */}
              <div className="mb-4 flex justify-between">
                <Quote className="h-8 w-8 text-primary/20" />
                <div className="flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-warning text-warning" />
                  ))}
                </div>
              </div>

              {/* Content */}
              <p className="mb-6 leading-relaxed text-foreground/90">
                &ldquo;{t(testimonial.contentKey)}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 border-t border-border pt-4">
                <div>
                  <div className="font-semibold text-foreground">{t(testimonial.nameKey)}</div>
                  <div className="text-sm text-muted-foreground">
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
