import {
  AudienceSection,
  CTASection,
  ExploreCategoriesSection,
  FAQSection,
  GettingStartedSection,
  HeroSection,
  PlatformOverviewSection,
  ProjectBenefitsSection,
  SuccessStoriesSection,
  TransparencySection,
} from '@/components/features/home';

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
