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
  const [theme, setThemeState] = useState<Theme>('light');
  const [themeOption, setThemeOptionState] = useState<ThemeOption>('option1');

  // Initialize theme on client side only
  useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme | null;
    const storedThemeOption = localStorage.getItem('themeOption') as ThemeOption | null;
    // Always default to light if no stored preference
    const initialTheme = stored || 'light';

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setThemeState(initialTheme);

    // Load theme option - use stored or default to option1
    const themeToLoad = storedThemeOption || 'option1';
    setThemeOptionState(themeToLoad);
    if (!storedThemeOption) {
      localStorage.setItem('themeOption', themeToLoad);
    }
    loadTheme(themeToLoad);

    // Apply theme class immediately
    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

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
