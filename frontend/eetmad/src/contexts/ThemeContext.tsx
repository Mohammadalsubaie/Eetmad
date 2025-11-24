'use client';

import { loadTheme, type ThemeOption } from '@/lib/utils/themeLoader';
import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  themeOption: ThemeOption;
  setThemeOption: (theme: ThemeOption) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Initialize state from localStorage synchronously (if available) to prevent flash
  const getInitialTheme = (): Theme => {
    if (typeof window === 'undefined') return 'light';
    const stored = localStorage.getItem('theme') as Theme | null;
    return stored || 'light';
  };

  const getInitialThemeOption = (): ThemeOption => {
    if (typeof window === 'undefined') return 'option1';
    const stored = localStorage.getItem('themeOption') as ThemeOption | null;
    return stored || 'option1';
  };

  const [theme, setThemeState] = useState<Theme>(getInitialTheme);
  const [themeOption, setThemeOptionState] = useState<ThemeOption>(getInitialThemeOption);

  // Sync theme state with what was set by the blocking script
  // This runs after the blocking script has already applied the theme
  useEffect(() => {
    // Theme should already be applied by the blocking script in layout.tsx
    // Just ensure everything is synced properly
    const stored = localStorage.getItem('theme') as Theme | null;
    const storedThemeOption = localStorage.getItem('themeOption') as ThemeOption | null;

    const initialTheme = stored || 'light';
    const themeToLoad = storedThemeOption || 'option1';

    // Sync state (should already match, but ensure it)
    setThemeState(initialTheme);
    setThemeOptionState(themeToLoad);

    if (!storedThemeOption) {
      localStorage.setItem('themeOption', themeToLoad);
    }

    // Only load if not already loaded by the blocking script
    const existingLink = document.getElementById('dynamic-theme');
    if (!existingLink || existingLink.getAttribute('data-theme') !== themeToLoad) {
      loadTheme(themeToLoad);
    }

    // Ensure theme class is applied (should already be done by script, but ensure it)
    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount - theme is already set by blocking script

  // Update theme
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);

    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Update theme option
  const setThemeOption = (newThemeOption: ThemeOption) => {
    setThemeOptionState(newThemeOption);
    localStorage.setItem('themeOption', newThemeOption);
    loadTheme(newThemeOption);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, themeOption, setThemeOption }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
