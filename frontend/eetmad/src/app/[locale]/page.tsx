'use client';

import dynamic from 'next/dynamic';
import type React from 'react';

// Helper function to create resilient dynamic imports with error handling
const createDynamicImport = (importFn: () => Promise<{ default: React.ComponentType }>) => {
  return dynamic(
    () =>
      importFn().catch((error) => {
        console.error('Failed to load component:', error);
        // Return a fallback component that renders nothing
        return { default: () => null };
      }),
    { ssr: true, loading: () => null }
  );
};

// Dynamic imports to avoid chunk loading issues
// Added error handling to prevent crashes
const HeroSection = createDynamicImport(() => import('@/components/features/home/HeroSection'));
const PlatformOverviewSection = createDynamicImport(
  () => import('@/components/features/home/PlatformOverviewSection')
);
const GettingStartedSection = createDynamicImport(
  () => import('@/components/features/home/GettingStartedSection')
);
const AudienceSection = createDynamicImport(
  () => import('@/components/features/home/AudienceSection')
);
const CTASection = createDynamicImport(() => import('@/components/features/home/CTASection'));
const ExploreCategoriesSection = createDynamicImport(
  () => import('@/components/features/home/ExploreCategoriesSection')
);
const ProjectBenefitsSection = createDynamicImport(
  () => import('@/components/features/home/ProjectBenefitsSection')
);
const TransparencySection = createDynamicImport(
  () => import('@/components/features/home/TransparencySection')
);
const SuccessStoriesSection = createDynamicImport(
  () => import('@/components/features/home/SuccessStoriesSection')
);
const FAQSection = createDynamicImport(() => import('@/components/features/home/FAQSection'));

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
