import ManualReviewNavigator from '@/components/shared/dev/ManualReviewNavigator';
import ThemeSwitcher from '@/components/shared/dev/ThemeSwitcher';
import { Footer } from '@/components/shared/layouts/Footer';
import { Header } from '@/components/shared/layouts/Header';
import { HtmlLangUpdater } from '@/components/shared/misc/HtmlLangUpdater';
import { LocaleInitializer } from '@/components/shared/misc/LocaleInitializer';
import { MSWProvider } from '@/components/shared/misc/MSWProvider';
import SkipLink from '@/components/shared/SkipLink/SkipLink';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'nav' });
  const tFooter = await getTranslations({ locale, namespace: 'footer' });

  return {
    title: t('brandName'),
    description: tFooter('brandDescription'),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <MSWProvider>
        <HtmlLangUpdater />
        <LocaleInitializer />
        <div className={locale === 'ar' ? 'rtl' : 'ltr'} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
          <SkipLink href="#main-content">
            {locale === 'ar' ? 'تخطي إلى المحتوى الرئيسي' : 'Skip to main content'}
          </SkipLink>
          <Header />
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
          <Footer />

          {process.env.NODE_ENV === 'production' && (
            <>
              <ManualReviewNavigator />
              <ThemeSwitcher />
            </>
          )}
        </div>
      </MSWProvider>
    </NextIntlClientProvider>
  );
}
