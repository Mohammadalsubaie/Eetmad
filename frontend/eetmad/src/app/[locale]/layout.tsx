import { Footer } from '@/components/shared/layouts/Footer';
import { Header } from '@/components/shared/layouts/Header';
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
  if (!routing.locales.includes(locale as any)) {
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
      </div>
    </NextIntlClientProvider>
  );
}
