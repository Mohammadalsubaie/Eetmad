'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-9 w-9 rounded-lg border border-border bg-background p-2" />;
  }

  return (
    <button
      onClick={toggleTheme}
      className="rounded-lg border border-border bg-background p-2 transition-colors hover:bg-accent"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="text-foreground h-5 w-5" />
      ) : (
        <Moon className="text-foreground h-5 w-5" />
      )}
    </button>
  );
}
