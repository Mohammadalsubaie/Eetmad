import {
  AudienceSection,
  ExploreCategoriesSection,
  FAQSection,
  GettingStartedSection,
  HeroSection,
  PlatformOverviewSection,
  ProjectBenefitsSection,
  SearchAndFilters,
  SuccessStoriesSection,
  TransparencySection,
  CTASection,
} from '@/components/features/home';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <SearchAndFilters />
      <PlatformOverviewSection />
      <AudienceSection />
      <ExploreCategoriesSection />
      <ProjectBenefitsSection />
      <TransparencySection />
      <SuccessStoriesSection />
      <GettingStartedSection />
      <FAQSection />
      <CTASection />
    </main>
  );
}
