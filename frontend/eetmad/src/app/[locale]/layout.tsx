import { Footer } from '@/components/shared/layouts/Footer';
import { Header } from '@/components/shared/layouts/Header';
import PageNavigator from '@/components/shared/dev/PageNavigator';
import ThemeSwitcher from '@/components/shared/dev/ThemeSwitcher';
import { routing } from '@/i18n/routing';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';

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
      <div className={locale === 'ar' ? 'rtl' : 'ltr'} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
        <Header />
        {children}
        <Footer />
        {/* Developer Tools - Only in development mode */}
        <PageNavigator />
        <ThemeSwitcher />
      </div>
    </NextIntlClientProvider>
  );
}
