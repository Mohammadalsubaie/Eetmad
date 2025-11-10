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
    return <div className="border-border bg-background h-9 w-9 rounded-lg border p-2" />;
  }

  return (
    <button
      onClick={toggleTheme}
      className="border-border bg-background hover:bg-accent rounded-lg border p-2 transition-colors"
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
