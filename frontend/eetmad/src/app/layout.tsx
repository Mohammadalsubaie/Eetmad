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
                  // Initialize locale
                  var locale = document.cookie
                    .split('; ')
                    .find(row => row.startsWith('NEXT_LOCALE='))
                    ?.split('=')[1] || 'en';
                  if (locale && ['en', 'ar'].includes(locale)) {
                    document.documentElement.lang = locale;
                  }
                  
                  // Initialize theme BEFORE React hydrates to prevent FOUC
                  var storedTheme = localStorage.getItem('theme');
                  var storedThemeOption = localStorage.getItem('themeOption') || 'option1';
                  
                  // Apply dark mode class immediately
                  if (storedTheme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                  
                  // Load theme CSS synchronously to prevent delay
                  var themePath = '/themes/' + storedThemeOption + '.css';
                  var existingLink = document.getElementById('dynamic-theme');
                  if (existingLink) {
                    existingLink.remove();
                  }
                  
                  var link = document.createElement('link');
                  link.id = 'dynamic-theme';
                  link.rel = 'stylesheet';
                  link.href = themePath;
                  link.setAttribute('data-theme', storedThemeOption);
                  document.head.appendChild(link);
                } catch (e) {
                  // Silently fail - theme will load via React context
                }
              })();
            `,
          }}
        />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
