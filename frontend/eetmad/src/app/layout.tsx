import { ThemeProvider } from '@/contexts/ThemeContext';
import { Inter } from 'next/font/google';
import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var locale = document.cookie
                    .split('; ')
                    .find(row => row.startsWith('NEXT_LOCALE='))
                    ?.split('=')[1] || 'en';
                  if (locale && ['en', 'ar'].includes(locale)) {
                    document.documentElement.lang = locale;
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
