'use client';

import { FeatureCard, SectionHeader } from '@/components/ui';
import { cssVars } from '@/styles/theme';
import { ActivitySquare, ShieldCheck, Sparkles, Users2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

const benefits = [
  {
    key: 'transparency',
    icon: ShieldCheck,
    color: cssVars.status.success,
  },
  {
    key: 'matching',
    icon: Sparkles,
    color: cssVars.primary.dark,
  },
  {
    key: 'quality',
    icon: ActivitySquare,
    color: cssVars.primary.DEFAULT,
  },
  {
    key: 'support',
    icon: Users2,
    color: cssVars.secondary.DEFAULT,
  },
] as const;

export default function ProjectBenefitsSection() {
  const t = useTranslations('biddingPlatform.sections.projectBenefits');

  return (
    <section className="relative py-20" style={{ backgroundColor: cssVars.neutral.bg }}>
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, ${cssVars.primary.DEFAULT} 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="container relative">
        <div className="mb-16">
          <SectionHeader
            badge={t('eyebrow')}
            badgeIcon={Sparkles}
            title={t('title')}
            subtitle={t('subtitle')}
            variant="light"
            align="center"
            badgeColor="primary"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {benefits.map((benefit, index) => (
            <FeatureCard
              key={benefit.key}
              title={t(`items.${benefit.key}.title`)}
              description={t(`items.${benefit.key}.description`)}
              icon={benefit.icon}
              iconColor={benefit.color}
              showArrow
              animationDelay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
