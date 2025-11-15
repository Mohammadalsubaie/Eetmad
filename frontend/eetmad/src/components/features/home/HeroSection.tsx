'use client';

import { LanguageSwitcher } from '@/components/shared/misc/LanguageSwitcher';
import PageContainer from '@/components/shared/layouts/PageContainer';
import { ThemeToggle } from '@/components/shared/misc/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, FileText, Search, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

const HeroSection: React.FC = () => {
  const t = useTranslations('home.hero');

  return (
    <section className="bg-primary text-primary-foreground relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(30deg,transparent_12%,rgba(255,255,255,.08)_12.5%,rgba(255,255,255,.08)_14%,transparent_14.5%,transparent_62%,rgba(255,255,255,.08)_62.5%,rgba(255,255,255,.08)_64%,transparent_64.5%)] bg-[length:80px_140px]"></div>
      </div>

      <PageContainer className="relative z-10 py-16 lg:py-24">
        <div className="absolute top-8 flex items-center gap-4 ltr:right-8 rtl:left-8">
          <ThemeToggle />
          <LanguageSwitcher />
        </div>

        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Content */}
          <div className="text-center lg:text-start">
            {/* Badge */}
            <div className="border-primary-foreground/20 bg-primary-foreground/10 mb-8 inline-flex items-center gap-2 rounded-full border px-4 py-2 backdrop-blur-sm">
              <div className="bg-secondary h-2 w-2 animate-pulse rounded-full"></div>
              <span className="text-sm font-semibold tracking-wide">{t('badge')}</span>
            </div>

            {/* Main Heading */}
            <h1 className="mb-6 text-4xl leading-tight font-bold lg:text-5xl xl:text-6xl">
              {t('title')}
              <span className="text-secondary mt-3 block">{t('titleHighlight')}</span>
            </h1>

            <p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed opacity-90 lg:mx-0 lg:text-xl">
              {t('subtitle')}
            </p>

            {/* Search Bar */}
            <form className="mb-10">
              <div className="bg-background text-foreground mx-auto flex max-w-2xl gap-3 rounded-xl p-3 shadow-2xl">
                <div className="relative flex-1">
                  <Search className="text-muted-foreground absolute top-1/2 h-5 w-5 -translate-y-1/2 ltr:left-4 rtl:right-4" />
                  <Input
                    type="text"
                    placeholder={t('searchPlaceholder')}
                    className="h-12 border-0 bg-transparent text-base focus-visible:ring-0 ltr:pl-12 rtl:pr-12"
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="bg-secondary text-secondary-foreground hover:bg-secondary/90 h-12 gap-2 px-8 whitespace-nowrap"
                >
                  <span className="font-semibold">{t('searchButton')}</span>
                </Button>
              </div>
            </form>

            {/* CTA Buttons */}
            <div className="mb-12 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              <Button
                size="lg"
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 h-12 gap-2 px-8 shadow-lg"
              >
                <FileText className="h-5 w-5" />
                <span className="font-semibold">{t('requestButton')}</span>
                <ArrowLeft className="h-4 w-4" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground hover:border-primary-foreground/50 hover:bg-primary-foreground/20 h-12 gap-2 border-2 px-8 backdrop-blur-sm"
              >
                <Users className="h-5 w-5" />
                <span className="font-semibold">{t('browseSuppliersButton')}</span>
              </Button>
            </div>

            {/* Stats */}
            <div className="border-primary-foreground/20 grid grid-cols-3 gap-8 border-t pt-8">
              <div>
                <div className="text-secondary mb-2 text-4xl font-bold">+5000</div>
                <div className="text-sm font-medium opacity-80">{t('stats.requests')}</div>
              </div>
              <div>
                <div className="text-secondary mb-2 text-4xl font-bold">+1200</div>
                <div className="text-sm font-medium opacity-80">{t('stats.suppliers')}</div>
              </div>
              <div>
                <div className="text-secondary mb-2 text-4xl font-bold">98%</div>
                <div className="text-sm font-medium opacity-80">{t('stats.satisfaction')}</div>
              </div>
            </div>
          </div>

          {/* Illustration */}
          <div className="relative hidden lg:block">
            <div className="border-primary-foreground/20 bg-primary-foreground/10 relative aspect-square overflow-hidden rounded-3xl border-2 p-12 backdrop-blur-sm">
              <div className="flex h-full items-center justify-center">
                <div className="space-y-6 text-center">
                  <div className="bg-secondary mx-auto flex h-32 w-32 items-center justify-center rounded-3xl shadow-2xl">
                    <Search className="text-secondary-foreground h-16 w-16" />
                  </div>
                  <p className="max-w-xs text-xl font-semibold">{t('illustrationText')}</p>
                </div>
              </div>

              {/* Floating Cards */}
              <div className="border-border bg-card text-card-foreground absolute start-6 top-6 rounded-xl border-2 p-4 shadow-2xl backdrop-blur-sm">
                <div className="text-muted-foreground mb-1 text-sm font-medium">
                  {t('floatingCards.newRequest')}
                </div>
                <div className="text-primary text-2xl font-bold">+24</div>
              </div>

              <div className="border-border bg-card text-card-foreground absolute end-6 bottom-6 rounded-xl border-2 p-4 shadow-2xl backdrop-blur-sm">
                <div className="text-muted-foreground mb-1 text-sm font-medium">
                  {t('floatingCards.quote')}
                </div>
                <div className="text-secondary text-2xl font-bold">+156</div>
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
};

export default HeroSection;
