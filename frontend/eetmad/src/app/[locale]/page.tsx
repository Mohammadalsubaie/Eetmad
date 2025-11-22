'use client';

import dynamic from 'next/dynamic';

// Dynamic imports to avoid chunk loading issues
const HeroSection = dynamic(() => import('@/components/features/home/HeroSection'), { ssr: true });
const PlatformOverviewSection = dynamic(() => import('@/components/features/home/PlatformOverviewSection'), { ssr: true });
const GettingStartedSection = dynamic(() => import('@/components/features/home/GettingStartedSection'), { ssr: true });
const AudienceSection = dynamic(() => import('@/components/features/home/AudienceSection'), { ssr: true });
const CTASection = dynamic(() => import('@/components/features/home/CTASection'), { ssr: true });
const ExploreCategoriesSection = dynamic(() => import('@/components/features/home/ExploreCategoriesSection'), { ssr: true });
const ProjectBenefitsSection = dynamic(() => import('@/components/features/home/ProjectBenefitsSection'), { ssr: true });
const TransparencySection = dynamic(() => import('@/components/features/home/TransparencySection'), { ssr: true });
const SuccessStoriesSection = dynamic(() => import('@/components/features/home/SuccessStoriesSection'), { ssr: true });
const FAQSection = dynamic(() => import('@/components/features/home/FAQSection'), { ssr: true });

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <PlatformOverviewSection />
      <GettingStartedSection />
      <AudienceSection />
      <CTASection />
      <ExploreCategoriesSection />
      <ProjectBenefitsSection />
      <TransparencySection />
      <SuccessStoriesSection />
      <FAQSection />
    </main>
  );
}
