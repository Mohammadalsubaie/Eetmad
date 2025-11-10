// frontend/eetmad/src/app/(public)/page.tsx

import {
  CategoriesSection,
  CTASection,
  FeaturesSection,
  HeroSection,
  HowItWorksSection,
  RecentRequestsSection,
  StatsSection,
  TestimonialsSection,
} from '@/components/features/home';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section - القسم الرئيسي */}
      <HeroSection />

      {/* Stats Section - الإحصائيات */}
      <StatsSection />

      {/* Features Section - المميزات */}
      <FeaturesSection />

      {/* Categories Section - التصنيفات/الخدمات */}
      <CategoriesSection />

      {/* How It Works Section - كيف يعمل النظام */}
      <HowItWorksSection />

      {/* Recent Requests Section - الطلبات الأخيرة */}
      <RecentRequestsSection />

      {/* Testimonials Section - آراء العملاء */}
      <TestimonialsSection />

      {/* CTA Section - دعوة لاتخاذ إجراء */}
      <CTASection />
    </main>
  );
}

// Optional: Add metadata for SEO
export const metadata = {
  title: 'الصفحة الرئيسية - نظام اعتماد',
  description:
    'منصة متكاملة لإدارة عمليات الاعتماد الأكاديمي بكفاءة وشفافية. تتبع التقدم، وإدارة المعايير، وتحقيق التميز المؤسسي.',
  keywords: 'اعتماد أكاديمي, جودة تعليمية, إدارة الاعتماد, معايير الجودة',
};
