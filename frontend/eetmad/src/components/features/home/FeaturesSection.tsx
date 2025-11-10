'use client';

import PageContainer from '@/components/shared/layouts/PageContainer';
import Section from '@/components/shared/layouts/Section';
import {
  ArrowRight,
  Award,
  CheckCircle,
  Clock,
  MessageSquare,
  Shield,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

interface Feature {
  icon: React.ElementType;
  titleKey: string;
  descriptionKey: string;
  iconColor: string;
  iconBg: string;
  gradient: string;
  features: string[];
}

const FeaturesSection: React.FC = () => {
  const t = useTranslations('home.features');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const features: Feature[] = [
    {
      icon: Zap,
      titleKey: 'speed.title',
      descriptionKey: 'speed.description',
      iconColor: 'text-warning',
      iconBg: 'bg-warning/10',
      gradient: 'from-warning/20 via-warning/10 to-transparent',
      features: ['استجابة فورية', 'معالجة سريعة', 'نتائج فعالة'],
    },
    {
      icon: Shield,
      titleKey: 'trust.title',
      descriptionKey: 'trust.description',
      iconColor: 'text-info',
      iconBg: 'bg-info/10',
      gradient: 'from-info/20 via-info/10 to-transparent',
      features: ['حماية البيانات', 'موثوقية عالية', 'أمان متقدم'],
    },
    {
      icon: Users,
      titleKey: 'network.title',
      descriptionKey: 'network.description',
      iconColor: 'text-secondary',
      iconBg: 'bg-secondary/10',
      gradient: 'from-secondary/20 via-secondary/10 to-transparent',
      features: ['شبكة واسعة', 'تواصل فعال', 'شراكات قوية'],
    },
    {
      icon: Award,
      titleKey: 'quality.title',
      descriptionKey: 'quality.description',
      iconColor: 'text-success',
      iconBg: 'bg-success/10',
      gradient: 'from-success/20 via-success/10 to-transparent',
      features: ['معايير عالية', 'جودة مضمونة', 'تميز دائم'],
    },
    {
      icon: Clock,
      titleKey: 'time.title',
      descriptionKey: 'time.description',
      iconColor: 'text-destructive',
      iconBg: 'bg-destructive/10',
      gradient: 'from-destructive/20 via-destructive/10 to-transparent',
      features: ['توفير الوقت', 'كفاءة عالية', 'سرعة التنفيذ'],
    },
    {
      icon: TrendingUp,
      titleKey: 'prices.title',
      descriptionKey: 'prices.description',
      iconColor: 'text-primary',
      iconBg: 'bg-primary/10',
      gradient: 'from-primary/20 via-primary/10 to-transparent',
      features: ['أسعار تنافسية', 'عروض متعددة', 'قيمة أفضل'],
    },
    {
      icon: MessageSquare,
      titleKey: 'communication.title',
      descriptionKey: 'communication.description',
      iconColor: 'text-accent',
      iconBg: 'bg-accent/10',
      gradient: 'from-accent/20 via-accent/10 to-transparent',
      features: ['تواصل مباشر', 'ردود سريعة', 'دعم مستمر'],
    },
    {
      icon: CheckCircle,
      titleKey: 'ease.title',
      descriptionKey: 'ease.description',
      iconColor: 'text-success',
      iconBg: 'bg-success/10',
      gradient: 'from-success/20 via-success/10 to-transparent',
      features: ['واجهة بسيطة', 'سهولة الاستخدام', 'تجربة مميزة'],
    },
  ];

  return (
    <Section background="white" padding="xl">
      <PageContainer>
        {/* Enhanced Header */}
        <div className="mx-auto mb-20 max-w-4xl space-y-6 text-center">
          <div className="from-primary/10 to-secondary/10 border-primary/20 inline-flex items-center gap-2 rounded-full border-2 bg-gradient-to-r px-5 py-2">
            <div className="bg-primary h-2 w-2 animate-pulse rounded-full" />
            <span className="text-primary text-sm font-bold">لماذا نحن الأفضل</span>
          </div>

          <h2 className="text-foreground text-5xl leading-tight font-black lg:text-6xl">
            مميزات تجعلنا
            <span className="from-primary via-secondary to-primary mt-2 block bg-gradient-to-r bg-clip-text text-transparent">
              الخيار الأمثل
            </span>
          </h2>

          <p className="text-muted-foreground mx-auto max-w-2xl text-xl leading-relaxed">
            {t('description')}
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Card */}
              <div className="border-border bg-card relative h-full overflow-hidden rounded-3xl border-2 p-8 shadow-lg transition-all duration-500 hover:shadow-2xl">
                {/* Animated Gradient Background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                />

                {/* Decorative Circle */}
                <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-gradient-to-br from-current to-transparent opacity-5 transition-transform duration-700 group-hover:scale-150" />

                <div className="relative z-10 space-y-6">
                  {/* Icon */}
                  <div className="relative">
                    <div
                      className={`${feature.iconBg} ${feature.iconColor} inline-flex h-20 w-20 items-center justify-center rounded-2xl shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6`}
                    >
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/30 to-transparent" />
                      <feature.icon className="relative z-10 h-10 w-10" />
                    </div>

                    {/* Glow Effect */}
                    <div
                      className={`absolute inset-0 ${feature.iconBg} rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-50`}
                    />
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <h3 className="text-foreground group-hover:text-primary text-2xl font-black transition-colors duration-300">
                      {t(`list.${feature.titleKey}`)}
                    </h3>

                    <p className="text-muted-foreground leading-relaxed">
                      {t(`list.${feature.descriptionKey}`)}
                    </p>
                  </div>

                  {/* Feature List */}
                  <div className="border-border/50 space-y-2 border-t-2 pt-4">
                    {feature.features.map((item, i) => (
                      <div
                        key={i}
                        className="text-muted-foreground group-hover:text-foreground flex items-center gap-2 text-sm transition-colors duration-300"
                        style={{ transitionDelay: `${i * 50}ms` }}
                      >
                        <div
                          className={`h-1.5 w-1.5 rounded-full ${feature.iconBg} ${feature.iconColor}`}
                        />
                        <span className="font-medium">{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Hover Arrow */}
                  <div
                    className={`flex items-center gap-2 text-sm font-bold ${feature.iconColor} pt-4 opacity-0 transition-all duration-300 group-hover:opacity-100`}
                  >
                    <span>اعرف المزيد</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>

                {/* Bottom Accent Line */}
                <div
                  className={`absolute right-0 bottom-0 left-0 h-1 bg-gradient-to-r ${feature.gradient} origin-left scale-x-0 transform transition-transform duration-500 group-hover:scale-x-100`}
                />
              </div>

              {/* External Glow */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} -z-10 rounded-3xl opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-30`}
              />
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-20 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {[
            { value: '99.9%', label: 'معدل الرضا', color: 'success' },
            { value: '24/7', label: 'دعم مستمر', color: 'primary' },
            { value: '<2 دقيقة', label: 'متوسط الاستجابة', color: 'warning' },
            { value: '+10K', label: 'عملية ناجحة', color: 'secondary' },
          ].map((stat, i) => (
            <div
              key={i}
              className="border-border from-card to-muted/30 hover:border-primary/30 rounded-2xl border-2 bg-gradient-to-br p-6 text-center transition-all duration-300"
            >
              <div className={`text-4xl font-black text-${stat.color} mb-2`}>{stat.value}</div>
              <div className="text-muted-foreground text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </PageContainer>
    </Section>
  );
};

export default FeaturesSection;
